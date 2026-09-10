// SchoolBite Admin Shell Manager
// Renders layout, sidebar, header, icons, modals, and toasts

const AdminIcons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
  children: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  parents: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  subscriptions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  meals: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 2v20M18 6h3M18 10h3M5 2v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2M8 13v9"/></svg>`,
  orders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  delivery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  notifications: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>`,
  userPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
  calendarPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  rupee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4 4 0 0 0 0-8"/></svg>`,
  pot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/><path d="M6 10H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2"/><path d="M6 10v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7"/><line x1="4" y1="6" x2="20" y2="6"/><path d="M10 6V4a2 2 0 0 1 4 0v2"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>`
};

const AdminShell = {
  activePage: 'dashboard',

  navItems: [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'dashboard.html' },
    { id: 'children', label: 'Children', icon: 'children', href: 'children.html' },
    { id: 'parents', label: 'Parents', icon: 'parents', href: 'parents.html' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'subscriptions', href: 'subscriptions.html' },
    { id: 'meals', label: 'Meal Management', icon: 'meals', href: 'meals.html' },
    { id: 'orders', label: 'Orders', icon: 'orders', href: 'orders.html' },
    { id: 'delivery', label: 'Delivery Management', icon: 'delivery', href: 'delivery.html' },
    { id: 'menu', label: 'Menu & Nutrition', icon: 'menu', href: 'menu.html' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', href: 'notifications.html' },
    { id: 'reports', label: 'Reports', icon: 'reports', href: 'reports.html' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' }
  ],

  init(pageId) {
    this.activePage = pageId || 'dashboard';
    this.renderShell();
    this.attachEvents();
    AdminStore.init();
  },

  renderShell() {
    const root = document.getElementById('admin-app');
    if (!root) return;

    const navHtml = this.navItems.map(item => `
      <a href="${item.href}" class="nav-item ${item.id === this.activePage ? 'active' : ''}" data-nav="${item.id}">
        ${AdminIcons[item.icon] || ''}
        <span>${item.label}</span>
      </a>
    `).join('');

    root.innerHTML = `
      <div class="admin-layout">
        <!-- SIDEBAR -->
        <aside class="sidebar" id="adminSidebar">
          <a href="dashboard.html" class="brand">
            <img src="../parent/assets/images/logo.png" alt="SchoolBite" class="brand-logo-img" onerror="this.outerHTML='<div class=\\'brand-title\\'><span class=\\'brand-name\\'>SchoolBite</span><span class=\\'brand-badge\\'>Admin</span></div>'">
          </a>
          <nav class="nav-section">
            ${navHtml}
          </nav>
          <div class="sidebar-footer">
            <a href="../parent/index.html" class="nav-item logout" id="adminLogout">
              ${AdminIcons.logout}
              <span>Logout</span>
            </a>
          </div>
        </aside>

        <!-- MAIN WRAPPER -->
        <div class="main-wrapper">
          <!-- TOPBAR -->
          <header class="topbar">
            <div class="topbar-search">
              ${AdminIcons.search}
              <input type="text" id="globalSearch" placeholder="Search students, parents, orders...">
            </div>
            <div class="topbar-actions">
              <a href="notifications.html" class="icon-btn" title="Notifications">
                ${AdminIcons.bell}
                <span class="icon-badge"></span>
              </a>
              <div class="admin-profile" id="adminProfileMenuBtn">
                <div class="admin-avatar">A</div>
                <div class="admin-info">
                  <span class="admin-name">Admin</span>
                  <span class="admin-role">Administrator</span>
                </div>
                <div class="admin-chevron">${AdminIcons.chevronDown}</div>
                <!-- Profile Dropdown -->
                <div class="profile-dropdown" id="profileDropdown">
                  <a href="settings.html" class="dropdown-item">
                    ${AdminIcons.settings}
                    <span>Admin Settings</span>
                  </a>
                  <a href="../parent/dashboard/dashboard.html" class="dropdown-item">
                    ${AdminIcons.eye}
                    <span>Parent Portal</span>
                  </a>
                  <a href="../parent/index.html" class="dropdown-item" style="color: #d9534f;">
                    ${AdminIcons.logout}
                    <span>Sign Out</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <!-- MAIN BODY -->
          <main class="content-body" id="pageContent">
            <!-- Dynamic Page Content Injected Here -->
          </main>
        </div>
      </div>

      <!-- MODAL CONTAINER -->
      <div class="modal-overlay" id="adminModal">
        <div class="modal-card" id="adminModalCard"></div>
      </div>

      <!-- TOAST CONTAINER -->
      <div class="toast-container" id="toastContainer"></div>
    `;
  },

  attachEvents() {
    // Profile Dropdown Toggle
    const profileBtn = document.getElementById('adminProfileMenuBtn');
    const dropdown = document.getElementById('profileDropdown');
    if (profileBtn && dropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        dropdown.classList.remove('open');
      });
    }

    // Global search enter
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim().toLowerCase();
          if (q) {
            window.location.href = `children.html?search=${encodeURIComponent(q)}`;
          }
        }
      });
    }

    // Close modal on backdrop click
    const modal = document.getElementById('adminModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          AdminShell.closeModal();
        }
      });
    }
  },

  // Modal Helpers
  openModal(htmlContent) {
    const modal = document.getElementById('adminModal');
    const card = document.getElementById('adminModalCard');
    if (modal && card) {
      card.innerHTML = htmlContent;
      modal.classList.add('open');
    }
  },

  closeModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
      modal.classList.remove('open');
    }
  },

  // Toast Helper
  toast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      ${AdminIcons.check}
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

window.AdminIcons = AdminIcons;
window.AdminShell = AdminShell;
