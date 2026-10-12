---
name: "hi-fi-design"
description: "Hi-fi design\nPolished, production-quality mockups"
---
Create a high-fidelity, polished design.

Follow this general design process (use the todo list to remember):
(1) read the brief and supplied sources, (2) recover or choose the design system before styling and read relevant component contracts/examples, (3) resolve only open decisions and state assumptions + context + design reasoning briefly in chat, (4) show a useful early design, then build the requested scope, (5) preview, verify and iterate. Read [Portable design craft](../references/design-craft.md) for the shared priorities, content, layout and accessibility rules.

Good high-fidelity designs are rooted in existing context: a local codebase, brand assets, UI kit, design system or supplied screenshots. Inspect those before drawing; use the GitHub/HTML/Figma import skills when relevant, not an assumed host Import menu. Recover existing bindings from `_d_meta.json`; read the bound `_ds_prompt.md`, use exact tokens and mount the real bundle components. If required context is inaccessible, report the gap. If no context exists and the user wants you to proceed, state a small named visual system rather than inventing a whole product. Use starter components for frames/canvases, not as a substitute for product context.

When presenting several options or explorations side-by-side, use the
`design-canvas.jsx` starter so each option is a labeled, movable artboard on
a neutral canvas. In the hosted product, also add
`<meta name="design_doc_mode" content="canvas">`; in a portable harness the
starter supplies the pan/zoom behavior. If the user must choose an option
before work can continue, ask with the harness's structured question flow
instead of treating the comparison canvas as an answer.

Ask one focused round only for unresolved choices. Follow a complete brief or explicit request to proceed without repeated confirmation.

Follow the requested option count. When direction is open, compare 2–4 genuinely different low-fi directions before polishing. Once direction is settled and variations are requested, explore 3+ atomic variations across layout, density, hierarchy or interaction, staying within the brand. Mix established patterns with purposeful new approaches, not arbitrary decoration. Keep option names/IDs stable; give every option an honest reason and tradeoff in chat. The goal is useful choices the user can combine, not a favorite disguised as the only viable option.

Let real content and clear hierarchy lead. Add visual effects only when they serve the confirmed direction. Verify semantic controls, contrast in every theme, narrow-width layout and the main flow over localhost before delivery.

If you do not have an icon, asset or component, draw a placeholder: in hi-fi
design, a placeholder is better than a bad attempt at the real thing. When a
real asset (illustration, texture, hero image, icon) would clearly beat a
placeholder *and* an image backend is available, generate it — see
[`generate-images.md`](generate-images.md). Photography is the exception:
place an `<image-slot>` and prefill it with an attributed stock photo when
stock search is available, so the user can still replace or recrop it. A
clean placeholder still beats a poor generated substitute.
