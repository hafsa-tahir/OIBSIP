# Marie Curie — Tribute Page

A responsive and interactive tribute page dedicated to **Marie Curie**, the pioneering scientist whose research transformed the study of radioactivity.

This project was created as **Task 2 of the Web Development track for the Oasis Infobyte Internship (OIBSIP)**.

---

## Project Overview

The objective of this project was to create a visually engaging tribute page for an influential historical figure while demonstrating fundamental frontend development skills.

The page combines semantic HTML, responsive CSS, and vanilla JavaScript to create a modern editorial-style experience.

---

## Features

* Responsive layout for desktop, tablet, and mobile
* Marie Curie biography with original paraphrased content
* Prominent historical portrait
* Interactive timeline
* Key scientific milestones
* Distinctive quotation section
* Dark/light mode
* Theme preference saved using localStorage
* Scroll-triggered animations
* Intersection Observer API
* Smooth scrolling navigation
* Interactive timeline hover effects
* Accessible theme toggle
* Reduced-motion support
* Research and image attribution section

---

## Technology Stack

### HTML5

Used for:

* Semantic page structure
* Navigation
* Sections
* Timeline
* Biography content
* Accessibility attributes

### CSS3

Used for:

* Responsive layouts
* CSS Grid
* Flexbox
* Typography
* Transitions
* Hover effects
* Dark/light themes
* Responsive breakpoints
* Scroll-reveal animations

### JavaScript

Used for:

* Dark/light mode
* localStorage theme persistence
* Intersection Observer API
* Scroll-triggered animations
* Active navigation state
* Timeline interactions
* Smooth navigation behavior

---

## Project Structure

```text
WebDev-Task2-TributePage/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── assets/
│   └── marie-curie.jpg
│
└── screenshots/
    ├── desktop.png
    ├── tablet.png
    └── mobile.png
```

---

## How to Run

No server or installation is required.

1. Download or clone the project.
2. Open the project folder.
3. Make sure the image exists at:

```text
assets/marie-curie.jpg
```

4. Open `index.html` in a modern web browser.

The project runs entirely on the frontend.

---

## Responsive Design

The page has dedicated responsive behavior for:

* Desktop
* Tablet
* Mobile

The layout automatically adapts the hero, biography cards, timeline, statistics, legacy section, navigation, typography, and footer to smaller screens.

---

## Theme System

The website supports two visual modes:

### Light Mode

The default presentation uses a warm editorial background with dark typography and gold accents.

### Dark Mode

A darker presentation provides an alternative viewing experience while preserving the same visual hierarchy.

The selected theme is saved in browser `localStorage`, allowing the preference to remain after refreshing the page.

---

## Scroll Animations

The project uses the native JavaScript:

```javascript
IntersectionObserver
```

Elements marked with the `.reveal` class become visible when they enter the viewport.

This avoids requiring an external animation library.

---

## Research Sources

Historical information was researched using reputable reference material, including:

* Encyclopaedia Britannica — Marie Curie
* Wikipedia — Marie Curie
* Wikimedia Commons — Marie Curie image resources

All biography content on this page has been written in original wording and paraphrased for educational purposes.

---

## Image Attribution

The project uses a Marie Curie image sourced from Wikimedia Commons.

Before final submission, update the attribution information in `index.html` with the exact Wikimedia Commons file title and creator/license information corresponding to the image you download.

Recommended source:

**Wikimedia Commons**

https://commons.wikimedia.org/

---

## Assignment Requirements Covered

* [x] Page title with subject's name
* [x] One-line tagline
* [x] Prominent image
* [x] Biography section
* [x] 3–4+ paragraphs of original content
* [x] Timeline/key achievements
* [x] Quote block
* [x] Multiple background colors
* [x] Multiple font styles
* [x] Responsive layout

### Additional Features

* [x] Intersection Observer animations
* [x] Dark/light mode
* [x] localStorage theme persistence
* [x] Interactive timeline
* [x] Smooth scrolling
* [x] Accessibility support
* [x] Reduced-motion support

---

## Internship

**Program:** Oasis Infobyte Internship
**Repository:** OIBSIP
**Track:** Web Development
**Task:** Task 2 — Tribute Page

---

## Author

**Hafsa Tahir**

Web Development Intern

---

## License

This project was created for educational and internship purposes.
