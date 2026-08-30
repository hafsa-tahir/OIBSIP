# OIBSIP — Web Development & Designing Internship

**Oasis Infobyte Summer Internship Program**
Track: **Web Development & Designing** · Level 2
Intern: **Hafsa Tahir**

This repository contains all tasks completed for the Oasis Infobyte Web Development & Designing internship. Level 2 requires all four tasks below, each built as a standalone project with its own documentation.

---

## Tasks

| # | Project | Stack | Live Demo |
|---|---|---|---|
| 1 | [Voltmeter — Scientific Calculator](./Task1_Calculator) | HTML, CSS, JavaScript | [View](https://raw.githack.com/hafsa-tahir/OIBSIP/main/Task1_Calculator/index.html) |
| 2 | [Tesla — High Voltage Archive (Tribute Page)](./Task2_TributePage) | HTML, CSS, JavaScript | [View](https://raw.githack.com/hafsa-tahir/OIBSIP/main/Task2_TributePage/index.html) |
| 3 | [TaskLedger — To-Do App](./Task3_TodoApp) | HTML, CSS, JavaScript | [View](https://raw.githack.com/hafsa-tahir/OIBSIP/main/Task3_TodoApp/index.html) |
| 4 | [SecureAccess — Login Authentication System](./Task4_LoginAuth) | HTML, CSS, JavaScript (Web Crypto API) | [View](https://raw.githack.com/hafsa-tahir/OIBSIP/main/Task4_LoginAuth/login.html) |

Each task folder has its own `README.md` with a full checklist breakdown, design notes, and instructions for running it locally.

---

## Project summaries

### 1. Voltmeter — Scientific Calculator
A calculator with Standard and Scientific modes, memory functions (MC/MR/M+/M−), a full calculation history panel, and a dark/light theme toggle. Expression parsing is done with a hand-written recursive-descent parser — no `eval()`.

### 2. Tesla — High Voltage Archive
An interactive tribute page for Nikola Tesla with a scrubbable timeline (1856–1943), a day/night theme toggle, real archive photography, and a distinct high-contrast collage design.

### 3. TaskLedger — To-Do App
A task manager with genuinely separate Pending and Completed lists, inline editing, categories, priority levels, due-date tracking with overdue highlighting, drag-and-drop reordering, and `localStorage` persistence.

### 4. SecureAccess — Login Authentication System
A client-side authentication flow: registration with password validation and duplicate-account checking, login with generic (non-revealing) error messages, a protected dashboard that redirects unauthenticated visitors, and logout. Passwords are salted and hashed with SHA-256 via the Web Crypto API — never stored in plain text.

---

## Running any task locally

Every project is plain HTML/CSS/JavaScript with no build step and no dependencies. Clone the repo and open the relevant `index.html` (or `login.html` for Task 4) directly in a browser:

```bash
git clone https://github.com/hafsa-tahir/OIBSIP.git
cd OIBSIP/Task1_Calculator   # or Task2_TributePage, Task3_TodoApp, Task4_LoginAuth
open index.html              # or double-click it in your file explorer
```

---

## Author

**Hafsa Tahir**
[LinkedIn](https://www.linkedin.com/in/hafsa-tahir-4b1220421/) · [GitHub](https://github.com/hafsa-tahir)

Internship reference: `OIB/R2/IP1877`
