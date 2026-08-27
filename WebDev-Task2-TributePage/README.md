
# Tribute Page — Nikola Tesla: A Life in Circuits

An upgraded tribute page built as a single-page facsimile of a Tesla patent
drawing — blueprint grids, dashed "FIG." panels, and a knife-switch toggle
in place of the usual sun/moon icon.

## Feature checklist (upgraded version)

- [x] Static content sections (bare minimum) — four "FIG." panels covering
      Tesla's early life, the AC power fight, Wardenclyffe, and his legacy.
- [x] Scroll-triggered animations — built with the native `IntersectionObserver`
      API (`script` block, `io` observer). Panels fade/slide in as they enter
      the viewport; the hero's electric arcs "charge up" on load.
- [x] Dark / light mode toggle — a knife-switch styled control swaps a
      `day` class on `<body>`, remapping CSS custom properties from a navy
      "blueprint" night palette to a cream "patent paper" day palette.
- [x] Interactive timeline slider — a native `<input type="range">` scrubs
      through ten milestones (1856–1943); moving it updates a year readout
      and an event card with no page reload.

## Tech stack

- Plain HTML5 / CSS3 (custom properties for theming) / vanilla JavaScript
- Google Fonts: Roboto Slab (display), IBM Plex Sans (body), IBM Plex Mono (captions)
- No build step, no dependencies — open `index.html` directly in a browser

## File structure

```
OIBSIP-WebDev-Task2-TeslaTribute/
├── index.html      # markup, styles, and script all in one file
└── README.md
```

## Notes on content

All biographical copy is written from general historical knowledge in my
own words for this project; no text is copied from any source.

## Suggested folder name for submission

Per the program's naming convention, place this folder in your `OIBSIP`
repo as:

```
OIBSIP/WebDev-Task2-TeslaTribute/
```

(Adjust the `WebDev-Task2-` prefix to match whatever Track/Level label your
program actually assigned to the Tribute Page task.)
