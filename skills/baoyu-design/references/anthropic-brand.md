# Anthropic / Claude brand reference

Use only for explicitly Anthropic/Claude-branded work without a more specific supplied design system. These are source-derived brand values, not defaults for other products. Source: BaoCut's October 2026 `design/references/brand-colors.md` and `brand-typography.md`, which cite the Anthropic design team's 2025-12-11 CSS. [Provenance](upstream-sync/baocut-2026-10.md).

## Color roles

| Role | Value | Use |
|---|---|---|
| Ivory | `#FAF9F5` | Page background |
| Slate | `#141413` | Text and dark surfaces |
| White | `#FFFFFF` | Content panels over Ivory |
| Clay | `#D97757` | Claude accent |
| Oat | `#E3DACC` | Soft fills and separators |
| Blue | `#2A78D6` | Primary accent for non-Claude actions |

Use warm neutrals for structure. Source hover/selected tint: `rgba(115,114,108,0.1)`; source borders: `rgba(31,30,29,0.15)` or `rgba(31,30,29,0.3)`. These decorative borders are not automatically sufficient as control boundaries. Check actual text/fill and control contrast; Clay is not a blanket permission for white small text.

Illustration accents, not general UI chrome: Fig `#C46686`, Sky `#6A9BCC`, Olive `#788C5D`, Clay; soft Coral `#EBCECE`, Heather `#CBCADB`, Cactus `#BCD1CA`, Oat. Do not turn the extended palette into competing product accents.

## Typography

Font files are not included. Declare a truthful fallback and report when it is what renders:

- Sans: `'Anthropic Sans', system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- Serif: `'Anthropic Serif', Georgia, 'Times New Roman', Times, serif`
- Mono: `'Anthropic Mono', 'JetBrains Mono', 'SF Mono', Monaco, 'Courier New', monospace`

| Role | Family | Size | Weight | Line height |
|---|---|---|---|---|
| Display | Serif | 38px | 330 | 1.2 |
| Title | Serif | 28px | 500 | 1.3 |
| Heading | Serif | 24px | 500 | 1.3 |
| UI XL | Sans | 20px | 400 | 1.4 |
| Body | Sans | 16px | 400 | 1.5 |
| Label | Sans | 14px | 400 | 1.4 |
| Caption | Sans | 12px | 400 | 1.35 |

Keep letter spacing at zero unless the supplied context requires otherwise. Source Sans/Serif support variable weights 300–800; fallbacks may not, so inspect their rendered metrics/weight. Warm color, whitespace and serif/sans roles establish the identity, not exaggerated tracking or synthetic bold.

Use supplied/licensed logo assets unchanged: preserve proportions and clear space, do not rotate/distort the Claude Spark or combine Claude/Anthropic marks into a new lockup. Show the Spark once per surface. Without assets, use a plain text name and report the missing mark.
