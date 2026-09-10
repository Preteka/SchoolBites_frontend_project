/**
 * SchoolBite - Reusable UI Components (components.js)
 * Generates dynamic UI elements for Meals, Services, Pricing, Blogs, Testimonials, and FAQs.
 * Contains Lucide-style vector SVG library and navigation components.
 * Zero markup duplication. Strictly no emojis used.
 */

const SchoolBiteAuth = (() => {
  const USERS_KEY = 'schoolbite_users';
  const SESSION_KEY = 'schoolbite_session';
  const LEGACY_USERS_KEY = 'schoolbite_accounts';

  function readUsers() {
    try {
      const stored = JSON.parse(localStorage.getItem(USERS_KEY) || 'null');
      if (Array.isArray(stored)) return stored;
      const legacy = JSON.parse(localStorage.getItem(LEGACY_USERS_KEY) || '[]');
      const migrated = Array.isArray(legacy) ? legacy.map(user => ({
        ...user,
        paymentCompleted: Boolean(user.paymentCompleted),
        subscriptionActive: Boolean(user.subscriptionActive)
      })) : [];
      localStorage.setItem(USERS_KEY, JSON.stringify(migrated));
      return migrated;
    } catch {
      return [];
    }
  }

  function writeUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
  function readSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
  }
  function currentUser() {
    const session = readSession();
    if (!session || !session.loggedIn || !session.email) return null;
    return readUsers().find(user => user.email.toLowerCase() === session.email.toLowerCase()) || null;
  }
  function setSession(email) { localStorage.setItem(SESSION_KEY, JSON.stringify({ loggedIn: true, email })); }
  function login(email, password) {
    const user = readUsers().find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!user) return { ok: false, message: 'Email or password is incorrect.' };
    setSession(user.email);
    return { ok: true, user };
  }
  function signup(data) {
    const users = readUsers();
    if (users.some(user => user.email.toLowerCase() === data.email.trim().toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists. Please log in.' };
    }
    const user = { ...data, email: data.email.trim(), paymentCompleted: false, subscriptionActive: false };
    users.push(user);
    writeUsers(users);
    setSession(user.email);
    return { ok: true, user };
  }
  function updateUser(updates) {
    const user = currentUser();
    if (!user) return null;
    const users = readUsers().map(item => item.email.toLowerCase() === user.email.toLowerCase() ? { ...item, ...updates } : item);
    writeUsers(users);
    return users.find(item => item.email.toLowerCase() === user.email.toLowerCase());
  }
  function logout() { localStorage.removeItem(SESSION_KEY); }
  function isLoggedIn() { return Boolean(currentUser()); }
  function isPaid() { return Boolean(currentUser()?.paymentCompleted && currentUser()?.subscriptionActive); }
  function continueSubscription(planId, cycle) {
    if (planId) localStorage.setItem('schoolbite_pending_plan', planId);
    if (cycle) localStorage.setItem('schoolbite_pending_cycle', cycle);
    window.location.href = 'subscription-setup.html?plan=' + encodeURIComponent(planId || localStorage.getItem('schoolbite_pending_plan') || '');
  }

  return { readUsers, currentUser, login, signup, updateUser, logout, isLoggedIn, isPaid, continueSubscription, readSession };
})();

const SchoolBiteComponents = (() => {
  // Lucide-style SVG icon system
  const SVG_ICONS = {
    'logo-leaf': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    'sun': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    'moon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    'arrow-left': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    'check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    'star': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    'chevron-up': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
    'chevron-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    'menu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    'x': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    'box': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    'calendar': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    'shield-check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    'heart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    'award': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    'dollar-sign': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 0-9H6"/></svg>`,
    'rupee': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 0-9H6"/></svg>`,
    'flame': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    'clock': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    'user': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    'settings': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    'log-in': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`,
    'user-plus': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`,
    'search': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    'filter': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    'phone': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    'mail': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    'truck': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
    'plus': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
    'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    'alert-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    'help-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
    'refresh-cw': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    'shield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'camera': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
    'edit-3': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
  };

  /**
   * Helper to retrieve SVG icon HTML markup
   * @param {string} name - icon name
   * @param {string} className - optional CSS class
   * @returns {string} - SVG string
   */
  function getSvgIcon(name, className = 'icon') {
    const svg = SVG_ICONS[name] || SVG_ICONS['sparkles'];
    if (!className) return svg;
    return svg.replace('<svg', `<svg class="${className}" aria-hidden="true"`);
  }

  /**
   * 1. createMealCard()
   * Generates a reusable meal card matching the exact prompt specification:
   * Day/date, Food image, Meal name, Description, Calories, Dietary label, Nutrition tag, Select/View button
   * @param {object} meal - meal object from data.js
   * @param {object} options - configuration options (e.g. isSelected)
   * @returns {string} - HTML string
   */
  function createMealCard(meal, options = {}) {
    const isSelected = options.isSelected || false;
    const allergensText = meal.allergens && meal.allergens.length > 0
      ? `Allergens: ${meal.allergens.join(', ')}`
      : 'Allergen-Safe';

    return `
      <article class="meal-card ${isSelected ? 'is-selected' : ''}" data-meal-id="${meal.id}" data-day="${meal.day}">
        <div class="meal-card-image-wrap">
          <img src="${meal.image}" alt="${meal.name}" class="meal-card-image" loading="lazy" />
          <div class="meal-card-badges">
            <span class="badge badge-day">${getSvgIcon('calendar', 'badge-icon')} ${meal.day}</span>
            <span class="badge badge-dietary ${meal.dietary.toLowerCase().includes('non') ? 'badge-nonveg' : 'badge-veg'}">
              <span class="dietary-dot"></span> ${meal.dietary}
            </span>
          </div>
          <span class="meal-calorie-pill">
            ${getSvgIcon('flame', 'icon-flame')} ${meal.calories} kcal
          </span>
        </div>

        <div class="meal-card-body">
          <div class="meal-card-header">
            <span class="nutrition-tag">${meal.nutritionTag}</span>
            <div class="meal-rating" title="Rated ${meal.rating} out of 5">
              ${getSvgIcon('star', 'icon-star')}
              <span>${meal.rating}</span>
            </div>
          </div>

          <h3 class="meal-title">${meal.name}</h3>
          <p class="meal-description">${meal.description}</p>

          <div class="meal-nutrition-row">
            <div class="nutri-item">
              <span class="nutri-label">Protein</span>
              <span class="nutri-val">${meal.protein}</span>
            </div>
            <div class="nutri-divider"></div>
            <div class="nutri-item">
              <span class="nutri-label">Carbs</span>
              <span class="nutri-val">${meal.carbs}</span>
            </div>
            <div class="nutri-divider"></div>
            <div class="nutri-item">
              <span class="nutri-label">Healthy Fat</span>
              <span class="nutri-val">${meal.fat}</span>
            </div>
          </div>

          <div class="meal-card-footer">
            <span class="meal-allergen-hint">${allergensText}</span>
            <button type="button" class="btn btn-select-meal ${isSelected ? 'selected' : ''}" data-action="toggle-meal-selection" data-meal-id="${meal.id}" aria-label="Select ${meal.name}">
              <span class="btn-text-unselected">
                <span>Select Meal</span>
                ${getSvgIcon('arrow-right', 'btn-icon')}
              </span>
              <span class="btn-text-selected">
                ${getSvgIcon('check', 'btn-icon-check')}
                <span>Selected</span>
              </span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * 2. createServiceCard()
   * Reusable service card with Lucide icon, title, description, and key perks
   * @param {object} service - service object
   * @returns {string} - HTML string
   */
  function createServiceCard(service) {
    const perksHtml = service.perks.map(perk => `
      <li class="service-perk-item">
        ${getSvgIcon('check-circle', 'perk-check-icon')}
        <span>${perk}</span>
      </li>
    `).join('');

    // Map existing service IDs to URL keys used by service-detail.html
    const SERVICE_URL_MAP = {
      'service-school-meals':        'school-meal',
      'service-weekly-planning':     'weekly-meal',
      'service-subscriptions':       'meal-subscriptions',
      'service-dietary-preferences': 'dietary-preferences',
      'service-nutrition-focus':     'nutrition-focused',
      'service-digital-payments':    'digital-payments',
      'service-child-profiles':      'dashboard/children.html',
      'service-delivery-tracking':   'dashboard/delivery.html'
    };
    const urlKey = SERVICE_URL_MAP[service.id] || 'school-meal';
    const detailHref = service.id === 'service-child-profiles' || service.id === 'service-delivery-tracking'
      ? urlKey
      : `service-detail.html?service=${urlKey}`;

    return `
      <div class="service-card" data-service-id="${service.id}">
        <div class="service-icon-wrap">
          ${getSvgIcon(service.icon, 'service-icon')}
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
        <ul class="service-perks-list">
          ${perksHtml}
        </ul>
        <div class="service-card-action">
          <a href="${detailHref}" class="link-with-arrow">
            <span>Learn more</span>
            ${getSvgIcon('arrow-right', 'icon-arrow')}
          </a>
        </div>
      </div>
    `;
  }

  /**
   * 3. createPricingCard()
   * Reusable pricing card with monthly/term dynamic price, feature checklist, and CTA
   * @param {object} plan - plan object
   * @param {string} billingCycle - 'monthly' or 'term'
   * @returns {string} - HTML string
   */
  function createPricingCard(plan, billingCycle = 'monthly') {
    const isTerm = billingCycle === 'term';
    const price = isTerm ? plan.priceTerm : plan.priceMonthly;
    const cycleLabel = isTerm ? '/ 3-month term' : '/ month';
    const savingsBadge = isTerm ? `<span class="pricing-savings-tag">Save 10%</span>` : '';

    const featuresHtml = plan.features.map(feat => `
      <li class="pricing-feature ${feat.included ? 'included' : 'excluded'}">
        <span class="feature-status-icon">
          ${feat.included ? getSvgIcon('check', 'feat-check') : getSvgIcon('x', 'feat-x')}
        </span>
        <span class="feature-name">${feat.name}</span>
      </li>
    `).join('');

    return `
      <div class="pricing-card ${plan.featured ? 'is-featured' : ''}" data-plan-id="${plan.id}">
        ${plan.featured ? `<div class="pricing-popular-badge">${getSvgIcon('sparkles', 'badge-sparkle')} ${plan.badge}</div>` : ''}
        
        <div class="pricing-header">
          <h3 class="pricing-tier-name">${plan.name}</h3>
          <p class="pricing-tier-desc">${plan.description}</p>
          <div class="pricing-price-wrap">
            <span class="currency-symbol">₹</span>
            <span class="price-value" data-base-monthly="${plan.priceMonthly}" data-base-term="${plan.priceTerm}">${price.toLocaleString('en-IN')}</span>
            <span class="price-cycle">${cycleLabel}</span>
            ${savingsBadge}
          </div>
        </div>

        <ul class="pricing-features-list">
          ${featuresHtml}
        </ul>

        <div class="pricing-cta-wrap">
          <a href="#" data-modal-target="login-modal" data-plan-id="${encodeURIComponent(plan.id)}" data-plan-cycle="${encodeURIComponent(plan.planCode)}" class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} btn-block" id="pricing-cta-${plan.id}">
            <span>${plan.ctaText}</span>
            ${getSvgIcon('arrow-right', 'btn-icon')}
          </a>
          <span class="pricing-guarantee-note">Pause or cancel anytime</span>
        </div>
      </div>
    `;
  }

  /**
   * 4. createBlogCard()
   * Reusable blog card with category badge, image, title, author, description, and link
   * @param {object} post - blog post object
   * @returns {string} - HTML string
   */
  function createBlogCard(post) {
    const slugMap = {
      'blog-1': 'brain-food',
      'blog-2': 'picky-eating',
      'blog-3': 'morning-rush',
      'blog-4': 'cauliflower-alfredo',
      'blog-5': 'sugar-crash',
      'blog-6': 'safe-food-standards'
    };
    const slug = post.slug || slugMap[post.id] || post.id;

    return `
      <article class="blog-card" data-category="${post.category}" data-slug="${slug}">
        <div class="blog-card-image-wrap">
          <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />
          <span class="badge badge-category">${post.category}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-meta-row">
            <span class="blog-date">${getSvgIcon('calendar', 'meta-icon')} ${post.date}</span>
            <span class="meta-dot"></span>
            <span class="blog-readtime">${getSvgIcon('clock', 'meta-icon')} ${post.readTime}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.description}</p>
          <div class="blog-card-footer">
            <span class="blog-author-name">${post.author}</span>
            <a href="blog.html#blog/${slug}" class="btn-read-more" aria-label="Read full article: ${post.title}">
              <span>Read More</span>
              ${getSvgIcon('arrow-right', 'icon-arrow')}
            </a>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * 5. createTestimonialCard()
   * Reusable parent testimonial card with rating stars and verified badge
   * @param {object} test - testimonial object
   * @returns {string} - HTML string
   */
  function createTestimonialCard(test) {
    const totalStars = 5;
    const starsHtml = Array.from({ length: totalStars }).map((_, i) => {
      const className = i < test.rating ? 'star-rating-icon orange' : 'star-rating-icon';
      return getSvgIcon('star', className);
    }).join('');

    return `
      <div class="testimonial-card">
        <div class="testimonial-stars-row">
          ${starsHtml}
          <span class="verified-parent-badge">
            ${getSvgIcon('shield-check', 'badge-icon')} Verified Parent
          </span>
        </div>
        <blockquote class="testimonial-quote">
          “${test.quote}”
        </blockquote>
        <div class="testimonial-author-row">
          <img src="${test.avatar}" alt="${test.parentName}" class="author-avatar" loading="lazy" />
          <div class="author-info">
            <div class="author-name">${test.parentName}</div>
            <div class="author-role">${test.role}</div>
            <div class="author-school">${test.school}</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 6. createFAQItem()
   * Reusable accessible accordion FAQ item
   * @param {object} faq - FAQ object
   * @param {number} index - item index
   * @returns {string} - HTML string
   */
  function createFAQItem(faq, index) {
    const id = `faq-${index}`;
    return `
      <div class="faq-item" data-faq-index="${index}">
        <button type="button" class="faq-question-btn" aria-expanded="false" aria-controls="${id}-content" id="${id}-btn">
          <span class="faq-question-text">${faq.question}</span>
          <span class="faq-icon-wrap" aria-hidden="true">
            ${getSvgIcon('chevron-down', 'faq-chevron')}
          </span>
        </button>
        <div class="faq-answer-panel" id="${id}-content" role="region" aria-labelledby="${id}-btn" hidden>
          <p class="faq-answer-text">${faq.answer}</p>
        </div>
      </div>
    `;
  }

  /**
   * Generates unified Header navigation for all pages
   * @param {string} activePage - current page filename e.g. 'index.html'
   * @returns {string} - HTML string
   */
  function renderHeader(activePage = 'index.html') {
    const currentUser = SchoolBiteAuth.currentUser();
    const isLoggedIn = Boolean(currentUser);
    const safe = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const profileMenuHtml = isLoggedIn ? `
                <div class="profile-dropdown-account">
                  <span class="profile-dropdown-title">${safe(currentUser.name || 'Parent')}</span>
                  <span class="profile-dropdown-subtitle">${safe(currentUser.email)}</span>
                </div>
                ${SchoolBiteAuth.isPaid() ? `<a href="dashboard/dashboard.html" class="profile-dropdown-item" role="menuitem">` : `<button type="button" class="profile-dropdown-item" role="menuitem" data-continue-subscription>`}
                  <span class="profile-dropdown-icon">${getSvgIcon(SchoolBiteAuth.isPaid() ? 'user' : 'arrow-right', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">${SchoolBiteAuth.isPaid() ? 'Dashboard' : 'Continue Subscription'}</span><span class="profile-dropdown-subtitle">${SchoolBiteAuth.isPaid() ? 'Open parent portal' : 'Choose a meal plan'}</span></span>
                ${SchoolBiteAuth.isPaid() ? '</a>' : '</button>'}
                <a href="settings.html" class="profile-dropdown-item" role="menuitem">
                  <span class="profile-dropdown-icon">${getSvgIcon('settings', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">Settings</span><span class="profile-dropdown-subtitle">Preferences and alerts</span></span>
                </a>
                <button type="button" class="profile-dropdown-item" role="menuitem" data-public-logout>
                  <span class="profile-dropdown-icon">${getSvgIcon('log-in', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">Logout</span><span class="profile-dropdown-subtitle">Sign out securely</span></span>
                </button>` : `
                  <button type="button" class="profile-dropdown-item" role="menuitem" data-modal-target="login-modal">
                  <span class="profile-dropdown-icon">${getSvgIcon('log-in', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">Login</span><span class="profile-dropdown-subtitle">Access your account</span></span>
                  </button>
                <button type="button" class="profile-dropdown-item" role="menuitem" data-modal-target="signup-modal">
                  <span class="profile-dropdown-icon">${getSvgIcon('user-plus', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">Sign Up</span><span class="profile-dropdown-subtitle">Create a parent profile</span></span>
                </button>
                <a href="settings.html" class="profile-dropdown-item" role="menuitem">
                  <span class="profile-dropdown-icon">${getSvgIcon('settings', 'icon')}</span>
                  <span class="profile-dropdown-text"><span class="profile-dropdown-title">Settings</span><span class="profile-dropdown-subtitle">Preferences and alerts</span></span>
                </a>`;
    const navLinksHtml = `
      <li class="nav-item">
        <a href="index.html" class="nav-link ${activePage === 'index.html' ? 'active' : ''}" ${activePage === 'index.html' ? 'aria-current="page"' : ''}>Home</a>
      </li>
      <li class="nav-item">
        <a href="home2.html" class="nav-link ${activePage === 'home2.html' || activePage === 'home1.html' ? 'active' : ''}" ${activePage === 'home2.html' || activePage === 'home1.html' ? 'aria-current="page"' : ''}>Home 2</a>
      </li>
      <li class="nav-item">
        <a href="about.html" class="nav-link ${activePage === 'about.html' ? 'active' : ''}" ${activePage === 'about.html' ? 'aria-current="page"' : ''}>About Us</a>
      </li>
      <li class="nav-item">
        <a href="services.html" class="nav-link ${activePage === 'services.html' ? 'active' : ''}" ${activePage === 'services.html' ? 'aria-current="page"' : ''}>Services</a>
      </li>
      <li class="nav-item">
        <a href="pricing.html" class="nav-link ${activePage === 'pricing.html' ? 'active' : ''}" ${activePage === 'pricing.html' ? 'aria-current="page"' : ''}>Pricing</a>
      </li>
      <li class="nav-item">
        <a href="blog.html" class="nav-link ${activePage === 'blog.html' ? 'active' : ''}" ${activePage === 'blog.html' ? 'aria-current="page"' : ''}>Blog</a>
      </li>
      <li class="nav-item">
        <a href="contact.html" class="nav-link ${activePage === 'contact.html' ? 'active' : ''}" ${activePage === 'contact.html' ? 'aria-current="page"' : ''}>Contact</a>
      </li>
    `;

    const mobileNavHtml = `
      <li><a href="index.html" class="mobile-nav-link ${activePage === 'index.html' ? 'active' : ''}">${getSvgIcon('box', 'mobile-icon')} Home</a></li>
      <li><a href="home2.html" class="mobile-nav-link ${activePage === 'home2.html' || activePage === 'home1.html' ? 'active' : ''}">${getSvgIcon('heart', 'mobile-icon')} Home 2</a></li>
      <li><a href="about.html" class="mobile-nav-link ${activePage === 'about.html' ? 'active' : ''}">${getSvgIcon('shield-check', 'mobile-icon')} About Us</a></li>
      <li><a href="services.html" class="mobile-nav-link ${activePage === 'services.html' ? 'active' : ''}">${getSvgIcon('box', 'mobile-icon')} Services</a></li>
      <li><a href="pricing.html" class="mobile-nav-link ${activePage === 'pricing.html' ? 'active' : ''}">${getSvgIcon('dollar-sign', 'mobile-icon')} Pricing</a></li>
      <li><a href="blog.html" class="mobile-nav-link ${activePage === 'blog.html' ? 'active' : ''}">${getSvgIcon('sparkles', 'mobile-icon')} Blog</a></li>
      <li><a href="contact.html" class="mobile-nav-link ${activePage === 'contact.html' ? 'active' : ''}">${getSvgIcon('phone', 'mobile-icon')} Contact</a></li>
    `;

    return `
      <header class="site-header" id="main-header">
        <div class="container header-container">
          <!-- Logo: Actual SchoolBite Logo Image -->
          <a href="index.html" class="site-logo" id="site-brand-logo" aria-label="SchoolBite Homepage">
            <img src="assets/images/logo.png" alt="SchoolBite — Healthy Meals. Brighter Futures." class="site-logo-img" />
          </a>

          <!-- Desktop Navigation -->
          <nav class="main-navigation" aria-label="Main Navigation">
            <ul class="nav-list">
              ${navLinksHtml}
            </ul>
          </nav>

          <!-- Header Right Actions -->
          <div class="header-actions">
            <!-- Search Icon Button -->
            <button type="button" class="btn-icon-header" id="header-search-btn" aria-label="Search" title="Search">
              ${getSvgIcon('search', 'icon-search')}
            </button>

            <!-- Theme Toggle Button -->
            <button type="button" class="btn-theme-toggle" id="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle theme">
              <span class="theme-icon theme-icon-sun">${getSvgIcon('sun', 'icon-sun')}</span>
              <span class="theme-icon theme-icon-moon">${getSvgIcon('moon', 'icon-moon')}</span>
            </button>

            <!-- Profile Menu -->
            <div class="profile-menu" data-profile-menu>
              <button type="button" class="btn-profile-toggle" id="profile-menu-toggle" aria-label="Profile menu" aria-haspopup="menu" aria-expanded="false" aria-controls="profile-menu-dropdown" title="Profile">
                ${getSvgIcon('user', 'icon-profile')}
              </button>
              <div class="profile-dropdown" id="profile-menu-dropdown" role="menu" aria-label="Profile menu">
                ${profileMenuHtml}
              </div>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <button type="button" class="btn-hamburger" id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
          <div class="drawer-header">
            <a href="index.html" class="site-logo">
              <img src="assets/images/logo.png" alt="SchoolBite" class="site-logo-img" />
            </a>
            <button type="button" class="btn-close-drawer" id="close-mobile-menu" aria-label="Close menu">
              ${getSvgIcon('x', 'icon-close')}
            </button>
          </div>
          <div class="drawer-body">
            <ul class="mobile-nav-list">
              ${mobileNavHtml}
            </ul>
          </div>
        </div>
        <div class="mobile-drawer-backdrop" id="drawer-backdrop"></div>
      </header>
    `;
  }

  /**
   * Generates common Footer markup for all pages
   * @returns {string} - HTML string
   */
  function renderFooter() {
    return `
      <footer class="site-footer">
        <!-- Subtle leaf decor overlay -->
        <div class="footer-bg-decor" aria-hidden="true">
          <svg class="footer-wave" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0,40 C320,100 480,0 720,50 C960,100 1120,20 1440,60 L1440,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>

        <div class="container footer-container">
          <div class="footer-grid">
            <!-- Col 1: Brand Info -->
            <div class="footer-col footer-col-brand">
              <a href="index.html" class="site-logo footer-logo" aria-label="SchoolBite Homepage">
                <img src="assets/images/logo.png" alt="SchoolBite — Healthy Meals. Brighter Futures." class="site-logo-img" style="height: 40px; width: auto;" />
              </a>
              <p class="footer-brand-tagline">Healthy Meals. Brighter Futures.</p>
              <p class="footer-brand-desc">
                Nutritious and thoughtfully planned school meals made simple for parents and enjoyable for children.
              </p>
              <div class="footer-quality-badges">
                <span class="quality-badge">${getSvgIcon('shield-check', 'badge-icon')} FSSAI Certified</span>
                <span class="quality-badge">${getSvgIcon('award', 'badge-icon')} 100% Food-Grade SS304</span>
              </div>
            </div>

            <!-- Col 2: Navigation Links (Matching Main Navbar Exactly) -->
            <div class="footer-col">
              <h4 class="footer-col-title">Quick Links</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="home1.html">Home 2</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>

            <!-- Col 3: Parent Dashboard -->
            <div class="footer-col">
              <h4 class="footer-col-title">Parent Dashboard</h4>
              <ul class="footer-links">
                <li><a href="profile.html">My Children</a></li>
                <li><a href="index.html#menu-section">Weekly Menu</a></li>
                <li><a href="settings.html">Meal Preferences</a></li>
                <li><a href="pricing.html">Subscriptions</a></li>
                <li><a href="profile.html#payments">Payments</a></li>
                <li><a href="profile.html#history">Meal History</a></li>
                <li><a href="settings.html#notifications">Notifications</a></li>
                <li><a href="settings.html">Settings</a></li>
              </ul>
            </div>

            <!-- Col 4: Contact & Kitchen Info (Tamil Nadu Location) -->
            <div class="footer-col footer-col-contact">
              <h4 class="footer-col-title">Central Kitchen</h4>
              <ul class="footer-contact-list">
                <li>
                  <span class="contact-icon">${getSvgIcon('map-pin', 'icon')}</span>
                  <span>No. 18, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004</span>
                </li>
                <li>
                  <span class="contact-icon">${getSvgIcon('phone', 'icon')}</span>
                  <span>+91 422 456 7890</span>
                </li>
                <li>
                  <span class="contact-icon">${getSvgIcon('mail', 'icon')}</span>
                  <span>support@schoolbite.in</span>
                </li>
                <li>
                  <span class="contact-icon">${getSvgIcon('clock', 'icon')}</span>
                  <span>Mon–Sat, 6:30 AM – 5:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="footer-bottom-bar">
            <p class="footer-copyright">
              &copy; ${new Date().getFullYear()} SchoolBite. All rights reserved.
            </p>
            <div class="footer-legal-links">
              <a href="settings.html#privacy">Privacy Policy</a>
              <span class="footer-sep">|</span>
              <a href="settings.html#terms">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Auth Modals (Login & Sign-Up) and Add Child Modal markup
   * @returns {string} - HTML string
   */
  function renderAuthModals() {
    return `
      <!-- Login Modal -->
      <div class="modal-backdrop" id="login-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title-wrap">
              <span class="modal-icon">${getSvgIcon('log-in', 'icon')}</span>
              <h3 class="modal-title" id="login-modal-title">Parent Login</h3>
            </div>
            <button type="button" class="btn-modal-close" data-close-modal aria-label="Close modal">
              ${getSvgIcon('x', 'icon')}
            </button>
          </div>
          <form class="modal-form" id="login-form" novalidate>
            <div class="form-group">
              <label for="login-email" class="form-label">Registered Email Address</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('mail', 'icon')}</span>
                <input type="email" id="login-email" class="form-control" placeholder="parent@example.com" required autocomplete="email" />
              </div>
              <span class="form-error-text" id="login-email-error"></span>
            </div>
            <div class="form-group">
              <div class="form-label-row">
                <label for="login-password" class="form-label">Password</label>
                <a href="#forgot" class="form-hint-link">Forgot password?</a>
              </div>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('shield', 'icon')}</span>
                <input type="password" id="login-password" class="form-control" placeholder="Enter your password" required autocomplete="current-password" />
              </div>
              <button type="button" class="auth-password-toggle" data-toggle-password="login-password">Show password</button>
              <span class="form-error-text" id="login-password-error"></span>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-submit-auth">
              <span>Sign In to Parent Portal</span>
              ${getSvgIcon('arrow-right', 'btn-icon')}
            </button>
            <p class="modal-switch-text">
              Don't have an account yet? 
              <button type="button" class="btn-link-inline" data-switch-modal="signup-modal">Create an account</button>
            </p>
          </form>
        </div>
      </div>

      <!-- Sign Up Modal -->
      <div class="modal-backdrop" id="signup-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title-wrap">
              <span class="modal-icon">${getSvgIcon('user-plus', 'icon')}</span>
              <h3 class="modal-title" id="signup-modal-title">Create Parent Account</h3>
            </div>
            <button type="button" class="btn-modal-close" data-close-modal aria-label="Close modal">
              ${getSvgIcon('x', 'icon')}
            </button>
          </div>
          <form class="modal-form" id="signup-form" novalidate>
            <div class="form-group">
              <label for="signup-name" class="form-label">Full Name</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('user', 'icon')}</span>
                <input type="text" id="signup-name" class="form-control" placeholder="e.g. Radhika Sharma" required autocomplete="name" />
              </div>
              <span class="form-error-text" id="signup-name-error"></span>
            </div>
            <div class="form-group">
              <label for="signup-email" class="form-label">Email Address</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('mail', 'icon')}</span>
                <input type="email" id="signup-email" class="form-control" placeholder="radhika@example.com" required autocomplete="email" />
              </div>
              <span class="form-error-text" id="signup-email-error"></span>
            </div>
            <div class="form-group">
              <label for="signup-phone" class="form-label">Mobile Number (for delivery alerts)</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('phone', 'icon')}</span>
                <input type="tel" id="signup-phone" class="form-control" placeholder="98450 12345" required autocomplete="tel" />
              </div>
              <span class="form-error-text" id="signup-phone-error"></span>
            </div>
            <div class="form-group">
              <label for="signup-password" class="form-label">Create Password (min 8 characters)</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('shield', 'icon')}</span>
                <input type="password" id="signup-password" class="form-control" placeholder="Create strong password" required minlength="8" />
              </div>
              <span class="form-error-text" id="signup-password-error"></span>
            </div>
            <div class="form-group">
              <label for="signup-password-confirm" class="form-label">Confirm Password</label>
              <div class="input-with-icon">
                <span class="input-icon">${getSvgIcon('shield', 'icon')}</span>
                <input type="password" id="signup-password-confirm" class="form-control" placeholder="Re-enter your password" required />
              </div>
              <span class="form-error-text" id="signup-password-confirm-error"></span>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-submit-auth">
              <span>Create Account & Start Subscribing</span>
              ${getSvgIcon('arrow-right', 'btn-icon')}
            </button>
            <p class="modal-switch-text">
              Already have an account? 
              <button type="button" class="btn-link-inline" data-switch-modal="login-modal">Log in here</button>
            </p>
          </form>
        </div>
      </div>

      <!-- Toast Container -->
      <div class="toast-container" id="toast-container" aria-live="polite"></div>
    `;
  }

  function initHeaderInteractions() {
    const closeProfileMenu = () => {
      const profileMenu = document.querySelector('[data-profile-menu]');
      const toggle = document.getElementById('profile-menu-toggle');
      if (profileMenu) profileMenu.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    };

    document.addEventListener('click', (e) => {
      const profileToggle = e.target.closest('#profile-menu-toggle');
      const profileMenu = e.target.closest('[data-profile-menu]');
      const profileItem = e.target.closest('.profile-dropdown-item');
      if (profileToggle) {
        const menuWrap = profileToggle.closest('[data-profile-menu]');
        const isOpen = menuWrap.classList.contains('is-open');
        document.querySelectorAll('[data-profile-menu].is-open').forEach((menu) => {
          if (menu !== menuWrap) menu.classList.remove('is-open');
        });
        menuWrap.classList.toggle('is-open', !isOpen);
        profileToggle.setAttribute('aria-expanded', String(!isOpen));
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (profileItem) {
        closeProfileMenu();
        return;
      }

      if (profileMenu) return;
      closeProfileMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProfileMenu();
    });
  }

  // Public API
  return {
    getSvgIcon,
    createMealCard,
    createServiceCard,
    createPricingCard,
    createBlogCard,
    createTestimonialCard,
    createFAQItem,
    renderHeader,
    renderFooter,
    renderAuthModals,
    initHeaderInteractions
  };
})();

// Export globally
if (typeof window !== 'undefined') {
  window.SchoolBiteAuth = SchoolBiteAuth;
  window.SchoolBiteComponents = SchoolBiteComponents;
}
