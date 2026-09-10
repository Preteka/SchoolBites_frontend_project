function money(value) { return '\u20B9' + Number(value || 0).toLocaleString('en-IN'); }
function date(value) { return value ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '\u2014'; }

const subscriptionPlans = [
  {
    id: 'plan-weekly',
    name: 'Weekly Plan',
    price: 799,
    period: '/ month',
    billingPeriod: 'Monthly',
    badge: '',
    description: 'Ideal for trying out our fresh, dietitian-curated school meals with complete flexibility.',
    button: 'Choose Weekly',
    features: [
      { text: '5 Days of Fresh School Meals (Mon-Fri)', included: true },
      { text: 'Customized Dietary & Allergen Preferences', included: true },
      { text: 'Morning Hot Delivery to School Desk', included: true },
      { text: 'Pause or Cancel Anytime with 1 Click', included: true },
      { text: 'Eco-Friendly Stainless Steel Tiffin Kit', included: true },
      { text: 'Dedicated Nutritionist Consultation', included: false },
      { text: 'VIP Priority Delivery Window', included: false }
    ],
    compare: {
      mealDays: '5 Days of Fresh School Meals',
      dietary: 'Customized Preferences',
      delivery: 'Morning Hot Delivery',
      tiffin: 'Eco-Friendly Stainless Steel Tiffin',
      nutritionist: 'Not Included (×)',
      flexibility: 'Pause or Cancel Anytime',
      support: 'Standard Parent Support'
    }
  },
  {
    id: 'plan-monthly',
    name: 'Monthly Plan',
    price: 2999,
    period: '/ month',
    billingPeriod: 'Monthly',
    badge: 'Most Popular',
    description: 'Our most loved plan for uninterrupted, wholesome daily school nutrition with maximum consistency.',
    button: 'Choose Monthly',
    features: [
      { text: '20 Days of Balanced, Delicious Lunches', included: true },
      { text: 'Priority Allergy & Dietary Management', included: true },
      { text: 'Free Insulated Thermos Lunch Bag', included: true },
      { text: 'Live Delivery Tracking & Notifications', included: true },
      { text: '10% Savings vs Weekly Subscription', included: true },
      { text: 'Unlimited Menu Dish Swapping', included: true },
      { text: 'Quarterly Child Nutrition Report Card', included: true }
    ],
    compare: {
      mealDays: '20 Days of Balanced Lunches',
      dietary: 'Priority Allergy & Dietary Management',
      delivery: 'Live Delivery Tracking & Notifications',
      tiffin: 'Free Insulated Thermos Lunch Bag',
      nutritionist: 'Quarterly Child Nutrition Report Card',
      flexibility: 'Unlimited Menu Swapping (10% Savings)',
      support: 'Priority Parent Support'
    }
  },
  {
    id: 'plan-term',
    name: 'Term Plan',
    price: 7999,
    period: '/ month',
    billingPeriod: 'Monthly',
    badge: 'Best Value',
    description: 'Full school term coverage with maximum 20% savings and premium personalized perks.',
    button: 'Choose Term Plan',
    features: [
      { text: 'Complete 60-Day School Term Coverage', included: true },
      { text: 'Dedicated 1-on-1 Nutritionist Consultation', included: true },
      { text: 'Custom Weekend Meal Swap Options', included: true },
      { text: 'VIP Parent Portal Priority Support', included: true },
      { text: 'Premium RFID-Tracked Sanitized Tiffin Kit', included: true },
      { text: 'Maximum 20% Savings Guaranteed', included: true },
      { text: 'Zero Re-enrollment Hassle All Term', included: true }
    ],
    compare: {
      mealDays: 'Complete 60-Day School Term Coverage',
      dietary: 'Priority Allergy & Dietary Management',
      delivery: 'Live Delivery Tracking & Priority Window',
      tiffin: 'Premium RFID-Tracked Sanitized Tiffin Kit',
      nutritionist: 'Dedicated 1-on-1 Nutritionist Consultation',
      flexibility: 'Custom Weekend Swaps (20% Savings)',
      support: 'VIP Parent Portal Priority Support'
    }
  }
];

const dashboardPlans = subscriptionPlans;
const subscriptionPagePlans = subscriptionPlans;

function dashboardPlan(id) {
  return subscriptionPlans.find(plan => plan.id === id || plan.name.toLowerCase().includes(String(id || '').toLowerCase())) || subscriptionPlans[1];
}

function dashboardRootPath() {
  return window.location.pathname.includes('/plans/') || window.location.pathname.includes('/plan-purchase/') ? '../' : '';
}

function chooseSubscriptionPlan(id) {
  const plan = dashboardPlan(id);
  localStorage.setItem('schoolbite_dashboard_selected_plan', JSON.stringify(plan));
  localStorage.setItem('schoolbite_pending_plan', plan.id);
  localStorage.setItem('schoolbite_pending_cycle', 'MONTHLY');
  window.location.href = `${dashboardRootPath()}subscription-details.html?plan=${encodeURIComponent(plan.id)}`;
}

function chooseDashboardPlan(id) {
  chooseSubscriptionPlan(id);
}

function dashboardPlanCard(plan, actionLabel = 'Choose Plan') {
  return `<article class="subscription-plan-card ${plan.badge ? 'is-popular' : ''}">${plan.badge ? `<span class="subscription-plan-badge">${plan.badge}</span>` : ''}<div class="subscription-plan-icon">${icons.card}</div><h3>${plan.name}</h3><p>${plan.description}</p><strong>${money(plan.price)} <small>${plan.period}</small></strong><ul>${plan.features.map(feature => `<li class="${feature.included ? 'included' : 'disabled'}"><span>${feature.included ? '✓' : '×'}</span>${feature.text}</li>`).join('')}</ul><button class="btn" type="button" onclick="chooseSubscriptionPlan('${plan.id}')">${plan.button || actionLabel} <b>→</b></button><small class="subscription-plan-note">Pause or cancel anytime</small></article>`;
}

function subscriptionPlanCard(plan) {
  return dashboardPlanCard(plan);
}

function keepDashboardPlanLinksInternal() {
  document.querySelectorAll('a[href="../pricing.html"], a[href="pricing.html"]').forEach(link => {
    link.href = `${dashboardRootPath()}plans/plans.html`;
    link.textContent = 'View Plans →';
  });
}


pageInfo.delivery = ['Delivery Status', "Track your child's meal delivery in real-time."];
pageInfo.notifications = ['Notifications', "Stay updated with your child's meals, orders and important updates."];

const schoolbiteDashboardShell = () => {
  if (!SBStore.loggedIn()) {
    window.location.href = `${dashboardRootPath()}../index.html`;
    return false;
  }
  const page = document.body.dataset.page || 'dashboard';
  const [title, description] = pageInfo[page] || pageInfo.plans;
  const name = SBStore.name() || 'Preteka';
  const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'P';
  const notifs = JSON.parse(localStorage.getItem('schoolbite_custom_notifications') || 'null');
  const unreadCount = notifs ? notifs.filter(item => !item.read).length : 2;
  const navItems = [['dashboard', 'grid', 'Dashboard'], ['children', 'user', 'My Children'], ['menu', 'calendar', 'Weekly Menu'], ['subscriptions', 'card', 'Subscriptions'], ['payments', 'card', 'Orders & Payments'], ['delivery', 'truck', 'Delivery Status'], ['notifications', 'bell', 'Notifications'], ['settings', 'settings', 'Settings']];

  document.getElementById('app').innerHTML = `<aside class="sidebar" id="sidebar">
    <a class="brand" href="dashboard.html" aria-label="SchoolBite dashboard"><div class="brand-mark" role="img" aria-label="SchoolBite logo"></div></a>
    <nav class="nav" aria-label="Parent dashboard navigation">${navItems.map(item => `<a class="${page === item[0] || ((page === 'plans' || page === 'plan-purchase') && item[0] === 'subscriptions') ? 'active' : ''}" href="${dashboardRootPath()}${item[0]}.html">${icons[item[1]]}<span>${item[2]}</span></a>`).join('')}</nav>
    <div class="sidebar-bottom-decor">
      <svg class="sidebar-decor-leaves" viewBox="0 0 80 90" fill="none">
        <path d="M55 12 C68 24 68 48 48 56 C36 52 32 36 40 24 C44 16 50 13 55 12Z" fill="#75be8c" opacity="0.85"/>
        <path d="M20 48 C8 60 10 80 28 86 C38 80 40 66 34 56 C29 50 24 48 20 48Z" fill="#58ad74" opacity="0.85"/>
        <path d="M40 32 C28 44 28 64 44 72 C54 68 56 54 50 44 C45 37 42 34 40 32Z" fill="#3d8f58" opacity="0.85"/>
      </svg>
      <div class="sidebar-decor-text">Good Food<br>Brighter Futures <span class="sidebar-decor-smile">☺</span></div>
    </div>
    <button class="logout" data-action="logout">${icons.logout}<span>Logout</span></button>
  </aside>
  <main class="main"><header class="topbar">
    <button class="mobile-menu" data-action="menu" aria-label="Open menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <div class="heading"><h1>${title}</h1><p>${description}</p></div>
    <div class="top-actions"><div class="search-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input class="search" placeholder="Search meals, orders..." aria-label="Search dashboard"></div>
      <button class="icon-btn" data-action="notifications" aria-label="Notifications">${icons.bell}${unreadCount > 0 ? `<i class="dot count-badge">${unreadCount}</i>` : ''}</button>
      <div class="profile" data-action="profile" tabindex="0"><div class="avatar">${esc(initials)}</div><div class="profile-copy"><strong>${esc(name)}</strong><span>Parent</span></div><span aria-hidden="true">⌄</span><div class="profile-menu" id="profile-menu"><a href="settings.html">Profile</a><a href="settings.html">Settings</a><button data-action="logout">Logout</button></div></div>
    </div>
  </header><section class="cont"><div id="page-content"></div></section></main>
  <div class="modal-backdrop" id="modal"></div><div class="toast" id="toast" role="status"></div>`;

  document.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'logout') SBStore.logout();
    if (action === 'menu') document.getElementById('sidebar').classList.toggle('open');
    if (action === 'notifications') window.location.href = `${dashboardRootPath()}notifications.html`;
    if (action === 'profile') document.getElementById('profile-menu').classList.toggle('open');
    if (!event.target.closest('.profile')) document.getElementById('profile-menu')?.classList.remove('open');
    if (event.target.closest('.nav a')) document.getElementById('sidebar').classList.remove('open');
  });
  document.querySelector('.search')?.addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    document.querySelectorAll('.panel, .stat').forEach(card => card.classList.toggle('search-match', !query || card.textContent.toLowerCase().includes(query)));
  });
  return true;
};

function deliveryPage() {
  const data = SBStore.get();
  const sub = data.subscriptions.find(item => item.status === 'Active');
  const child = sub && data.children.find(item => item.id === sub.childId);

  // SVG helper definitions
  const iconBase = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
  const checkSvg = `${iconBase}<polyline points="20 6 9 17 4 12"/></svg>`;
  const truckSvg = `${iconBase}<path d="M3 6h11v11H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>`;
  const schoolSvg = `${iconBase}<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const clockSvg = `${iconBase}<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  const phoneSvg = `${iconBase}<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  const calSvg = `${iconBase}<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  const leafSvg = `${iconBase}<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
  const shieldSvg = `${iconBase}<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`;
  const heartSvg = `${iconBase}<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const usersSvg = `${iconBase}<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
  const pinSvg = `${iconBase}<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

  // Timeline steps
  const timelineSteps = [
    { state: 'done', icon: checkSvg, label: 'Meal Prepared', time: '8:00 AM', desc: "Your child's meal has been prepared with care." },
    { state: 'done', icon: checkSvg, label: 'Out for Delivery', time: '9:15 AM', desc: "Your child's meal is on the way." },
    { state: 'active', icon: truckSvg, label: 'Near School', time: '9:35 AM', desc: "Our delivery partner is near your child's school." },
    { state: 'pending', icon: schoolSvg, label: 'Delivered', time: 'Estimated by 9:45 AM', desc: 'Your child will receive the meal soon.' }
  ];

  const timelineHtml = timelineSteps.map((step, idx) => `
    <div class="delivery-step ${step.state}">
      ${idx < timelineSteps.length - 1 ? `<div class="delivery-step-line ${step.state === 'done' ? 'is-done' : ''}"></div>` : ''}
      <div class="delivery-step-dot">${step.icon}</div>
      <div class="delivery-step-content">
        <div class="step-title-row">
          <strong>${step.label}</strong>
          <span class="step-time">${step.time}</span>
        </div>
        <p>${step.desc}</p>
      </div>
    </div>`).join('');

  // Map SVG
  const mapSvg = `<svg class="delivery-map-svg" viewBox="0 0 540 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Map Canvas Background -->
    <rect width="540" height="280" fill="#edf5ef"/>
    
    <!-- Suburban Street Networks -->
    <path d="M0 60 L540 60" stroke="#ffffff" stroke-width="14"/>
    <path d="M0 160 L540 160" stroke="#ffffff" stroke-width="16"/>
    <path d="M0 240 L540 240" stroke="#ffffff" stroke-width="12"/>
    <path d="M120 0 L120 280" stroke="#ffffff" stroke-width="14"/>
    <path d="M260 0 L260 280" stroke="#ffffff" stroke-width="18"/>
    <path d="M410 0 L410 280" stroke="#ffffff" stroke-width="14"/>
    
    <!-- Diagonal streets -->
    <path d="M60 280 L280 40" stroke="#ffffff" stroke-width="12"/>
    <path d="M240 280 L480 40" stroke="#ffffff" stroke-width="12"/>
    <path d="M30 0 L220 280" stroke="#ffffff" stroke-width="10"/>

    <!-- Green park patches -->
    <path d="M140 80 Q190 70 200 120 Q180 150 135 140 Z" fill="#d9eedc" opacity="0.85"/>
    <path d="M300 180 Q380 170 390 220 Q340 250 290 230 Z" fill="#d9eedc" opacity="0.85"/>
    <path d="M430 70 Q490 60 510 110 Q470 140 425 120 Z" fill="#d9eedc" opacity="0.85"/>
    <path d="M20 180 Q80 170 90 210 Q50 240 15 220 Z" fill="#d9eedc" opacity="0.85"/>

    <!-- Small tree dots on parks -->
    <circle cx="160" cy="105" r="7" fill="#88cb92"/>
    <circle cx="180" cy="125" r="6" fill="#6db878"/>
    <circle cx="340" cy="205" r="8" fill="#88cb92"/>
    <circle cx="365" cy="215" r="6" fill="#6db878"/>
    <circle cx="470" cy="95" r="7" fill="#88cb92"/>

    <!-- Active Navigation Route (Green) -->
    <path d="M 120 210 L 220 210 Q 260 210 260 170 L 260 110 Q 260 60 330 60 L 410 60"
      fill="none" stroke="#15966e" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Start Origin Marker (Home) -->
    <g transform="translate(120, 210)">
      <circle cx="0" cy="0" r="16" fill="#075b46" stroke="#ffffff" stroke-width="2.5" filter="drop-shadow(0 2px 5px rgba(7,91,70,0.3))"/>
      <path d="M-5 2 L0 -4 L5 2 L5 6 L-5 6 Z" fill="#ffffff"/>
    </g>

    <!-- Moving Delivery Van Marker on Route -->
    <g transform="translate(260, 140)">
      <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#15966e" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 2px 6px rgba(7,91,70,0.35))"/>
      <g transform="translate(-8, -8) scale(0.65)">
        <path d="M3 6h11v11H3z" fill="#ffffff"/>
        <path d="M14 10h4l3 3v4h-7z" fill="#ffffff"/>
        <circle cx="7" cy="19" r="2" fill="#15966e"/>
        <circle cx="18" cy="19" r="2" fill="#15966e"/>
      </g>
    </g>

    <!-- Destination Marker (School) -->
    <g transform="translate(410, 60)">
      <circle cx="0" cy="0" r="16" fill="#075b46" stroke="#ffffff" stroke-width="2.5" filter="drop-shadow(0 2px 5px rgba(7,91,70,0.3))"/>
      <path d="M-6 3 L0 -4 L6 3 L4 3 L4 5 L-4 5 L-4 3 Z M-2 0 L2 0 L2 2 L-2 2 Z" fill="#ffffff"/>
    </g>
  </svg>`;

  // Upcoming meals
  const upcomingMeals = [
    { label: 'Wed, 10 Sept', name: 'Vegetable Pulao', sub: 'Lunch', img: '../assets/images/meal_wednesday_rice.jpg', active: true },
    { label: 'Thu, 11 Sept', name: 'Chapati & Curry', sub: 'Lunch', img: '../assets/images/meal_thursday_chapati.jpg', active: false },
    { label: 'Fri, 12 Sept', name: 'Lemon Rice', sub: 'Lunch', img: '../assets/images/meal_tuesday_dosa.jpg', active: false },
    { label: 'Mon, 15 Sept', name: 'Idli Sambar', sub: 'Lunch', img: '../assets/images/meal_monday_idli.jpg', active: false }
  ];

  const upcomingHtml = upcomingMeals.map(meal => `
    <article class="upcoming-card ${meal.active ? 'is-active' : ''}">
      <div class="upcoming-card-top">
        <span>${meal.label}</span>
        <div class="upcoming-cal-icon">${calSvg}</div>
      </div>
      <div class="upcoming-card-body">
        <img class="upcoming-card-img" src="${meal.img}" alt="${esc(meal.name)}">
        <div class="upcoming-card-info">
          <strong>${esc(meal.name)}</strong>
          <span>${meal.sub}</span>
        </div>
      </div>
    </article>`).join('');

  // Why Choose cards
  const whyCards = [
    { icon: shieldSvg, type: 'green', title: 'Safe & Hygienic', desc: 'Prepared and delivered with the highest safety standards.' },
    { icon: leafSvg, type: 'green', title: 'Fresh Ingredients', desc: 'Delivering fresh, nutritious meals every day.' },
    { icon: heartSvg, type: 'red', title: 'On-Time Delivery', desc: "We ensure your child's meals arrive on schedule." },
    { icon: usersSvg, type: 'green', title: 'Healthy Children', desc: 'Good food supports a brighter future.' }
  ];

  const whyHtml = whyCards.map(item => `
    <article class="why-card">
      <div class="why-icon ${item.type}">${item.icon}</div>
      <div class="why-body">
        <strong>${item.title}</strong>
        <p>${item.desc}</p>
      </div>
    </article>`).join('');

  document.getElementById('page-content').innerHTML = `
    <!-- Hero Banner -->
    <section class="delivery-hero reveal">
      <div class="delivery-hero-leaf delivery-hero-leaf-left">
        <svg viewBox="0 0 80 120" fill="none">
          <path d="M10 20 C2 45 15 85 45 95 C55 65 45 35 25 22 C18 18 12 18 10 20Z" fill="#58ad74" opacity="0.85"/>
          <path d="M35 10 C30 35 48 70 75 75 C80 50 68 25 50 15 C42 10 38 9 35 10Z" fill="#75be8c" opacity="0.8"/>
        </svg>
      </div>
      <div class="delivery-hero-copy">
        <h2>Fresh Meals<br>On Their Way!</h2>
        <p>Healthy, tasty and safe meals delivered to your child, right on time.</p>
      </div>
      <div class="delivery-hero-van-wrap">
        <svg class="delivery-hero-van-svg" viewBox="0 0 520 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 148 Q260 146 520 148" stroke="#8fa99b" stroke-width="4" stroke-linecap="round"/>
          <line x1="10" y1="148" x2="510" y2="148" stroke="#ffffff" stroke-width="2" stroke-dasharray="16 12"/>
          <ellipse cx="380" cy="115" rx="30" ry="25" fill="#88cb92" opacity="0.6"/>
          <ellipse cx="440" cy="110" rx="35" ry="30" fill="#78bf83" opacity="0.5"/>
          <ellipse cx="490" cy="120" rx="25" ry="22" fill="#9bd6a4" opacity="0.6"/>
          <ellipse cx="260" cy="146" rx="140" ry="8" fill="rgba(7,91,70,0.18)"/>
          <path d="M140 70 C140 58 150 50 162 50 L310 50 C322 50 332 55 338 65 L360 98 C364 104 366 110 366 118 L366 134 C366 138 362 142 358 142 L340 142 C340 128 326 116 310 116 C294 116 280 128 280 142 L200 142 C200 128 186 116 170 116 C154 116 140 128 140 142 L132 142 C126 142 122 138 122 132 L122 88 C122 78 130 70 140 70 Z" fill="#ffffff" stroke="#e0ece5" stroke-width="1.5"/>
          <path d="M312 60 L334 60 C340 60 346 64 350 70 L360 90 L312 90 Z" fill="#437763" opacity="0.85"/>
          <rect x="274" y="60" width="32" height="30" rx="4" fill="#437763" opacity="0.85"/>
          <path d="M122 108 L366 108 L366 122 L122 122 Z" fill="#15966e" opacity="0.12"/>
          <rect x="122" y="120" width="244" height="4" fill="#075b46"/>
          <g transform="translate(195, 68) scale(0.65)">
            <ellipse cx="25" cy="18" rx="8" ry="12" fill="#075b46" transform="rotate(-20 25 18)"/>
            <ellipse cx="38" cy="15" rx="7" ry="10" fill="#f4a340" transform="rotate(25 38 15)"/>
            <text x="50" y="24" font-family="'Sora', sans-serif" font-weight="800" font-size="22" fill="#075b46">School<tspan fill="#f4a340">Bite</tspan></text>
          </g>
          <path d="M366 106 C369 106 372 108 372 112 C372 116 369 118 366 118 Z" fill="#ffe082"/>
          <rect x="362" y="124" width="8" height="12" rx="2" fill="#435e54"/>
          <g transform="translate(170, 140)"><circle cx="0" cy="0" r="18" fill="#1c2b26"/><circle cx="0" cy="0" r="11" fill="#e8f3e8"/><circle cx="0" cy="0" r="5" fill="#1c2b26"/></g>
          <g transform="translate(310, 140)"><circle cx="0" cy="0" r="18" fill="#1c2b26"/><circle cx="0" cy="0" r="11" fill="#e8f3e8"/><circle cx="0" cy="0" r="5" fill="#1c2b26"/></g>
        </svg>
      </div>
      <div class="delivery-hero-script">Good Food<br>Happier Kids <span class="heart-outline">♡</span></div>
      <div class="delivery-hero-leaf delivery-hero-leaf-right">
        <svg viewBox="0 0 80 120" fill="none">
          <path d="M60 25 C75 45 70 85 40 98 C30 70 40 40 60 25Z" fill="#58ad74" opacity="0.85"/>
          <path d="M25 10 C32 35 15 70 -5 80 C-8 55 5 30 25 10Z" fill="#75be8c" opacity="0.8"/>
        </svg>
      </div>
    </section>

    <!-- Today's Delivery Row -->
    <div class="delivery-section-row">
      <h2 class="delivery-section-title">
        <span class="delivery-pin-badge">${pinSvg}</span>
        Today's Delivery
      </h2>
      <span class="delivery-date-label">Tue, 9 Sept 2026</span>
    </div>

    <!-- Main 3-Column Tracking Container -->
    <section class="delivery-track-container reveal">
      <!-- Left: Stepper Timeline -->
      <div class="delivery-timeline-panel">
        <div class="delivery-timeline">${timelineHtml}</div>
      </div>

      <!-- Center: Live Map -->
      <div class="delivery-map-panel">
        <div class="delivery-map-inner">
          ${mapSvg}
          <div class="delivery-map-school-label">
            <strong>Oakridge</strong>
            <span>International School</span>
          </div>
          <div class="delivery-map-badge">
            <span>5 mins away</span>
          </div>
        </div>
      </div>

      <!-- Right: Info Panel (ETA, Driver, Van) -->
      <div class="delivery-side-panel">
        <!-- ETA Card -->
        <article class="delivery-eta-card">
          <div class="delivery-eta-icon">${clockSvg}</div>
          <div class="delivery-eta-info">
            <span class="delivery-eta-label">Estimated Arrival</span>
            <div class="delivery-eta-mins">5 mins</div>
            <span class="delivery-eta-by">By 9:45 AM</span>
          </div>
        </article>

        <!-- Driver Card -->
        <article class="delivery-driver-card">
          <img class="delivery-driver-avatar" src="../assets/images/team_alex_morgan.jpg" alt="Ramesh Kumar">
          <div class="delivery-driver-info">
            <strong>Ramesh Kumar</strong>
            <span>Delivery Partner</span>
          </div>
          <button class="delivery-call-btn" type="button" aria-label="Call delivery partner" onclick="toast('Calling Ramesh Kumar (+91 98765 43210)...')">
            ${phoneSvg}
          </button>
        </article>

        <!-- Vehicle Card -->
        <article class="delivery-vehicle-card">
          <div class="delivery-vehicle-icon">${truckSvg}</div>
          <div class="delivery-vehicle-info">
            <strong>DL 01 AB 1234</strong>
            <span>SchoolBite Delivery Van</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Upcoming Deliveries Section -->
    <section class="upcoming-section reveal">
      <div class="upcoming-header">
        <h3><span class="upcoming-header-icon">${calSvg}</span> Upcoming Deliveries</h3>
        <a class="btn outline upcoming-view-all" href="menu.html">View All Deliveries <b>→</b></a>
      </div>
      <div class="upcoming-grid">${upcomingHtml}</div>
    </section>

    <!-- Why Choose SchoolBite -->
    <section class="why-section reveal">
      <h3><span class="why-header-icon">${leafSvg}</span> Why Choose SchoolBite?</h3>
      <div class="why-grid">${whyHtml}</div>
    </section>`;
}



function dashboardPage() {
  const data = SBStore.get();
  const child = data.children[0];
  const subscription = data.subscriptions.find(item => item.status === 'Active');
  const spending = data.payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const currentMeal = meals[now.getDay() === 0 ? 0 : Math.min(now.getDay() - 1, meals.length - 1)];
  const weekly = meals.map((meal, index) => `<div class="week-meal"><img src="${meal.image}" alt=""><div><b>${meal.day.slice(0, 3)}</b><span>${meal.name.split(' & ')[0]}</span><small>${meal.calories} kcal</small></div></div>`).join('');
  const childContent = data.children.length ? data.children.slice(0, 2).map(childRow).join('') : `<div class="empty"><div class="empty-icon">${icons.user}</div><strong>No children added yet</strong><span>Add your child's details to get started with nutritious school meals.</span><a class="btn" href="children.html">Add Child <b>→</b></a></div>`;
  const mealContent = subscription ? `<div class="meal-card"><img src="${currentMeal.image}" alt="${currentMeal.name}"><div><small class="eyebrow">${child ? esc(child.name) : 'Your child'} · Today</small><h4>${currentMeal.name}</h4><p>${currentMeal.calories} kcal <b>·</b> Protein 14g <b>·</b> Carbs 58g</p><div class="tags">${tags(currentMeal.tags)}</div><a class="btn" href="menu.html">View Meal <b>→</b></a></div></div>` : `<div class="empty"><div class="empty-icon">${icons.calendar}</div><strong>No meal planned yet</strong><span>Add a child and choose a meal plan to see today's menu.</span><a class="btn" href="plans/plans.html">View Plans <b>→</b></a></div>`;
  const subscriptionContent = subscription ? `<div class="plan-summary"><div class="plan-badge">${icons.card}</div><div><small class="eyebrow">Current plan</small><h4>${esc(subscription.plan)}</h4><p>${money(subscription.price)} <span>/ ${esc(subscription.cycle || 'month')}</span></p></div><span class="status">Active</span></div><div class="detail-line"><span>Next billing date</span><b>${date(subscription.startDate)}</b></div><a class="btn outline" href="subscriptions.html">Manage Plan <b>→</b></a>` : `<div class="empty"><div class="empty-icon">${icons.card}</div><strong>No active subscription</strong><span>Choose a meal plan to get started.</span><a class="btn" href="plans/plans.html">View Plans <b>→</b></a></div>`;
  const paymentContent = data.payments.length ? data.payments.slice(0, 2).map(payment => `<div class="payment-row"><div class="payment-icon">${icons.card}</div><div><strong>${esc(payment.plan)}</strong><small>${date(payment.date)} · ${esc(payment.id)}</small></div><b>${money(payment.amount)}</b><span class="status">${esc(payment.status)}</span></div>`).join('') : `<div class="empty compact"><div class="empty-icon">${icons.card}</div><strong>No payments yet</strong><span>Your payment history will appear here once you make a purchase.</span></div>`;
  const deliveryContent = subscription ? `<div class="delivery-head"><div class="delivery-icon">${icons.truck}</div><div><small class="eyebrow">Next school day</small><h4>On schedule</h4><p>Estimated arrival 12:15 - 12:45 PM</p></div></div><div class="progress-track"><span></span></div><div class="progress-labels"><span>Prepared</span><span>Packed</span><span>On the way</span></div><a class="btn outline" href="delivery.html">Track Delivery <b>→</b></a>` : `<div class="empty"><div class="empty-icon">${icons.truck}</div><strong>No active delivery</strong><span>Delivery details will be available after your subscription is active.</span><a class="btn outline" href="delivery.html">Delivery Status <b>→</b></a></div>`;
  document.getElementById('page-content').innerHTML = `<section class="welcome reveal"><img class="hero-photo" src="../assets/images/hero_school_girl.jpg" alt="SchoolBite child enjoying lunch"><div class="schoolbite-decorative-text scribble"><span class="line-primary">Healthy kids,</span><span class="line-secondary">happier tomorrows</span></div><h2>${greeting}, <span>${esc(SBStore.name())}!</span></h2><p>Here's what's happening with your children's meals today.</p></section>
  <div class="summary-grid">${stat('user', 'Active Children', data.children.length)}${stat('card', 'Active Subscription', subscription ? '1' : '0')}${stat('truck', 'Next Delivery', subscription ? 'Tomorrow' : '—')}${stat('card', 'Monthly Spending', spending ? money(spending) : '₹0')}</div>
  <div class="dashboard-grid"><article class="panel wide reveal"><div class="panel-title"><h3>Today's Meal</h3><span class="muted">${now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>${mealContent}</article>
  <article class="panel reveal"><div class="panel-title"><h3>My Children</h3><a href="children.html">View all <b>→</b></a></div>${childContent}</article>
  <article class="panel reveal"><div class="panel-title"><h3>Weekly Menu Preview</h3><a href="menu.html">View menu <b>→</b></a></div><div class="weekly-list">${weekly}</div><a class="btn outline full-btn" href="menu.html">View Weekly Menu <b>→</b></a></article>
  <article class="panel reveal"><div class="panel-title"><h3>Subscription</h3><a href="subscriptions.html">Manage</a></div>${subscriptionContent}</article>
  <article class="panel reveal"><div class="panel-title"><h3>Recent Payments</h3><a href="payments.html">View all <b>→</b></a></div><div class="payment-list">${paymentContent}</div></article>
  <article class="panel reveal"><div class="panel-title"><h3>Delivery Status</h3><a href="delivery.html">Details</a></div>${deliveryContent}</article>
  <article class="panel nutrition-panel reveal"><div class="panel-title"><h3>Nutrition Report</h3><span class="muted">This week</span></div><div class="nutrition-layout"><div><div class="nutrition-score"><strong>78%</strong><span>balanced</span></div><p class="nutrition-note">Great progress! Your child's meals are staying nicely balanced this week.</p></div><div><div class="chart-bars"><i class="chart-bar" style="--bar:72%"></i><i class="chart-bar" style="--bar:58%"></i><i class="chart-bar" style="--bar:84%"></i><i class="chart-bar" style="--bar:66%"></i><i class="chart-bar" style="--bar:91%"></i></div><div class="chart-labels"><span>Calories</span><span>Protein</span><span>Veggies</span><span>Balance</span><span>Goal</span></div></div></div></article></div>`;
}

function childrenPage() {
  const data = SBStore.get();
  const children = data.children || [];
  const childCards = children.map((child, index) => `<article class="profile-card page-card reveal">
    <div class="profile-card-top"><img src="../assets/images/${index % 2 ? 'hero_school_girl.jpg' : 'cta_child_thumbsup.jpg'}" alt="${esc(child.name)}"><span class="primary-badge">${index === 0 ? 'Primary' : 'Child'}</span><button class="more-btn" onclick="showChildForm('${child.id}')" aria-label="Edit ${esc(child.name)}">⋮</button></div>
    <div class="profile-card-body"><h3>${esc(child.name)}</h3><p class="profile-meta">${icons.grid}<span>${esc(child.school || 'School not set')}</span></p><p class="profile-meta">${icons.calendar}<span>${esc(child.className || 'Class not set')}</span></p><p class="profile-meta ${child.diet === 'Non-vegetarian' ? 'orange-text' : ''}">${icons.user}<span>${esc(child.diet || 'Vegetarian')}</span></p><p class="profile-meta">${icons.settings}<span>${child.allergies ? `Allergic to ${esc(child.allergies)}` : 'No Allergies'}</span></p><p class="profile-likes">♥ <span>Likes nutritious meals</span></p></div>
    <div class="profile-card-actions"><button class="btn outline" onclick="showChildForm('${child.id}')">View Profile</button><button class="btn soft" onclick="showChildForm('${child.id}')">Edit</button></div>
  </article>`).join('');
  document.getElementById('page-content').innerHTML = `<section class="page-banner children-banner reveal"><div><h2>Happy, Healthy Children<br><span>Brighter Tomorrows!</span></h2><p>Add and manage your children's profiles to give them the best nutrition.</p></div><div class="schoolbite-decorative-text banner-script"><span class="line-primary">Growing healthy,</span><span class="line-secondary">growing happy</span></div><img src="../assets/images/usecase_children.jpg" alt="Children enjoying a healthy school meal"></section>
  <div class="page-section-heading"><div><h2>${icons.user} Your Children <span>(${children.length})</span></h2></div><button class="btn" onclick="showChildForm()">＋ Add Child</button></div>
  <section class="children-card-grid">${childCards || `<div class="panel empty page-empty"><div class="empty-icon">${icons.user}</div><strong>No children added yet</strong><span>Add your first child to personalize menus and delivery.</span><button class="btn" onclick="showChildForm()">＋ Add Child</button></div>`}</section>
  <section class="add-child-strip page-card reveal"><div class="strip-image"><img src="../assets/images/meal_monday_idli.jpg" alt="Nutritious SchoolBite meal"></div><div><h3>Add another child</h3><p>Providing nutritious meals for all your children is just a click away.</p></div><button class="btn" onclick="showChildForm()">＋ Add Child</button></section>
  <section class="tips-section"><div class="page-section-heading compact-heading"><h2>${icons.settings} Helpful Tips</h2></div><div class="tips-grid"><article class="tip-card"><div class="tip-icon orange-bg">${icons.card}</div><div><strong>Balanced Nutrition</strong><p>Our meals are designed by nutrition experts.</p></div></article><article class="tip-card"><div class="tip-icon">${icons.settings}</div><div><strong>Custom Preferences</strong><p>Set dietary preferences for each child.</p></div></article><article class="tip-card"><div class="tip-icon">${icons.user}</div><div><strong>Healthy Growth</strong><p>Good food supports a brighter future.</p></div></article></div></section>
  <div class="quote-banner page-card reveal">“ Healthy children learn better, grow stronger and<br> go further in life. ”</div>`;
}

function subscriptionsPage() {
  const data = SBStore.get();
  const active = data.subscriptions.find(item => item.status === 'Active');
  const child = active && data.children.find(item => item.id === active.childId);
  const activePlan = active && (subscriptionPagePlans.find(plan => plan.name === active.plan) || subscriptionPagePlans.find(plan => plan.price === Number(active.price)) || subscriptionPagePlans[0]);
  const planCards = subscriptionPagePlans.map(subscriptionPlanCard).join('');
  document.getElementById('page-content').innerHTML = `<section class="page-banner subscription-banner reveal"><div><h2>Nourishing Today<br><span>for a Brighter Tomorrow</span></h2><p>Flexible meal plans designed for your child's health, happiness and growth.</p></div><div class="banner-script">Good Food<br>Brighter Futures</div><img src="../assets/images/meal_monday_idli.jpg" alt="Nutritious SchoolBite lunch box"></section>
  <div class="page-section-heading"><h2>${icons.card} Current Subscription</h2><a class="btn outline" href="${dashboardRootPath()}plans/plans.html">View All Plans →</a></div>
  ${active ? `<section class="current-subscription page-card reveal"><div class="current-sub-head"><div class="plan-icon crown">${icons.card}</div><div><h3>${esc(activePlan.name)}</h3><p>${esc(activePlan.description)}</p></div><span class="status">Active</span><a class="btn outline" href="subscriptions.html">Manage Plan <b>→</b></a></div><div class="subscription-details"><div><small>Child</small><strong>${child ? esc(child.name) : 'Not selected'}</strong></div><div><small>Price</small><strong>${money(activePlan.price)} ${activePlan.period}</strong></div><div><small>Start Date</small><strong>${date(active.startDate)}</strong></div><div><small>Next Billing</small><strong>${date(active.startDate)}</strong></div></div><div class="benefits-row"><span>${icons.calendar} ${esc(activePlan.features[0].text)}</span><span>${icons.settings} ${esc(activePlan.features[1].text)}</span><span>${icons.user} ${esc(activePlan.features[2].text)}</span><span>${icons.card} Pause or Cancel<br><small>Anytime</small></span></div><div class="subscription-actions"><button class="btn outline" onclick="pauseSub('${active.id}')">${active.status === 'Paused' ? 'Resume Plan' : 'Pause Plan'}</button><button class="text-btn" onclick="cancelSub('${active.id}')">Cancel Subscription</button></div></section>` : `<section class="current-subscription page-card empty page-empty reveal"><div class="empty-icon">${icons.card}</div><strong>No active subscription</strong><span>Choose a plan to start receiving nutritious meals.</span></section>`}
  <div class="page-section-heading plans-heading"><h2>${icons.user} Other Plans</h2><a class="btn outline" href="${dashboardRootPath()}plans/plans.html#compare">Compare Plans</a></div><section class="available-plans">${planCards}</section><div class="quote-banner subscription-quote page-card reveal">Healthy Meals Today,<br><span>Brighter Futures Tomorrow</span></div>`;
}

function plansPage() {
  const comparisonRows = [
    ['Price', ...subscriptionPlans.map(plan => `${money(plan.price)} ${plan.period}`)],
    ['Billing Period', ...subscriptionPlans.map(plan => plan.billingPeriod || 'Monthly')],
    ['Meal Coverage', ...subscriptionPlans.map(plan => plan.compare.mealDays)],
    ['Dietary & Allergies', ...subscriptionPlans.map(plan => plan.compare.dietary)],
    ['Delivery & Tracking', ...subscriptionPlans.map(plan => plan.compare.delivery)],
    ['Tiffin & Packaging', ...subscriptionPlans.map(plan => plan.compare.tiffin)],
    ['Nutritionist Support', ...subscriptionPlans.map(plan => plan.compare.nutritionist)],
    ['Meal Swapping & Savings', ...subscriptionPlans.map(plan => plan.compare.flexibility)],
    ['Parent Support', ...subscriptionPlans.map(plan => plan.compare.support)]
  ];
  const comparison = comparisonRows.map(row => `<tr><th scope="row">${row[0]}</th>${row.slice(1).map(value => `<td>${value}</td>`).join('')}</tr>`).join('');
  document.getElementById('page-content').innerHTML = `<section class="plans-intro reveal"><div><span class="eyebrow">SchoolBite meal plans</span><h2>Choose Your Meal Plan</h2><p>Select the plan that works best for your child's healthy school meals.</p></div><a class="btn outline" href="${dashboardRootPath()}subscriptions.html">← Back to Subscriptions</a></section><section class="dashboard-plans-grid">${subscriptionPlans.map(plan => subscriptionPlanCard(plan)).join('')}</section><section class="dashboard-comparison page-card reveal" id="compare"><div class="plans-section-heading"><div><span class="eyebrow">Side-by-side details</span><h2>Compare Plans</h2></div><a class="btn outline" href="${dashboardRootPath()}subscriptions.html">Back to Subscriptions</a></div><div class="comparison-scroll"><table><thead><tr><th>Feature</th>${subscriptionPlans.map(plan => `<th>${plan.name}</th>`).join('')}</tr></thead><tbody>${comparison}</tbody></table></div></section>`;
}

function menuMealDetails(meal) {
  return {
    protein: meal.protein || 'Not provided',
    carbs: meal.carbs || 'Not provided',
    fat: meal.fat || 'Not provided',
    ingredients: meal.ingredients || 'Ingredient details are not available for this meal yet.',
    description: meal.description || 'A carefully prepared SchoolBite meal for your child’s school day.',
    dietary: meal.dietary || meal.tags?.join(', ') || 'See nutrition tags',
    allergens: meal.allergens || 'No allergen information provided.',
    benefits: meal.benefits || 'Nutrition details for this meal will appear here when available.'
  };
}

function showMealDetails(index) {
  const meal = meals[index % meals.length];
  const detail = menuMealDetails(meal);
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
  const dateLabel = ['9 Sept', '10 Sept', '11 Sept', '12 Sept', '13 Sept', '14 Sept', '15 Sept'][index];
  const modal = document.getElementById('modal');
  const selected = SBStore.get().selectedMeals.includes(meal.day);
  modal.innerHTML = `<article class="menu-detail-modal" role="dialog" aria-modal="true" aria-labelledby="meal-detail-title"><button class="menu-detail-close" type="button" onclick="closeMealDetails()" aria-label="Close meal details">×</button><img src="${meal.image}" alt="${esc(meal.name)}" class="menu-detail-image"><div class="menu-detail-content"><span class="eyebrow">${day} · ${dateLabel}</span><h2 id="meal-detail-title">${esc(meal.name)}</h2><p class="menu-detail-calories">${esc(meal.calories)} kcal</p><div class="menu-detail-stats"><span><b>Protein</b>${esc(detail.protein)}</span><span><b>Carbs</b>${esc(detail.carbs)}</span><span><b>Fat</b>${esc(detail.fat)}</span></div><div class="menu-detail-tags">${tags(meal.tags || [])}</div><label class="menu-detail-select"><input type="checkbox" ${selected ? 'checked' : ''} onchange="toggleMeal('${esc(meal.day)}', this.checked)"> Select this meal</label><div class="menu-detail-copy"><div><h3>Ingredients</h3><p>${esc(detail.ingredients)}</p></div><div><h3>Description</h3><p>${esc(detail.description)}</p></div><div><h3>Dietary information</h3><p>${esc(detail.dietary)}</p></div><div><h3>Allergens</h3><p>${esc(detail.allergens)}</p></div><div><h3>Benefits</h3><p>${esc(detail.benefits)}</p></div></div></div></article>`;
  modal.classList.add('open');
}

function closeMealDetails() {
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  modal.innerHTML = '';
}

function menuPage() {
  const data = SBStore.get();
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dateLabels = ['9 Sept', '10 Sept', '11 Sept', '12 Sept', '13 Sept', '14 Sept', '15 Sept'];
  const dayMeals = weekDays.map((day, index) => ({ ...meals[index % meals.length], day }));
  const cards = dayMeals.map((meal, index) => `<article class="weekly-menu-card ${index === 0 ? 'is-current' : ''} reveal"><div class="weekly-menu-card-head"><div><strong>${meal.day.slice(0, 3)}</strong><span>${dateLabels[index]}</span></div><span class="weekly-menu-day-icon">${icons.calendar}</span></div><img src="${meal.image}" alt="${esc(meal.name)}" class="weekly-menu-image"><h3>${esc(meal.name.split(' & ')[0])}</h3><p class="weekly-menu-calories">${esc(meal.calories)} kcal</p><div class="weekly-menu-tags">${tags(meal.tags || [])}</div><button class="btn weekly-menu-details" type="button" onclick="showMealDetails(${index})">View Details <b>→</b></button></article>`).join('');
  const infoCards = [['Balanced Nutrition', 'Our meals are designed by nutrition experts.', icons.card], ['Fresh Ingredients', 'We use fresh, high-quality ingredients every day.', icons.settings], ['Variety & Taste', 'A mix of traditional and modern favourites.', icons.user], ["Healthy Kids", "Supporting your child's growth and learning.", icons.user]];
  document.getElementById('page-content').innerHTML = `<section class="weekly-menu-hero reveal"><div><h2>Healthy Meals Today<br><span>Brighter Futures Tomorrow</span></h2><p>Carefully planned meals with the right balance of nutrition, taste and variety.</p></div><div class="weekly-menu-script">Nutritious Bites<br>Happier Kids <b>♡</b></div><img src="${dayMeals[3].image}" alt="Healthy SchoolBite meal" class="weekly-menu-hero-image"></section><div class="weekly-menu-controls"><div class="weekly-menu-date-controls"><button class="menu-control-button" type="button" aria-label="Previous week">←</button><div class="weekly-menu-date">${icons.calendar}<span>9 Sept 2026 – 15 Sept 2026</span></div><button class="menu-control-button" type="button" aria-label="Next week">→</button></div><label class="weekly-menu-child-select">${icons.user}<span>All Children</span><span>⌄</span><select aria-label="Select child"><option>All Children</option>${(data.children || []).map(child => `<option>${esc(child.name)}</option>`).join('')}</select></label></div><section class="weekly-menu-grid">${cards}</section><section class="weekly-menu-info-grid">${infoCards.map(card => `<article class="weekly-menu-info-card"><div>${card[2]}</div><section><h3>${card[0]}</h3><p>${card[1]}</p></section></article>`).join('')}</section>`;
}

function subscriptionDetailsPage() {
  const data = SBStore.get();
  const params = new URLSearchParams(window.location.search);
  const planQuery = params.get('plan') || localStorage.getItem('schoolbite_pending_plan') || '';
  let storedPlan = null;
  try { storedPlan = JSON.parse(localStorage.getItem('schoolbite_dashboard_selected_plan') || 'null'); } catch { storedPlan = null; }
  
  const plan = subscriptionPlans.find(p => p.id === planQuery || p.id === storedPlan?.id || p.name.toLowerCase().includes(String(planQuery).toLowerCase())) || subscriptionPlans[1];

  // Dynamic Date calculations
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleDateString('en-IN', { month: 'short' });
  const year = now.getFullYear();
  const formattedStartDate = `Today, ${day} ${month} ${year}`;

  const nextDate = new Date(now);
  if (plan.id === 'plan-term') {
    nextDate.setMonth(nextDate.getMonth() + 3);
  } else if (plan.id === 'plan-weekly') {
    nextDate.setDate(nextDate.getDate() + 7);
  } else {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }
  const nextDay = nextDate.getDate();
  const nextMonth = nextDate.toLocaleDateString('en-IN', { month: 'short' });
  const nextYear = nextDate.getFullYear();
  const formattedNextBillingDate = `${nextDay} ${nextMonth} ${nextYear}`;

  // Children handling
  const children = (data.children && data.children.length) ? data.children : [
    { id: 'child-default', name: 'Aarav Sharma', school: 'Oakridge International School', className: 'Grade 3' }
  ];
  const pendingChildId = localStorage.getItem('schoolbite_pending_child_id');
  const selectedChild = children.find(c => c.id === pendingChildId) || children[0];

  document.getElementById('page-content').innerHTML = `
    <!-- Top Back to Plans bar & Progress Stepper -->
    <div class="sub-details-top-bar reveal">
      <a class="sub-back-link" href="${dashboardRootPath()}subscriptions.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        Back to Plans
      </a>
      <div class="sub-steps-indicator">
        <div class="sub-step is-active">
          <span class="sub-step-num">1</span>
          <span class="sub-step-text">Plan Details</span>
        </div>
        <div class="sub-step-line"></div>
        <div class="sub-step">
          <span class="sub-step-num">2</span>
          <span class="sub-step-text">Payment</span>
        </div>
        <div class="sub-step-line"></div>
        <div class="sub-step">
          <span class="sub-step-num">3</span>
          <span class="sub-step-text">Confirmation</span>
        </div>
      </div>
    </div>

    <!-- Heading -->
    <div class="sub-details-heading reveal">
      <h1>Complete Your Subscription</h1>
      <p>You're one step closer to nutritious, happy school days.</p>
    </div>

    <!-- Main Two-Column Layout -->
    <div class="sub-details-layout reveal">
      <!-- Left Column: Selected Plan Card & Value Props -->
      <div class="sub-details-left">
        <article class="sub-plan-card">
          <!-- Hero Section with bento meal illustration -->
          <div class="sub-plan-hero">
            <div class="sub-plan-hero-copy">
              <span class="sub-plan-selected-badge">Selected Plan</span>
              <h2>${esc(plan.name)}</h2>
              <div class="sub-plan-price-row">
                <strong>${money(plan.price)}</strong>
                <span>${plan.period}</span>
              </div>
              <p class="sub-plan-desc">${esc(plan.description)}</p>
            </div>
            <div class="sub-plan-hero-visual">
              <div class="sub-plan-dish-wrap">
                <img src="../assets/images/meal_monday_idli.jpg" alt="Fresh nutritious SchoolBite meal" class="sub-plan-dish-img">
                <svg class="sub-plan-leaves-svg" viewBox="0 0 120 140" fill="none">
                  <path d="M90 20 C105 40 100 80 70 95 C55 65 65 35 90 20Z" fill="#58ad74" opacity="0.85"/>
                  <path d="M40 85 C25 105 30 130 55 138 C68 115 60 90 40 85Z" fill="#75be8c" opacity="0.8"/>
                </svg>
              </div>
              <div class="sub-plan-script">Healthy<br>Kids<br><b>Happier<br>Days <span class="sub-heart">♥</span></b></div>
            </div>
          </div>

          <!-- Plan Includes -->
          <div class="sub-plan-includes-section">
            <h3>Plan Includes</h3>
            <ul class="sub-plan-features-list">
              ${plan.features.map(f => `
                <li class="${f.included ? 'is-included' : 'is-excluded'}">
                  <span class="sub-feature-icon">${f.included ? '✓' : '×'}</span>
                  <span>${esc(f.text)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Tomorrow Gift Banner -->
          <div class="sub-plan-tomorrow-banner">
            <div class="sub-tomorrow-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            </div>
            <div class="sub-tomorrow-copy">
              <strong>A Healthier Tomorrow for Your Child</strong>
              <p>Fresh ingredients, expert nutrition and meals kids love.</p>
            </div>
            <svg class="sub-tomorrow-leaves" viewBox="0 0 60 60" fill="none">
              <path d="M45 10 C55 25 50 50 30 55 C20 40 28 20 45 10Z" fill="#75be8c" opacity="0.35"/>
            </svg>
          </div>
        </article>

        <!-- 4 Value Proposition Cards -->
        <div class="sub-props-grid">
          <div class="sub-prop-card">
            <div class="sub-prop-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/></svg>
            </div>
            <strong>Fresh Ingredients</strong>
            <p>High-quality, nutritious meals every day.</p>
          </div>
          <div class="sub-prop-card">
            <div class="sub-prop-icon red">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <strong>Loved by Kids</strong>
            <p>Delicious meals kids enjoy.</p>
          </div>
          <div class="sub-prop-card">
            <div class="sub-prop-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <strong>Safe & Hygienic</strong>
            <p>Prepared with the highest standards.</p>
          </div>
          <div class="sub-prop-card">
            <div class="sub-prop-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <strong>Expert Nutrition</strong>
            <p>Designed by nutritionists.</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Order Summary, Select Child, Payment Method -->
      <aside class="sub-details-right">
        <!-- Order Summary Card -->
        <article class="sub-card sub-summary-card">
          <div class="sub-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <h3>Order Summary</h3>
          </div>
          <div class="sub-summary-rows">
            <div class="sub-summary-row">
              <span>Plan</span>
              <strong>${esc(plan.name)}</strong>
            </div>
            <div class="sub-summary-row">
              <span>Price</span>
              <strong>${money(plan.price)}</strong>
            </div>
            <div class="sub-summary-row">
              <span>Billing Period</span>
              <strong>${plan.billingPeriod || 'Monthly'}</strong>
            </div>
            <div class="sub-summary-row">
              <span>Start Date</span>
              <strong>${formattedStartDate}</strong>
            </div>
            <div class="sub-summary-row">
              <span>Next Billing Date</span>
              <strong>${formattedNextBillingDate}</strong>
            </div>
          </div>
          <div class="sub-summary-total-row">
            <span>Total Amount</span>
            <strong>${money(plan.price)}</strong>
          </div>
        </article>

        <!-- Select Child Card -->
        <article class="sub-card sub-child-card">
          <div class="sub-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
            <h3>Select Child</h3>
          </div>
          <div class="sub-child-select-wrap">
            <div class="sub-child-display" id="sub-child-display">
              <div class="sub-child-avatar" id="sub-child-avatar">${esc(selectedChild.name ? selectedChild.name[0].toUpperCase() : 'A')}</div>
              <div class="sub-child-info">
                <strong id="sub-child-name">${esc(selectedChild.name || 'Aarav Sharma')}</strong>
                <span id="sub-child-school">${esc(selectedChild.className || 'Grade 3')} • ${esc(selectedChild.school || 'Oakridge International School')}</span>
              </div>
              <div class="sub-child-chevron">⌄</div>
            </div>
            <select class="sub-child-real-select" id="sub-child-select" aria-label="Select Child">
              ${children.map(c => `
                <option value="${esc(c.id)}" ${c.id === selectedChild.id ? 'selected' : ''}>
                  ${esc(c.name)} (${esc(c.className || 'Grade 3')} • ${esc(c.school || 'School')})
                </option>
              `).join('')}
            </select>
          </div>
        </article>

        <!-- Payment Method Card -->
        <article class="sub-card sub-payment-card">
          <div class="sub-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            <h3>Payment Method</h3>
          </div>
          <div class="sub-payment-options">
            <label class="sub-pay-option is-selected">
              <input type="radio" name="sub-payment-method" value="card" checked>
              <span class="sub-pay-radio"></span>
              <div class="sub-pay-icon card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
              <div class="sub-pay-info">
                <strong>Credit / Debit Card</strong>
                <small>Visa, Mastercard, RuPay</small>
              </div>
            </label>

            <label class="sub-pay-option">
              <input type="radio" name="sub-payment-method" value="upi">
              <span class="sub-pay-radio"></span>
              <div class="sub-pay-icon upi">
                <span class="upi-badge">UPI</span>
              </div>
              <div class="sub-pay-info">
                <strong>UPI</strong>
                <small>Pay with any UPI app</small>
              </div>
            </label>

            <label class="sub-pay-option">
              <input type="radio" name="sub-payment-method" value="netbanking">
              <span class="sub-pay-radio"></span>
              <div class="sub-pay-icon bank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="3 10 12 3 21 10"/><line x1="6" y1="10" x2="6" y2="21"/><line x1="10" y1="10" x2="10" y2="21"/><line x1="14" y1="10" x2="14" y2="21"/><line x1="18" y1="10" x2="18" y2="21"/></svg>
              </div>
              <div class="sub-pay-info">
                <strong>Net Banking</strong>
                <small>All major banks supported</small>
              </div>
            </label>
          </div>

          <button class="btn sub-proceed-btn" type="button" id="sub-proceed-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lock-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Proceed to Payment <b>→</b>
          </button>

          <p class="sub-secure-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Your payment information is secure and encrypted.
          </p>
        </article>
      </aside>
    </div>
  `;

  // Attach interactive listeners
  const childSelect = document.getElementById('sub-child-select');
  if (childSelect) {
    childSelect.addEventListener('change', (e) => {
      const chosen = children.find(c => c.id === e.target.value) || children[0];
      localStorage.setItem('schoolbite_pending_child_id', chosen.id);
      document.getElementById('sub-child-avatar').textContent = (chosen.name || 'A')[0].toUpperCase();
      document.getElementById('sub-child-name').textContent = chosen.name || 'Aarav Sharma';
      document.getElementById('sub-child-school').textContent = `${chosen.className || 'Grade 3'} • ${chosen.school || 'Oakridge International School'}`;
    });
  }

  document.querySelectorAll('.sub-pay-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.sub-pay-option').forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  const proceedBtn = document.getElementById('sub-proceed-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      const selectedChildId = childSelect?.value || children[0].id;
      const childObj = children.find(c => c.id === selectedChildId) || children[0];
      const selectedMethod = document.querySelector('input[name="sub-payment-method"]:checked')?.value || 'card';
      const methodNames = { card: 'Credit / Debit Card', upi: 'UPI', netbanking: 'Net Banking' };

      proceedBtn.disabled = true;
      proceedBtn.innerHTML = `Processing Payment...`;

      setTimeout(() => {
        const timestamp = new Date().toISOString();
        const orderId = 'SB-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 899999);

        // Update Store with active subscription & payment record
        SBStore.update(storeData => {
          if (!storeData.children.length) {
            storeData.children.push(childObj);
          }
          // Mark any existing subscriptions inactive, set new active
          storeData.subscriptions.forEach(s => s.status = 'Expired');
          storeData.subscriptions.unshift({
            id: 'sub-' + Date.now(),
            plan: plan.name,
            childId: childObj.id,
            price: plan.price,
            cycle: 'month',
            startDate: timestamp,
            status: 'Active'
          });
          storeData.payments.unshift({
            id: orderId,
            date: timestamp,
            childId: childObj.id,
            plan: plan.name,
            amount: plan.price,
            status: 'Paid',
            method: methodNames[selectedMethod] || 'Credit / Debit Card'
          });
          storeData.notifications.unshift({
            id: 'n-' + Date.now(),
            type: 'payment',
            title: 'Subscription Activated',
            text: `Your ${plan.name} for ${childObj.name} is now active. Enjoy fresh school meals!`,
            date: timestamp,
            read: false
          });
        });

        // Show Success Confirmation Modal
        openModal(`
          <div class="sub-success-modal">
            <div class="sub-success-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2>Subscription Confirmed!</h2>
            <p>Your <strong>${esc(plan.name)}</strong> has been activated for <strong>${esc(childObj.name)}</strong>.</p>
            <div class="sub-success-receipt">
              <div><span>Order ID</span><strong>${orderId}</strong></div>
              <div><span>Amount Paid</span><strong>${money(plan.price)}</strong></div>
              <div><span>Payment Method</span><strong>${methodNames[selectedMethod]}</strong></div>
              <div><span>Next Delivery</span><strong>Tomorrow</strong></div>
            </div>
            <div class="sub-success-actions">
              <a class="btn" href="${dashboardRootPath()}subscriptions.html">View Subscription <b>→</b></a>
              <a class="btn outline" href="${dashboardRootPath()}dashboard.html">Go to Dashboard</a>
            </div>
          </div>
        `);
      }, 700);
    });
  }
}

function planPurchasePage() {
  subscriptionDetailsPage();
}

function notificationsPage() {
  const defaultItems = [
    {
      id: 'notif-1',
      category: 'subscriptions',
      type: 'payment',
      title: 'Payment Successful',
      text: 'Your Monthly Plan subscription has been activated. Happy eating!',
      time: 'Today, 10:24 AM',
      read: false,
      iconBg: '#e2f4e8',
      iconColor: '#107a48',
      iconType: 'check-circle'
    },
    {
      id: 'notif-2',
      category: 'delivery',
      type: 'delivery',
      title: 'Order Out for Delivery',
      text: "Your child's lunch for today is out for delivery and will reach soon.",
      time: 'Today, 9:15 AM',
      read: false,
      iconBg: '#fef3e2',
      iconColor: '#b45309',
      iconType: 'truck'
    },
    {
      id: 'notif-3',
      category: 'menu',
      type: 'menu',
      title: 'Menu Update',
      text: "Next week's menu is now available. Check out the new and exciting meals!",
      time: 'Yesterday, 5:30 PM',
      read: true,
      iconBg: '#fee2e2',
      iconColor: '#ef4444',
      iconType: 'calendar'
    },
    {
      id: 'notif-4',
      category: 'general',
      type: 'child',
      title: 'Child Added',
      text: 'Aarav Sharma has been added to your account.',
      time: 'Yesterday, 3:12 PM',
      read: true,
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      iconType: 'users'
    },
    {
      id: 'notif-5',
      category: 'general',
      type: 'nutrition',
      title: 'Nutrition Tip',
      text: 'Include fruits and vegetables for a stronger immune system!',
      time: '7 Sept 2026, 11:00 AM',
      read: true,
      iconBg: '#e2f4e8',
      iconColor: '#16a34a',
      iconType: 'sprout'
    },
    {
      id: 'notif-6',
      category: 'subscriptions',
      type: 'offer',
      title: 'Special Offer',
      text: 'Get 10% off on Monthly Plan. Limited time offer!',
      time: '5 Sept 2026, 2:20 PM',
      read: true,
      iconBg: '#fef3c7',
      iconColor: '#d97706',
      iconType: 'gift'
    }
  ];

  const getNotifIconSvg = (iconType) => {
    switch (iconType) {
      case 'check-circle':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      case 'truck':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l3 3v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
      case 'calendar':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>`;
      case 'users':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
      case 'sprout':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.3.9-4.9 2z"/></svg>`;
      case 'gift':
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7" rx="1"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }
  };

  const moreDotsSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="5" r="1.75"/><circle cx="12" cy="12" r="1.75"/><circle cx="12" cy="19" r="1.75"/></svg>`;
  const checkMarkSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  let notifications = JSON.parse(localStorage.getItem('schoolbite_custom_notifications') || 'null');
  if (!notifications || !Array.isArray(notifications) || notifications.length === 0) {
    notifications = defaultItems;
    localStorage.setItem('schoolbite_custom_notifications', JSON.stringify(notifications));
  }

  let activeTab = 'all';

  function render() {
    const filtered = notifications.filter(item => {
      if (activeTab === 'all') return true;
      if (activeTab === 'orders') return item.category === 'orders' || item.type === 'delivery' || item.type === 'payment';
      if (activeTab === 'delivery') return item.category === 'delivery' || item.type === 'delivery';
      if (activeTab === 'menu') return item.category === 'menu' || item.type === 'menu';
      if (activeTab === 'subscriptions') return item.category === 'subscriptions' || item.type === 'payment' || item.type === 'offer';
      if (activeTab === 'general') return item.category === 'general' || item.type === 'child' || item.type === 'nutrition';
      return item.category === activeTab;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    // Update topbar bell badge
    const bellBadge = document.querySelector('.topbar .icon-btn[data-action="notifications"] .dot');
    if (bellBadge) {
      if (unreadCount > 0) {
        bellBadge.textContent = unreadCount;
        bellBadge.style.display = 'inline-flex';
      } else {
        bellBadge.style.display = 'none';
      }
    }

    const html = `
      <div class="notifications-page-container">
        <!-- Top Section Header -->
        <div class="notif-page-header">
          <div class="notif-header-text">
            <h1 class="notif-main-title">Notifications</h1>
            <p class="notif-main-subtitle">Stay updated with your child's meals, orders and important updates.</p>
          </div>
          <button class="notif-mark-all-btn" id="btn-mark-all-read">
            ${checkMarkSvg}
            <span>Mark all as read</span>
          </button>
        </div>

        <!-- Filter Pill Tabs -->
        <div class="notif-filter-tabs">
          <button class="notif-pill ${activeTab === 'all' ? 'is-active' : ''}" data-tab="all">All</button>
          <button class="notif-pill ${activeTab === 'orders' ? 'is-active' : ''}" data-tab="orders">Orders</button>
          <button class="notif-pill ${activeTab === 'delivery' ? 'is-active' : ''}" data-tab="delivery">Delivery</button>
          <button class="notif-pill ${activeTab === 'menu' ? 'is-active' : ''}" data-tab="menu">Menu</button>
          <button class="notif-pill ${activeTab === 'subscriptions' ? 'is-active' : ''}" data-tab="subscriptions">Subscriptions</button>
          <button class="notif-pill ${activeTab === 'general' ? 'is-active' : ''}" data-tab="general">General</button>
        </div>

        <!-- Notification Cards List -->
        <div class="notif-cards-list">
          ${filtered.length > 0 ? filtered.map(item => `
            <article class="notif-card ${item.read ? 'is-read' : 'is-unread'}" data-id="${item.id}">
              <div class="notif-card-left">
                <div class="notif-icon-avatar" style="background-color: ${item.iconBg}; color: ${item.iconColor};">
                  ${getNotifIconSvg(item.iconType)}
                </div>
                <div class="notif-content">
                  <h3 class="notif-title">${esc(item.title)}</h3>
                  <p class="notif-desc">${esc(item.text)}</p>
                </div>
              </div>
              <div class="notif-card-right">
                <span class="notif-time">${item.time}</span>
                ${!item.read ? '<span class="notif-unread-dot" title="Unread"></span>' : ''}
                <div class="notif-actions-dropdown">
                  <button class="notif-more-btn" data-id="${item.id}" aria-label="Options">
                    ${moreDotsSvg}
                  </button>
                  <div class="notif-menu-popover" id="notif-popover-${item.id}">
                    <button class="notif-popover-item" data-action-toggle="${item.id}">${item.read ? 'Mark as unread' : 'Mark as read'}</button>
                    <button class="notif-popover-item is-danger" data-action-delete="${item.id}">Delete</button>
                  </div>
                </div>
              </div>
            </article>
          `).join('') : `
            <div class="notif-empty-state">
              <div class="notif-empty-icon">🔔</div>
              <h3>No notifications in this category</h3>
              <p>When new updates arrive, you'll see them here.</p>
            </div>
          `}
        </div>
      </div>
    `;

    document.getElementById('page-content').innerHTML = html;

    // Attach Listeners
    document.querySelectorAll('.notif-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    const markAllBtn = document.getElementById('btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        notifications.forEach(n => n.read = true);
        localStorage.setItem('schoolbite_custom_notifications', JSON.stringify(notifications));
        render();
        if (typeof toast === 'function') toast('All notifications marked as read');
      });
    }

    document.querySelectorAll('.notif-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const popover = document.getElementById(`notif-popover-${id}`);
        document.querySelectorAll('.notif-menu-popover').forEach(p => {
          if (p !== popover) p.classList.remove('is-open');
        });
        if (popover) popover.classList.toggle('is-open');
      });
    });

    document.querySelectorAll('[data-action-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-action-toggle');
        const target = notifications.find(n => n.id === id);
        if (target) {
          target.read = !target.read;
          localStorage.setItem('schoolbite_custom_notifications', JSON.stringify(notifications));
          render();
        }
      });
    });

    document.querySelectorAll('[data-action-delete]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-action-delete');
        notifications = notifications.filter(n => n.id !== id);
        localStorage.setItem('schoolbite_custom_notifications', JSON.stringify(notifications));
        render();
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.notif-menu-popover').forEach(p => p.classList.remove('is-open'));
    });
  }

  render();
}

if (typeof window !== 'undefined') {
  window.shell = schoolbiteDashboardShell;
  pageInfo['subscription-details'] = ['Complete Your Subscription', "You're one step closer to nutritious, happy school days."];
  pageInfo['plan-purchase'] = ['Complete Your Subscription', "You're one step closer to nutritious, happy school days."];

  document.addEventListener('DOMContentLoaded', () => {
    if (!schoolbiteDashboardShell()) return;
    applyTheme();
    const page = document.body.dataset.page || 'dashboard';
    ({ 
      dashboard: dashboardPage, 
      children: childrenPage, 
      menu: menuPage, 
      subscriptions: subscriptionsPage, 
      plans: plansPage, 
      'subscription-details': subscriptionDetailsPage,
      'plan-purchase': subscriptionDetailsPage, 
      payments: paymentsPage, 
      delivery: deliveryPage, 
      notifications: notificationsPage, 
      settings: settingsPage 
    }[page] || dashboardPage)();
    keepDashboardPlanLinksInternal();
  });
}

