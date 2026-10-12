// Check the portable instructions, not the historical upstream snapshots.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const realRoot = fs.existsSync(root) ? fs.realpathSync(root) : root;
const issues = [];
const files = [];
const baoCutTools = /\b(design_check|design_import_asset|design_system_check|design_system_import_asset|space_list|skills_read)\b/g;
const inside = (target, base = root) => target === base || target.startsWith(base + path.sep);

function collect(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'upstream-sync' || entry.name === 'upstream-system-prompt.md') continue;
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(target);
  }
}

for (const name of ['SKILL.md', 'system-prompt.md']) {
  const file = path.join(root, name);
  if (fs.existsSync(file)) files.push(file);
  else issues.push(`${name}: missing entry file`);
}
collect(path.join(root, 'built-in-skills'));
collect(path.join(root, 'references'));

for (const file of files) {
  let fence = null;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  for (const [index, line] of lines.entries()) {
    const location = `${path.relative(root, file)}:${index + 1}`;
    for (const match of line.matchAll(baoCutTools)) issues.push(`${location}: BaoCut-only tool ${match[0]}`);
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;
    const prose = line.replace(/`+[^`]*`+/g, 'code');
    const links = [...prose.matchAll(/\[[^\]\n]+\]\((?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\)/g)].map(m => m[1] || m[2]);
    const definition = /^\s*\[[^\]]+\]:\s*<?([^\s>]+)/.exec(prose);
    if (definition) links.push(definition[1]);
    for (const link of links) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(link)) continue;
      try {
        const target = path.resolve(path.dirname(file), decodeURIComponent(link.split(/[?#]/)[0]));
        if (!inside(target)) issues.push(`${location}: link outside skill: ${link}`);
        else if (!fs.existsSync(target)) issues.push(`${location}: missing reference: ${link}`);
        else if (!inside(fs.realpathSync(target), realRoot)) issues.push(`${location}: link outside skill: ${link}`);
      } catch (error) {
        issues.push(`${location}: invalid reference ${link}: ${error.message}`);
      }
    }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Portable skill OK: ${files.length} Markdown files; local links resolve; no BaoCut-only tools.`);
}
