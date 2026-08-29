# TaskLedger — To-Do Web App

**Oasis Infobyte — Web Development & Designing Internship — Level 2, Task 3**

A to-do list app with real Pending/Completed sections, categories, priority levels, due-date tracking, drag-and-drop reordering, and full `localStorage` persistence.

## Checklist compliance

- [x] Input field + "Add Task" button to create new tasks
- [x] New tasks appear immediately in the **Pending Tasks** list
- [x] "Mark Complete" checkbox toggle — completed tasks **move** to the separate **Completed Tasks** list (not just filtered/hidden)
- [x] **Inline edit** — click ✏️ and the task title becomes an editable field in place (no browser `prompt()` popup); `Enter` saves, `Esc` cancels
- [x] Delete button removes a task permanently from either list
- [x] Task count indicators — "`X pending`" and "`Y completed`" shown above each list, plus a combined summary in the header
- [x] **Bonus:** timestamp on each task — "Added [date/time]" while pending, "Completed [date/time]" once checked off
- [x] **Bonus:** tasks persist across page refreshes via `localStorage`
- [x] Empty state messaging per list (pending and completed each show their own friendly message when empty)

**Beyond the checklist:**
- Categories (Work / Personal / Study / Finance) and priority levels (High / Medium / Low) with color-coded badges
- Due dates with automatic overdue highlighting
- Live search across task titles and categories
- Native HTML5 drag-and-drop reordering, scoped independently within each list (dragging a pending task only reorders other pending tasks, and likewise for completed)

## Project structure

```
Task3_TodoApp/
├── index.html   — markup
├── style.css    — layout, theme, responsive rules
├── script.js    — state, rendering, drag-and-drop, persistence
└── README.md
```

## Running it

Open `index.html` directly in a browser — no build step or server required. Data is stored in your browser's `localStorage`, scoped to wherever the file is hosted (e.g., your GitHub Pages URL).

## Notes

Two sample tasks (one pending, one completed) are seeded on first load purely to demonstrate both list states — delete them freely, they're not required data.
