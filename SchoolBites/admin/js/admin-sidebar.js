// Reusable sidebar HTML generator
// Call: document.getElementById('sidebarMount').innerHTML = buildSidebar('pageid');
function buildSidebar(activePage) {
  var navItems = [
    { id:'dashboard',      label:'Dashboard',         icon:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',  href:'dashboard.html' },
    { id:'children',       label:'Children',           icon:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',                                                                                                                      href:'children.html' },
    { id:'parents',        label:'Parents',            icon:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',                                         href:'parents.html' },
    { id:'subscriptions',  label:'Subscriptions',      icon:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',                                                                                                                  href:'subscriptions.html' },
    { id:'meals',          label:'Meal Management',    icon:'<path d="M18 2v20M18 6h3M18 10h3M5 2v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2M8 13v9"/>',                                                                                                                        href:'meals.html' },
    { id:'orders',         label:'Orders',             icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',                                        href:'orders.html' },
    { id:'delivery',       label:'Delivery Management',icon:'<rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',                          href:'delivery.html' },
    { id:'menu',           label:'Menu &amp; Nutrition',icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',                                                                                href:'menu.html' },
    { id:'notifications',  label:'Notifications',      icon:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',                                                                                                           href:'notifications.html' },
    { id:'reports',        label:'Reports',            icon:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',                                                                                      href:'reports.html' },
    { id:'settings',       label:'Settings',           icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',href:'settings.html' }
  ];

  var navHtml = navItems.map(function(item) {
    return '<a href="' + item.href + '" class="nav-item' + (item.id === activePage ? ' active' : '') + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">' + item.icon + '</svg>' +
      '<span>' + item.label + '</span></a>';
  }).join('');

  return '<a href="dashboard.html" class="brand">' +
    '<img src="../parent/assets/images/logo.png" alt="SchoolBite" class="brand-logo-img" onerror="this.outerHTML=\'<span class=\\\'brand-name\\\'>SchoolBite</span>\'">' +
    '</a>' +
    '<nav class="nav-section">' + navHtml + '</nav>' +
    '<div class="sidebar-footer"><a href="../parent/index.html" class="nav-item logout">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
    '<span>Logout</span></a></div>';
}

// Inject sidebar on load
document.addEventListener('DOMContentLoaded', function() {
  var mount = document.getElementById('sidebarMount');
  if (mount) {
    var page = document.body.getAttribute('data-page') || 'dashboard';
    mount.innerHTML = buildSidebar(page);
  }
});
