/* ===========================================================
   Shared authentication logic
   - SHA-256 password hashing (per-user random salt) via the
     browser's native Web Crypto API — no plaintext passwords
     ever touch storage.
   - Users + session both live in localStorage.
   =========================================================== */

const AUTH = (() => {
  const USERS_KEY = 'oibsip_auth_users';
  const SESSION_KEY = 'oibsip_auth_session';
  const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 2; // 2 hours

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function findUser(identifier) {
    const id = identifier.trim().toLowerCase();
    return getUsers().find(u => u.username.toLowerCase() === id);
  }

  function randomSalt() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function hashPassword(password, salt) {
    // Salted hash: SHA-256(salt + password). Simple, dependency-free,
    // and enough to satisfy "don't store plaintext passwords" for a
    // client-side demo — not a substitute for a real backend + bcrypt.
    return sha256(salt + password);
  }

  function validatePassword(password) {
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!/\d/.test(password)) return 'Password must include at least 1 number.';
    return null;
  }

  async function registerUser(username, password) {
    username = username.trim();
    if (!username || !password) return { ok: false, error: 'Please fill in every field.' };
    if (findUser(username)) return { ok: false, error: 'That username or email is already registered.' };

    const pwError = validatePassword(password);
    if (pwError) return { ok: false, error: pwError };

    const salt = randomSalt();
    const passwordHash = await hashPassword(password, salt);
    const users = getUsers();
    users.push({ username, salt, passwordHash, createdAt: Date.now() });
    saveUsers(users);
    return { ok: true };
  }

  async function loginUser(username, password) {
    username = username.trim();
    if (!username || !password) return { ok: false, error: 'Please fill in every field.' };

    const user = findUser(username);
    // Generic error on purpose — never reveal whether it was the
    // username or the password that was wrong.
    const genericError = 'Incorrect username/email or password.';
    if (!user) return { ok: false, error: genericError };

    const attemptHash = await hashPassword(password, user.salt);
    if (attemptHash !== user.passwordHash) return { ok: false, error: genericError };

    const token = randomSalt() + randomSalt();
    const session = { username: user.username, token, issuedAt: Date.now(), expiresAt: Date.now() + SESSION_LIFETIME_MS };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }

  function getSession() {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (!session) return null;
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session;
    } catch { return null; }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  // Call at the very top of any protected page. Redirects instantly
  // (before paint) if there is no valid session.
  function requireSession() {
    const session = getSession();
    if (!session) {
      window.location.replace('login.html');
      return null;
    }
    return session;
  }

  // Call on login/register pages: if already logged in, skip straight
  // to the dashboard instead of showing the form again.
  function redirectIfLoggedIn() {
    if (getSession()) window.location.replace('dashboard.html');
  }

  return { registerUser, loginUser, getSession, logout, requireSession, redirectIfLoggedIn, validatePassword };
})();
