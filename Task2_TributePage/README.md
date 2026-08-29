# Tesla — High Voltage Archive

**Oasis Infobyte — Web Development & Designing Internship — Level 2, Task 2**

A bold, zine/collage-style tribute page — thick black borders, hard offset shadows, rotated sticker tags, halftone-dot duotone photography, and a scrolling marquee ticker. Built around Tesla's own "high voltage, ahead of his time" energy rather than a quiet, muted layout.

## Checklist compliance

- [x] Page title with subject's name and a one-line tagline
- [x] **A prominent image** — a real public-domain portrait of Tesla (c. 1896, Wikimedia Commons), plus two additional archive photos in a photo-grid section
- [x] Biography/tribute section — four content panels (Early Life, The Current War, Wardenclyffe, Legacy), all original wording
- [x] Timeline/key achievements section — an interactive slider ("The Voltage Log") scrubbing through 10 milestones
- [x] **A quote block** — a real Tesla quote, styled as a distinct rotated card with a heavy shadow
- [x] Multiple background colours — a full Day/Night mode toggle (warm yellow "zine" palette ↔ inverted dark palette), satisfying and exceeding the "2 background colours" requirement
- [x] Multiple font styles — Anton (display), Space Grotesk (body), Space Mono (tags/labels/captions)
- [x] Fully responsive layout

**Beyond the checklist (added after a design pass to raise both visual impact and content depth):**
- Scrolling marquee ticker banner (key locations in Tesla's life)
- A 4-up stats strip (patents, key dates) for quick-scan facts
- A dedicated photo-grid section with two additional archive photographs
- Halftone-dot duotone photo treatment via CSS blend modes (no image editing needed)
- Rotated "sticker" tags and hard comic-style drop shadows as the page's signature visual device
- Scroll-triggered reveal animations via `IntersectionObserver`, respecting `prefers-reduced-motion`

## Image credits

All photographs are historical, public-domain images originally from Wikimedia Commons, mirrored on PICRYL's CDN (`cdn2.picryl.com`) — used here specifically because that CDN is reachable in situations where `wikimedia.org` itself is blocked by a network/firewall, while still being the same public-domain source material:
- *Nikola Tesla, c. 1890* (age 34, photo by Napoleon Sarony) — hero portrait
- *Tesla demonstrating wireless illumination* — archive plate
- *The Wardenclyffe Tower, 1904* — archive plate

## Tech stack

- Plain HTML5 / CSS3 (custom properties for theming, CSS blend modes for the halftone effect) / vanilla JavaScript
- Google Fonts: Anton, Space Grotesk, Space Mono
- No build step, no dependencies — open `index.html` directly in a browser

## File structure

```
Task2_TributePage/
├── index.html   — markup, styles, and script (single file)
└── README.md
```

## Notes on content

All biographical copy is written in my own words from general historical knowledge; no text is copied from any source. The Tesla quote used is his own public-domain statement, not sourced from a copyrighted article.
