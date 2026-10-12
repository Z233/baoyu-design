---
name: "mobile-prototype"
description: "Mobile prototype\nPin-to-home-screen-ready mobile prototype"
---
The user is building a mobile prototype that they'll open on an iPhone
and pin to their home screen. Emit a single self-contained HTML file
that is ready for that flow by default — don't ask first.

Follow [Portable design craft](../references/design-craft.md) and the bound design system. Use real content and native labeled controls; keep touch targets at least 44×44 CSS px. Treat install metadata as setup, not proof that a real-device installation was tested.

## Required <head> tags

Always include these, otherwise the "pin to home screen" banner won't
trigger in the preview and the prototype won't install cleanly:

    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="<short prototype title>">
    <link rel="apple-touch-icon" href="icon.png">
    <link rel="icon" href="icon.png">

## App icon

Create an icon.png in the project root (512×512, square, no
transparency on the edges — iOS masks it to a rounded square itself).
Make a simple, bold mark that reads at small sizes: a single glyph or
monogram on a solid or two-tone background. Avoid photo backgrounds,
tiny type, or gradient washes that muddy at 60×60. If the user hasn't
specified a brand, pick a deliberate single accent color and use it
consistently across the icon and the prototype UI.

## Layout — full-bleed with device inset on desktop

By default, the page should fill the entire viewport on phone widths
(safe-area insets honoured via env(safe-area-inset-*)) — no page
chrome, no max-width container, edge-to-edge content. The status bar
area should feel intentional (matching background or a gradient that
tucks under the notch).

On large viewports (min-width: 700px), center the app inside a
device-sized inset rectangle so the designer can see it as a "phone on
desktop" during iteration. Target ~390×844, but cap the frame to the
available width/height and let content scroll rather than clipping it.
Use the system's radius/background where specified. Example:

    html, body { margin: 0; height: 100%; overscroll-behavior: none; }
    body {
      background: #111;
      display: grid;
      place-items: center;
    }
    #app {
      width: 100vw;
      height: 100dvh;
      box-sizing: border-box;
      overflow: auto;
      background: <app bg>;
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }
    @media (min-width: 700px) {
      #app {
        width: min(390px, 100vw);
        height: min(844px, 100dvh);
        border-radius: 44px;
        overflow: auto;
        box-shadow: 0 30px 80px rgba(0,0,0,0.35);
      }
    }

## No fake chrome

Do NOT draw a fake iOS status bar (the "9:41 · battery · wifi" strip
at the top) or a fake virtual keyboard at the bottom. When the
prototype is installed to the home screen, the real iOS status bar
and real keyboard render on top of your layout — a painted fake looks
doubled up and childish. Leave that space alone and let
env(safe-area-inset-top) / env(safe-area-inset-bottom) reserve the
room. The same applies on the desktop device-frame preview: no fake
status bar inside the phone rectangle.

Wrap your app content in <div id="app">. Navigation, state,
transitions, forms — everything that makes it feel like a real app —
should all work inside that single file. No external build, no CDN
dependencies beyond what's already allowed in the normal prototype
workflow.

Serve over HTTP and test the main flow, keyboard focus, safe-area layout,
320px width and a short desktop viewport. Save screenshots or a DOM/check
report; report real-device behavior as unverified unless you tested it.
