
# Voltmeter — Scientific Calculator

**Oasis Infobyte — Web Development & Designing Internship — Level 2, Task 1**

A browser-based calculator with a Standard mode and a Scientific mode, built with vanilla HTML, CSS, and JavaScript — no frameworks, no `eval()`.

## Live features

**Core**
- Full arithmetic with correct operator precedence (`5 + 3 × 2` evaluates as `11`, not `16`)
- Numeric keypad, decimal point, clear (`C`), backspace (`⌫`)
- Division-by-zero and invalid-expression handling with readable error messages instead of crashes
- Percent (`%`) key
- Keyboard input — type numbers and operators directly, `Enter`/`=` to evaluate, `Esc` to clear

**Scientific mode**
- Trig functions in degrees: `sin`, `cos`, `tan`
- `log` (base 10), `ln` (natural log), `√`, `x^y`, `x²`, `x!`, `1/x`
- Constants `π` and `e`, parentheses for grouping

**Memory**
- `MC` / `MR` / `M+` / `M−` with an `M` indicator on screen when a value is stored

**History**
- A scrolling strip above the screen shows recent calculations at a glance
- A full history panel (via the **Log** button) lists every calculation this session — click any entry to reload it into the screen
- History is in-memory for the session (not persisted to disk/localStorage)

**Design — 8-bit pixel hardware**
- Two distinct hardware identities, not just a color swap:
  - **Light mode** — a classic handheld LCD (Game-Boy-style DMG screen): cream shell, olive-green screen, flat dark-green ink digits
  - **Dark mode** — a neon arcade cabinet: near-black case, glowing cyan display, magenta/yellow/green accent keys
- Pixel-notched corners (via CSS `clip-path`) on the case, screen, and history panel
- Hard-edged "pressable sprite" buttons — square corners, offset pixel shadow that collapses on press for tactile 8-bit feedback
- `Press Start 2P` for labels/branding, `VT323` for the display and history (authentic pixel-terminal fonts)
- Scanline overlay and a blinking pixel status LED on the screen
- Fully responsive down to small mobile widths
- Visible keyboard focus states; respects `prefers-reduced-motion` (animations become instant/static)

## How the math works (no `eval()`)

Input is tokenized, then parsed with a small recursive-descent parser (`expr → term → unary → postfix → power → atom`) that mirrors standard order of operations and supports nested parentheses and function calls like `sin(30+15)`. This avoids the security and reliability issues of `eval()` entirely.

## Project structure

```
Task1_Calculator/
├── index.html   — markup
├── style.css    — theme tokens, layout, responsive rules
├── script.js    — tokenizer, parser, UI wiring
└── README.md
```

## Running it

Open `index.html` directly in any modern browser — no build step or server required.

## Possible next steps

- Persist history/memory across sessions with `localStorage`
- Add a unit-conversion panel alongside the scientific functions
- Add haptic-style press animation variants per theme
