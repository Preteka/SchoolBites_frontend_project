// Dashboard authentication is handled by storage.js; this file keeps the requested module boundary.
window.SchoolBiteDashboardAuth = { isLoggedIn: () => SBStore.loggedIn(), logout: () => SBStore.logout() };
