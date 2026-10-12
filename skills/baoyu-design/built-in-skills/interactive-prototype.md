---
name: "interactive-prototype"
description: "Interactive prototype\nWorking app with real interactions"
---
Create a working prototype for the requested flow, not a static mockup or an unrequested production app. Read [Portable design craft](../references/design-craft.md) and follow the bound design system before choosing visuals.

## Behavior and navigation

- Implement each displayed primary action, relevant hover/focus/disabled state, form validation and success/error feedback. Include empty/loading states when the flow needs them, with a clear way to recover. Use realistic state management; React state or plain JavaScript is sufficient. Use effects only for actual synchronization.
- Use native buttons for actions, labeled inputs for data entry, and links for navigation. Give icon controls accessible names and keep focus visible. For dialogs/menus, prefer the system's real components and providers; verify keyboard operation, dismissal and focus return.
- Separate pages use ordinary relative `<a href="Cart.html">` links. Style the anchor itself; do not nest a button in it. Use a single page and one state owner for steps that must share data. Keep user input when moving between steps; do not assume state automatically crosses page loads.
- Be explicit about simulated data, network responses and local-only persistence. Do not fabricate successful backend integration or customer/business evidence. If an integration is unavailable, show the honest prototype state and report the limit.
- Use short, purposeful transitions and honor reduced motion. Navigation must still work with animations disabled.

## Comparison and delivery

For visual options use the existing `design-canvas.jsx` starter; for flow options a compact in-page variant selector is also valid. Keep IDs/names stable and isolate review controls from product content. A focused edit preserves existing copy, links, assets and working states.

Web prototypes must reflow on narrow screens even when shown in a fixed comparison frame. Stack sidebars, wrap toolbars and bound wide-table scrolling. Mobile targets are at least 44×44 CSS px. Test desktop and 320px width, 200% zoom, all supported themes, and keyboard paths.

Serve the HTML/JS/CSS over localhost. Walk the main flow, submit valid and invalid input, navigate back, reload, and check console/local-asset errors with available tools. Save screenshots or a DOM/check report with URL, viewport and tested actions; report unavailable checks. Record the entry HTML through `agents/record-asset.mjs`. Use the standalone-HTML export workflow when a self-contained offline delivery is needed.
