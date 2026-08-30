# SecureAccess — Login Authentication System

**Oasis Infobyte — Web Development & Designing Internship — Level 2, Task 4**

A client-side authentication system: registration, login, a protected dashboard, and logout — built with plain HTML/CSS/JS (Approach A from the task brief), so it deploys exactly like the other three tasks via GitHub Pages, no server to host.

## Checklist compliance

- [x] Registration page — username/email + password fields, "Register" button
- [x] Password validation on registration — minimum 8 characters, at least 1 number
- [x] Duplicate username/email check — clear error if the account already exists
- [x] Login page — username/email + password fields, "Login" button
- [x] Incorrect credential handling — a single generic error ("Incorrect username/email or password") that never reveals which field was wrong
- [x] Protected dashboard page — only renders with a valid session; visiting `dashboard.html` directly without logging in redirects straight to `login.html`, before the page paints
- [x] Logout button — clears the session and redirects to login
- [x] **Passwords are never stored in plain text** — each password is combined with a random per-user salt and hashed with SHA-256 via the browser's native Web Crypto API
- [x] Basic form validation on both pages — empty submissions are rejected with an inline message

## How the security works

- **Hashing:** `SHA-256(salt + password)`. Each user gets a random 16-byte salt generated with `crypto.getRandomValues`, so two users with the same password never produce the same stored hash.
- **Sessions:** on successful login, a random session token is generated and stored in `localStorage` with a 2-hour expiry. The dashboard checks this **synchronously in `<head>`, before the page body renders**, so there's no flash of protected content before the redirect kicks in.
- **Honest limitation:** this is client-side hashing in the browser, which is appropriate for a front-end-only demo but is **not** a substitute for real backend authentication (a real system should hash server-side with bcrypt/argon2 and never trust the client). This trade-off is explicit in the task brief's Approach A.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Redirects to `login.html` |
| `register.html` | Create a new account |
| `login.html` | Log in to an existing account |
| `dashboard.html` | Protected page — requires a valid session |
| `auth.js` | Shared logic: hashing, storage, session guard |
| `style.css` | Shared "secure terminal" styling |

## Running it

Open `login.html` (or `index.html`) directly in a browser, or serve the folder — no build step or dependencies. Try visiting `dashboard.html` directly without registering/logging in first to see the redirect guard in action.

## Notes

All user data and sessions live in the browser's `localStorage`, scoped to wherever this page is hosted. Clearing your browser storage clears all registered accounts.
