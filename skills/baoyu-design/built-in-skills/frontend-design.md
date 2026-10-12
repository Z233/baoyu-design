---
name: "frontend-design"
description: "Frontend design\nAesthetic direction for designs outside an existing brand system"
---
Use this guidance when designing frontend/UI work that is NOT governed by an existing brand or design system. Create distinctive HTML with exceptional attention to aesthetic details and creative choices.

Read [Portable design craft](../references/design-craft.md). A supplied brand/system and existing product patterns take priority over this exploration guidance. Without a direction, resolve it with focused questions or 2–4 low-fi candidates; for a complete brief or “just do it”, state a named direction and build.

### Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. Use these for inspiration but design one that is true to the aesthetic direction.
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

### Aesthetics Guidelines

- **Typography**: Choose a small, role-based scale and one to three families with real fallbacks. A distinctive display face can carry the concept; readable body text, restrained tracking and precise spacing carry the interface. Avoid habitual font choices, not fonts required by a brand, platform or language.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Animate only when it explains a transition or supports the direction. Prefer CSS for simple effects, keep frequent actions immediate, and respect `prefers-reduced-motion`. One purposeful moment is better than motion on every control.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Use atmosphere only when the concept calls for it. Solid backgrounds and whitespace are valid; gradients, texture, geometry, shadows or transparency need a reason. Avoid template-like gradient washes and repeated accent-border cards. For generated imagery (when a backend is available), see [`generate-images.md`](generate-images.md); use attributed stock photography or a replaceable image slot.

Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on the same choices across generations.

Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate animations and effects. Minimalist designs need restraint, precision, and careful attention to spacing and subtle details.
