// auth.js – Simple client‑side authentication shim
// Stores a logged‑in flag and user email in localStorage.
// No backend integration – for demo / public flow only.

const Auth = (() => {
  const STORAGE_KEY = 'schoolbite_user';

  function login(email) {
    if (!email) return false;
    const user = { email: email, loggedIn: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  function signup(email) {
    // For simplicity signup does the same as login.
    return login(email);
  }

  function isLoggedIn() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const user = JSON.parse(stored);
      return !!user.loggedIn;
    } catch {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getUserEmail() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      const user = JSON.parse(stored);
      return user.email || null;
    } catch {
      return null;
    }
  }

  return { login, signup, isLoggedIn, logout, getUserEmail };
})();

// Export for browser global usage
if (typeof window !== 'undefined') {
  window.Auth = Auth;
}
