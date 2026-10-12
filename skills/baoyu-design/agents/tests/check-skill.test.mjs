import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { AGENTS_DIR, tmpdir, write, runScript } from './helpers.mjs';

function fixture(t) {
  const root = tmpdir(t);
  write(root, 'SKILL.md', '# Skill\n[Method](system-prompt.md)\n');
  write(root, 'system-prompt.md', '# Method\n');
  return root;
}

test('skill checker accepts local links, fragments, encoded spaces and external URLs', t => {
  const root = fixture(t);
  write(root, 'references/guide with spaces.md', '# Guide\n');
  write(root, 'system-prompt.md', '[Guide](references/guide%20with%20spaces.md#guide)\n[Web](https://example.com)\n[Section](#local)\n[Mail](mailto:design@example.com)\n');
  const result = runScript('check-skill.mjs', [root]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /3 Markdown files/);
});

test('skill checker reports a broken reference with its document and line', t => {
  const root = fixture(t);
  write(root, 'built-in-skills/ui.md', '# UI\n[Missing](../references/missing.md)\n');
  const result = runScript('check-skill.mjs', [root]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /built-in-skills\/ui\.md:2.*missing\.md/);
});

test('skill checker checks reference-style links but skips illustrative fenced links', t => {
  const root = fixture(t);
  write(root, 'system-prompt.md', '```md\n[Example](not-a-real-file.md)\n```\n[guide]: references/missing.md\n');
  const result = runScript('check-skill.mjs', [root]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /system-prompt\.md:4/);
  assert.doesNotMatch(result.stderr, /not-a-real-file/);
});

test('skill checker skips inline examples but checks links with code labels', t => {
  const root = fixture(t);
  write(root, 'system-prompt.md', '`![Screenshot](/absolute/example.png)`\n[`Guide`](references/missing.md)\n');
  const result = runScript('check-skill.mjs', [root]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing\.md/);
  assert.doesNotMatch(result.stderr, /example\.png/);
});

test('skill checker rejects links outside the skill and reports missing entry files', t => {
  const root = fixture(t);
  write(root, 'system-prompt.md', '[Outside](../outside.md)\n');
  const result = runScript('check-skill.mjs', [root]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /outside skill/);
  const empty = runScript('check-skill.mjs', [tmpdir(t)]);
  assert.equal(empty.status, 1);
  assert.match(empty.stderr, /SKILL\.md/);
});

test('skill checker rejects BaoCut tools even inside executable examples', t => {
  for (const tool of ['design_check', 'design_import_asset', 'design_system_check', 'design_system_import_asset', 'space_list', 'skills_read']) {
    const root = fixture(t);
    write(root, 'system-prompt.md', `\`\`\`js\n${tool}({path: "demo"})\n\`\`\`\n`);
    const result = runScript('check-skill.mjs', [root]);
    assert.equal(result.status, 1, tool);
    assert.match(result.stderr, new RegExp(tool));
  }
});

test('skill checker excludes archival snapshots and provenance, not active references', t => {
  const root = fixture(t);
  write(root, 'references/upstream-sync/comparison.md', 'design_check\n[Upstream](missing.md)\n');
  write(root, 'references/upstream-system-prompt.md', 'skills_read\n');
  assert.equal(runScript('check-skill.mjs', [root]).status, 0);
  write(root, 'references/craft.md', 'design_system_check\n');
  assert.equal(runScript('check-skill.mjs', [root]).status, 1);
});

test('installed skill passes the public checker CLI', () => {
  const result = runScript('check-skill.mjs', [path.resolve(AGENTS_DIR, '..')]);
  assert.equal(result.status, 0, result.stderr);
});
