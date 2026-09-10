// SchoolBite Admin Pages Controller
// Contains renderers and interactive handlers for all 11 admin pages

const AdminPages = {
  // 1. DASHBOARD PAGE (Matches the Reference UI exactly)
  dashboard() {
    const data = AdminStore.loadData() || AdminStore.init();
    const stats = data.stats || {};
    const activities = data.recentActivities || [];
    const deliveries = (data.deliveries || []).slice(0, 4);
    const todayMenu = data.todayMenu || [];

    const html = `
      <!-- DASHBOARD HEADER -->
      <div class="dash-header">
        <div class="dash-title-group">
          <h1>Welcome back, Admin!</h1>
          <p>Here's what's happening with SchoolBite today.</p>
        </div>
        <div class="date-pill">
          <span>📅</span>
          <span>Tuesday, 9 September 2026</span>
        </div>
      </div>

      <!-- 4 KPI STAT CARDS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap green">
            ${AdminIcons.parents}
          </div>
          <div class="stat-details">
            <span class="stat-label">Total Children</span>
            <span class="stat-val">${stats.totalChildren || 248}</span>
            <div class="stat-growth">
              ▲ ${stats.childrenGrowth || '+12%'}
              <span>from last month</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap blue">
            ${AdminIcons.children}
          </div>
          <div class="stat-details">
            <span class="stat-label">Total Parents</span>
            <span class="stat-val">${stats.totalParents || 187}</span>
            <div class="stat-growth">
              ▲ ${stats.parentsGrowth || '+8%'}
              <span>from last month</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap gold">
            ${AdminIcons.document}
          </div>
          <div class="stat-details">
            <span class="stat-label">Active Subscriptions</span>
            <span class="stat-val">${stats.activeSubscriptions || 162}</span>
            <div class="stat-growth">
              ▲ ${stats.subscriptionsGrowth || '+10%'}
              <span>from last month</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap pink">
            ${AdminIcons.pot}
          </div>
          <div class="stat-details">
            <span class="stat-label">Meals Served Today</span>
            <span class="stat-val">${stats.mealsServedToday || 735}</span>
            <div class="stat-growth">
              ▲ ${stats.mealsGrowth || '+15%'}
              <span>vs. yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <!-- MIDDLE ROW: 3 CARDS (BAR CHART + DONUT CHART + RECENT ACTIVITIES) -->
      <div class="middle-grid">
        <!-- 1. BAR CHART -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag">${AdminIcons.reports}</div>
              <div>
                <h3 class="card-title">Meals Served This Week</h3>
                <p class="card-subtitle">Total meals delivered to schools</p>
              </div>
            </div>
            <select class="filter-select">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div class="bar-chart-container">
            <div class="bar-chart-body">
              <div class="y-axis-labels">
                <span>1,000</span>
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>
              <div class="bar-col">
                <div class="bar-fill-wrap">
                  <div class="bar-fill" style="height: 62%;">
                    <div class="bar-tooltip">620 meals</div>
                  </div>
                </div>
              </div>
              <div class="bar-col high">
                <div class="bar-fill-wrap">
                  <div class="bar-fill" style="height: 85%;">
                    <div class="bar-tooltip">850 meals</div>
                  </div>
                </div>
              </div>
              <div class="bar-col">
                <div class="bar-fill-wrap">
                  <div class="bar-fill" style="height: 66%;">
                    <div class="bar-tooltip">660 meals</div>
                  </div>
                </div>
              </div>
              <div class="bar-col">
                <div class="bar-fill-wrap">
                  <div class="bar-fill" style="height: 51%;">
                    <div class="bar-tooltip">510 meals</div>
                  </div>
                </div>
              </div>
              <div class="bar-col">
                <div class="bar-fill-wrap">
                  <div class="bar-fill" style="height: 70%;">
                    <div class="bar-tooltip">700 meals</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="x-axis-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </div>
          </div>
        </div>

        <!-- 2. DONUT CHART -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag" style="color: #26ab70;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10h-10z"/></svg>
              </div>
              <div>
                <h3 class="card-title">Subscription Overview</h3>
                <p class="card-subtitle">Distribution of active plans</p>
              </div>
            </div>
          </div>
          <div class="donut-container">
            <div class="donut-visual">
              <svg viewBox="0 0 36 36">
                <!-- Background circle -->
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e8f3ec" stroke-width="3.6"></circle>
                <!-- Segment 1: Weekly (38%) #064637 -->
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#064637" stroke-width="3.6"
                  stroke-dasharray="38 62" stroke-dashoffset="0"></circle>
                <!-- Segment 2: Monthly (42%) #26ab70 -->
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#26ab70" stroke-width="3.6"
                  stroke-dasharray="42 58" stroke-dashoffset="-38"></circle>
                <!-- Segment 3: Term (20%) #a2dbc0 -->
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#a2dbc0" stroke-width="3.6"
                  stroke-dasharray="20 80" stroke-dashoffset="-80"></circle>
              </svg>
              <div class="donut-center-text">
                <span class="donut-center-num">162</span>
                <span class="donut-center-lbl">Active</span>
              </div>
            </div>
            <div class="donut-legend">
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot dot-weekly"></span>
                  <span>Weekly Plan</span>
                </div>
                <span class="legend-pct">38%</span>
              </div>
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot dot-monthly"></span>
                  <span>Monthly Plan</span>
                </div>
                <span class="legend-pct">42%</span>
              </div>
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot dot-term"></span>
                  <span>Term Plan</span>
                </div>
                <span class="legend-pct">20%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. RECENT ACTIVITIES -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag" style="color: #668079;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h3 class="card-title">Recent Activities</h3>
              </div>
            </div>
            <a href="notifications.html" class="card-action-link">View All →</a>
          </div>
          <div class="activity-feed">
            ${activities.map(act => `
              <div class="activity-item">
                <div class="act-icon ${act.type === 'subscription' ? 'green' : act.type === 'delivery' ? 'brown' : act.type === 'child' ? 'blue' : act.type === 'menu' ? 'red' : 'teal'}">
                  ${act.icon === 'document' ? AdminIcons.document : act.icon === 'truck' ? AdminIcons.truck : act.icon === 'user' ? AdminIcons.user : act.icon === 'calendar' ? AdminIcons.calendar : AdminIcons.rupee}
                </div>
                <div class="act-content">
                  <div class="act-title">${act.title}</div>
                  <div class="act-desc">${act.desc}</div>
                </div>
                <div class="act-time">${act.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- BOTTOM ROW: 3 CARDS (UPCOMING DELIVERIES + TODAY'S MENU + QUICK ACTIONS) -->
      <div class="bottom-grid">
        <!-- 1. UPCOMING DELIVERIES -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag" style="color: #075b46;">${AdminIcons.delivery}</div>
              <div>
                <h3 class="card-title">Upcoming Deliveries</h3>
              </div>
            </div>
            <a href="delivery.html" class="card-action-link">View All →</a>
          </div>
          <div class="mini-table-wrap">
            <table class="mini-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Child Name</th>
                  <th>School</th>
                  <th>Meal</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                ${deliveries.map(d => `
                  <tr>
                    <td style="color: var(--muted);">${d.id}</td>
                    <td><strong>${d.childName}</strong></td>
                    <td style="color: var(--muted);">${d.school}</td>
                    <td>${d.meal}</td>
                    <td>
                      <span class="badge-status ${d.status === 'Preparing' ? 'preparing' : d.status === 'Out for Delivery' ? 'out-for-delivery' : d.status === 'Packed' ? 'packed' : 'delivered'}">
                        ${d.status}
                      </span>
                    </td>
                    <td>${d.eta}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. TODAY'S MENU -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag" style="color: #075b46;">${AdminIcons.meals}</div>
              <div>
                <h3 class="card-title">Today's Menu</h3>
              </div>
            </div>
            <a href="menu.html" class="card-action-link">View Menu →</a>
          </div>
          <div class="today-menu-list">
            ${todayMenu.map(m => `
              <div class="today-menu-item">
                <img src="${m.image}" alt="${m.name}" class="today-menu-thumb" onerror="this.src='../parent/assets/images/meal-1.jpg'">
                <div class="today-menu-info">
                  <span class="today-menu-name">${m.name}</span>
                  <span class="today-menu-desc">${m.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. QUICK ACTIONS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon-tag" style="color: #075b46;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                <h3 class="card-title">Quick Actions</h3>
              </div>
            </div>
          </div>
          <div class="quick-actions-grid">
            <button class="quick-action-btn green" onclick="AdminPages.openAddChildModal()">
              ${AdminIcons.userPlus}
              <span>Add Child</span>
            </button>
            <a href="menu.html" class="quick-action-btn teal">
              ${AdminIcons.calendarPlus}
              <span>Create Menu</span>
            </a>
            <button class="quick-action-btn orange" onclick="AdminPages.openSendNotifModal()">
              ${AdminIcons.bell}
              <span>Send Notification</span>
            </button>
            <a href="reports.html" class="quick-action-btn blue">
              ${AdminIcons.reports}
              <span>View Reports</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  // 2. CHILDREN PAGE
  children() {
    const data = AdminStore.loadData() || AdminStore.init();
    const children = data.children || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Children Directory</h1>
          <p>Manage and monitor all enrolled students, schools, and diet plans.</p>
        </div>
        <div class="page-actions">
          <button class="btn-primary" onclick="AdminPages.openAddChildModal()">
            ${AdminIcons.plus}
            <span>Add Student</span>
          </button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-toolbar">
          <div class="table-search-wrap">
            ${AdminIcons.search}
            <input type="text" id="childrenSearchInput" placeholder="Search by name, parent, or school..." oninput="AdminPages.filterChildrenTable()">
          </div>
          <div class="table-filters">
            <select class="filter-select" id="childrenSchoolFilter" onchange="AdminPages.filterChildrenTable()">
              <option value="all">All Schools</option>
              <option value="Oakridge Intl. School">Oakridge Intl. School</option>
              <option value="Greenfield School">Greenfield School</option>
              <option value="Sunrise Public School">Sunrise Public School</option>
              <option value="Maple Kids School">Maple Kids School</option>
              <option value="DPS North">DPS North</option>
            </select>
            <select class="filter-select" id="childrenStatusFilter" onchange="AdminPages.filterChildrenTable()">
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <table class="data-table" id="childrenTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Parent</th>
              <th>School & Grade</th>
              <th>Diet & Allergies</th>
              <th>Current Plan</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="childrenTableBody">
            ${this.renderChildrenRows(children)}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  renderChildrenRows(children) {
    if (!children.length) {
      return `<tr><td colspan="8" style="text-align: center; padding: 30px; color: var(--muted);">No students found.</td></tr>`;
    }
    return children.map(c => `
      <tr>
        <td><strong style="color: var(--muted); font-size: 11px;">${c.id}</strong></td>
        <td><strong>${c.name}</strong></td>
        <td>
          <div>${c.parent}</div>
          <small style="color: var(--muted);">${c.parentEmail || ''}</small>
        </td>
        <td>
          <div>${c.school}</div>
          <small style="color: var(--green); font-weight: 600;">${c.grade}</small>
        </td>
        <td>
          <span style="font-weight: 500;">${c.diet}</span>
          ${c.allergies !== 'None' ? `<br><small style="color: #d9534f; font-weight: 600;">⚠️ ${c.allergies}</small>` : ''}
        </td>
        <td><span class="badge-status ${c.plan.includes('Monthly') ? 'packed' : c.plan.includes('Term') ? 'out-for-delivery' : 'preparing'}">${c.plan}</span></td>
        <td><span class="badge-status ${c.status === 'Active' ? 'out-for-delivery' : 'inactive'}">${c.status}</span></td>
        <td>
          <div class="data-table-actions">
            <button class="btn-icon-action" title="Edit" onclick="AdminPages.editChild('${c.id}')">${AdminIcons.edit}</button>
            <button class="btn-icon-action danger" title="Delete" onclick="AdminPages.deleteChild('${c.id}')">${AdminIcons.trash}</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  filterChildrenTable() {
    const q = (document.getElementById('childrenSearchInput')?.value || '').toLowerCase();
    const school = document.getElementById('childrenSchoolFilter')?.value || 'all';
    const status = document.getElementById('childrenStatusFilter')?.value || 'all';
    const data = AdminStore.loadData() || AdminStore.init();

    const filtered = (data.children || []).filter(c => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.parent.toLowerCase().includes(q) || c.school.toLowerCase().includes(q);
      const matchSchool = school === 'all' || c.school === school;
      const matchStatus = status === 'all' || c.status === status;
      return matchQ && matchSchool && matchStatus;
    });

    document.getElementById('childrenTableBody').innerHTML = this.renderChildrenRows(filtered);
  },

  openAddChildModal() {
    AdminShell.openModal(`
      <div class="modal-header">
        <h3>Add New Student</h3>
        <button class="modal-close" onclick="AdminShell.closeModal()">&times;</button>
      </div>
      <form onsubmit="AdminPages.saveNewChild(event)">
        <div class="modal-body">
          <div class="form-group">
            <label>Child Full Name *</label>
            <input type="text" class="form-control" id="mChildName" required placeholder="e.g. Aryan Patel">
          </div>
          <div class="form-group">
            <label>Parent Name *</label>
            <input type="text" class="form-control" id="mParentName" required placeholder="e.g. Neha Patel">
          </div>
          <div class="form-group">
            <label>Parent Email *</label>
            <input type="email" class="form-control" id="mParentEmail" required placeholder="e.g. neha.p@gmail.com">
          </div>
          <div class="form-group">
            <label>School *</label>
            <select class="form-control" id="mChildSchool">
              <option>Oakridge Intl. School</option>
              <option>Greenfield School</option>
              <option>Sunrise Public School</option>
              <option>Maple Kids School</option>
              <option>DPS North</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grade / Section *</label>
            <input type="text" class="form-control" id="mChildGrade" required placeholder="e.g. Grade 3-B">
          </div>
          <div class="form-group">
            <label>Dietary Preference</label>
            <select class="form-control" id="mChildDiet">
              <option>Vegetarian</option>
              <option>Non-Veg</option>
              <option>Jain Meal</option>
              <option>Gluten Free</option>
              <option>High Protein</option>
            </select>
          </div>
          <div class="form-group">
            <label>Allergies (if any)</label>
            <input type="text" class="form-control" id="mChildAllergies" placeholder="e.g. Peanuts, Dairy, None">
          </div>
          <div class="form-group">
            <label>Subscription Plan</label>
            <select class="form-control" id="mChildPlan">
              <option>Monthly Plan (₹2,999/mo)</option>
              <option>Weekly Plan (₹799/wk)</option>
              <option>Term Plan (₹7,999/term)</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="AdminShell.closeModal()">Cancel</button>
          <button type="submit" class="btn-primary">Save Student</button>
        </div>
      </form>
    `);
  },

  saveNewChild(e) {
    e.preventDefault();
    const name = document.getElementById('mChildName').value.trim();
    const parent = document.getElementById('mParentName').value.trim();
    const parentEmail = document.getElementById('mParentEmail').value.trim();
    const school = document.getElementById('mChildSchool').value;
    const grade = document.getElementById('mChildGrade').value.trim();
    const diet = document.getElementById('mChildDiet').value;
    const allergies = document.getElementById('mChildAllergies').value.trim() || 'None';
    const plan = document.getElementById('mChildPlan').value.split(' (')[0];

    const child = AdminStore.addChild({
      name, parent, parentEmail, school, grade, diet, allergies, plan, status: 'Active'
    });

    AdminShell.closeModal();
    AdminShell.toast(`Student "${name}" added successfully!`);
    if (AdminShell.activePage === 'children') {
      AdminPages.children();
    } else if (AdminShell.activePage === 'dashboard') {
      AdminPages.dashboard();
    }
  },

  deleteChild(id) {
    if (confirm('Are you sure you want to remove this student record?')) {
      const data = AdminStore.loadData();
      data.children = data.children.filter(c => c.id !== id);
      data.stats.totalChildren = Math.max(0, (data.stats.totalChildren || 1) - 1);
      AdminStore.saveData(data);
      AdminShell.toast('Student record removed.');
      AdminPages.children();
    }
  },

  // 3. PARENTS PAGE
  parents() {
    const data = AdminStore.loadData() || AdminStore.init();
    const parents = data.parents || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Parent Accounts</h1>
          <p>Overview of registered parents, associated children, and subscription totals.</p>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-toolbar">
          <div class="table-search-wrap">
            ${AdminIcons.search}
            <input type="text" placeholder="Search parents by name, email, or phone..." oninput="AdminPages.filterParents(this.value)">
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Parent ID</th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Children Enrolled</th>
              <th>Active Plans</th>
              <th>Total Spent</th>
              <th>Joined Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="parentsTableBody">
            ${parents.map(p => `
              <tr>
                <td><strong style="color: var(--muted); font-size: 11px;">${p.id}</strong></td>
                <td><strong>${p.name}</strong></td>
                <td>
                  <div>${p.email}</div>
                  <small style="color: var(--muted);">${p.phone}</small>
                </td>
                <td><span style="font-weight: 700; color: var(--green);">${p.childrenCount} Child</span></td>
                <td><span class="badge-status ${p.activePlans > 0 ? 'out-for-delivery' : 'inactive'}">${p.activePlans} Active</span></td>
                <td><strong>${p.totalSpent}</strong></td>
                <td style="color: var(--muted); font-size: 12px;">${p.joinedDate}</td>
                <td><span class="badge-status ${p.status === 'Active' ? 'out-for-delivery' : 'inactive'}">${p.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  // 4. SUBSCRIPTIONS PAGE
  subscriptions() {
    const data = AdminStore.loadData() || AdminStore.init();
    const subs = data.subscriptions || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Subscription Management</h1>
          <p>Track active student plans, renewal cycles, and pricing tiers.</p>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card">
          <div class="stat-icon-wrap green">${AdminIcons.document}</div>
          <div class="stat-details">
            <span class="stat-label">Weekly Plans</span>
            <span class="stat-val">₹799 <small style="font-size: 13px; color: var(--muted);">/wk</small></span>
            <div class="stat-growth">62 Active</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap blue">${AdminIcons.document}</div>
          <div class="stat-details">
            <span class="stat-label">Monthly Plans</span>
            <span class="stat-val">₹2,999 <small style="font-size: 13px; color: var(--muted);">/mo</small></span>
            <div class="stat-growth">68 Active</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap gold">${AdminIcons.document}</div>
          <div class="stat-details">
            <span class="stat-label">Term Plans</span>
            <span class="stat-val">₹7,999 <small style="font-size: 13px; color: var(--muted);">/term</small></span>
            <div class="stat-growth">32 Active</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap pink">${AdminIcons.rupee}</div>
          <div class="stat-details">
            <span class="stat-label">Monthly Run Rate</span>
            <span class="stat-val">₹4,85,600</span>
            <div class="stat-growth">▲ +14% growth</div>
          </div>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-toolbar">
          <h3 style="font-size: 15px; font-weight: 700;">All Subscriptions</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Sub ID</th>
              <th>Student & School</th>
              <th>Parent</th>
              <th>Plan</th>
              <th>Price</th>
              <th>Validity</th>
              <th>Auto-Renew</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${subs.map(s => `
              <tr>
                <td><strong style="color: var(--muted); font-size: 11px;">${s.id}</strong></td>
                <td>
                  <strong>${s.childName}</strong>
                  <div style="color: var(--muted); font-size: 11.5px;">${s.school}</div>
                </td>
                <td>${s.parentName}</td>
                <td><span class="badge-status ${s.plan.includes('Monthly') ? 'packed' : s.plan.includes('Term') ? 'out-for-delivery' : 'preparing'}">${s.plan}</span></td>
                <td><strong>${s.price}</strong></td>
                <td style="font-size: 12px; color: var(--muted);">${s.startDate} - ${s.endDate}</td>
                <td>${s.autoRenew ? '<span style="color: #15966e; font-weight: 600;">✓ Enabled</span>' : '<span style="color: var(--muted);">Disabled</span>'}</td>
                <td><span class="badge-status ${s.status === 'Active' ? 'out-for-delivery' : 'inactive'}">${s.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  // 5. MEALS MANAGEMENT PAGE
  meals() {
    const data = AdminStore.loadData() || AdminStore.init();
    const meals = data.allMeals || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Meal Catalog & Nutrition</h1>
          <p>Create, update recipes, ingredients, and nutrition details for school meals.</p>
        </div>
        <div class="page-actions">
          <button class="btn-primary" onclick="AdminPages.openAddMealModal()">
            ${AdminIcons.plus}
            <span>Add New Recipe</span>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
        ${meals.map(m => `
          <div class="card" style="padding: 0; overflow: hidden;">
            <div style="height: 160px; overflow: hidden; position: relative;">
              <img src="${m.image}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='../parent/assets/images/meal-1.jpg'">
              <span class="badge-status ${m.dietary === 'Vegetarian' ? 'out-for-delivery' : m.dietary === 'Vegan' ? 'packed' : 'preparing'}" style="position: absolute; top: 12px; right: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                ${m.dietary}
              </span>
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--ink);">${m.name}</h3>
                <span style="font-weight: 700; color: #d48b17; font-size: 13px;">★ ${m.rating}</span>
              </div>
              <p style="color: var(--muted); font-size: 12.5px; margin-bottom: 14px;">${m.category} • ${m.calories} kcal</p>
              
              <div style="display: flex; justify-content: space-between; background: #f6faf7; padding: 10px 14px; border-radius: 8px; font-size: 12px; margin-bottom: 16px;">
                <div><span style="color: var(--muted);">Protein:</span> <strong>${m.protein}</strong></div>
                <div><span style="color: var(--muted);">Carbs:</span> <strong>${m.carbs}</strong></div>
                <div><span style="color: var(--muted);">Fats:</span> <strong>${m.fats}</strong></div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <small style="color: var(--muted);">Prep time: <strong>${m.prepTime}</strong></small>
                <button class="btn-icon-action danger" onclick="AdminPages.deleteMealItem('${m.id}')">${AdminIcons.trash}</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  openAddMealModal() {
    AdminShell.openModal(`
      <div class="modal-header">
        <h3>Add Recipe to Catalog</h3>
        <button class="modal-close" onclick="AdminShell.closeModal()">&times;</button>
      </div>
      <form onsubmit="AdminPages.saveNewMeal(event)">
        <div class="modal-body">
          <div class="form-group">
            <label>Meal / Recipe Name *</label>
            <input type="text" class="form-control" id="mMealName" required placeholder="e.g. Palak Paneer with Roti">
          </div>
          <div class="form-group">
            <label>Category *</label>
            <select class="form-control" id="mMealCategory">
              <option>Rice Dishes</option>
              <option>Indian Breads</option>
              <option>Continental</option>
              <option>Snacks & Salads</option>
              <option>Breakfast</option>
            </select>
          </div>
          <div class="form-group">
            <label>Dietary Type</label>
            <select class="form-control" id="mMealDiet">
              <option>Vegetarian</option>
              <option>Non-Veg</option>
              <option>Vegan</option>
              <option>Jain</option>
              <option>Gluten Free</option>
            </select>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label>Calories (kcal)</label>
              <input type="number" class="form-control" id="mMealCal" required placeholder="e.g. 400">
            </div>
            <div class="form-group">
              <label>Prep Time</label>
              <input type="text" class="form-control" id="mMealPrep" required placeholder="e.g. 20 min">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
            <div class="form-group">
              <label>Protein</label>
              <input type="text" class="form-control" id="mMealProt" placeholder="e.g. 15g">
            </div>
            <div class="form-group">
              <label>Carbs</label>
              <input type="text" class="form-control" id="mMealCarb" placeholder="e.g. 50g">
            </div>
            <div class="form-group">
              <label>Fats</label>
              <input type="text" class="form-control" id="mMealFat" placeholder="e.g. 10g">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="AdminShell.closeModal()">Cancel</button>
          <button type="submit" class="btn-primary">Add Recipe</button>
        </div>
      </form>
    `);
  },

  saveNewMeal(e) {
    e.preventDefault();
    const name = document.getElementById('mMealName').value.trim();
    const category = document.getElementById('mMealCategory').value;
    const dietary = document.getElementById('mMealDiet').value;
    const calories = document.getElementById('mMealCal').value;
    const prepTime = document.getElementById('mMealPrep').value.trim();
    const protein = document.getElementById('mMealProt').value.trim() || '10g';
    const carbs = document.getElementById('mMealCarb').value.trim() || '50g';
    const fats = document.getElementById('mMealFat').value.trim() || '10g';

    AdminStore.addMeal({
      name, category, dietary, calories, prepTime, protein, carbs, fats,
      status: 'Active', image: '../parent/assets/images/meal-2.jpg'
    });

    AdminShell.closeModal();
    AdminShell.toast(`Recipe "${name}" added to catalog.`);
    AdminPages.meals();
  },

  deleteMealItem(id) {
    if (confirm('Delete this recipe from the catalog?')) {
      AdminStore.deleteMeal(id);
      AdminShell.toast('Recipe deleted.');
      AdminPages.meals();
    }
  },

  // 6. ORDERS PAGE
  orders() {
    const data = AdminStore.loadData() || AdminStore.init();
    const orders = data.orders || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Orders & Transactions</h1>
          <p>Complete ledger of parent subscription purchases and payment statuses.</p>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-toolbar">
          <div class="table-search-wrap">
            ${AdminIcons.search}
            <input type="text" placeholder="Search orders by ID or parent name...">
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date & Time</th>
              <th>Parent</th>
              <th>Student</th>
              <th>Item / Plan</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong style="color: var(--muted); font-size: 11px;">${o.id}</strong></td>
                <td style="font-size: 12px; color: var(--muted);">${o.date}</td>
                <td><strong>${o.parent}</strong></td>
                <td>${o.child}</td>
                <td>${o.plan}</td>
                <td><span style="font-size: 12px; color: var(--ink-secondary);">${o.method}</span></td>
                <td><strong style="color: var(--green); font-size: 14px;">${o.amount}</strong></td>
                <td><span class="badge-status ${o.status === 'Success' ? 'out-for-delivery' : 'preparing'}">${o.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  // 7. DELIVERY MANAGEMENT PAGE
  delivery() {
    const data = AdminStore.loadData() || AdminStore.init();
    const deliveries = data.deliveries || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Delivery Management</h1>
          <p>Real-time delivery status, vehicle assignments, and school ETA tracking.</p>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card">
          <div class="stat-icon-wrap gold">${AdminIcons.pot}</div>
          <div class="stat-details">
            <span class="stat-label">Preparing in Kitchen</span>
            <span class="stat-val">2 Batches</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap blue">${AdminIcons.document}</div>
          <div class="stat-details">
            <span class="stat-label">Packed & Ready</span>
            <span class="stat-val">1 Batch</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap green">${AdminIcons.truck}</div>
          <div class="stat-details">
            <span class="stat-label">Out for Delivery</span>
            <span class="stat-val">2 Vans</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap pink">${AdminIcons.check}</div>
          <div class="stat-details">
            <span class="stat-label">Delivered Today</span>
            <span class="stat-val">735 Meals</span>
          </div>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-toolbar">
          <h3 style="font-size: 15px; font-weight: 700;">Today's School Delivery Dispatches</h3>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>School & Grade</th>
              <th>Meal Type</th>
              <th>Assigned Driver</th>
              <th>ETA</th>
              <th>Live Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${deliveries.map(d => `
              <tr>
                <td>${d.id}</td>
                <td><strong>${d.childName}</strong></td>
                <td>
                  <div>${d.school}</div>
                  <small style="color: var(--muted);">${d.grade}</small>
                </td>
                <td>${d.meal}</td>
                <td>
                  <div>${d.driver}</div>
                  <small style="color: var(--muted);">${d.vehicle}</small>
                </td>
                <td><strong>${d.eta}</strong></td>
                <td>
                  <span class="badge-status ${d.status === 'Preparing' ? 'preparing' : d.status === 'Out for Delivery' ? 'out-for-delivery' : d.status === 'Packed' ? 'packed' : 'delivered'}">
                    ${d.status}
                  </span>
                </td>
                <td>
                  <button class="btn-secondary" style="padding: 4px 10px; font-size: 11.5px;" onclick="AdminPages.openUpdateDeliveryModal(${d.id}, '${d.status}')">
                    Update Status
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  openUpdateDeliveryModal(id, currentStatus) {
    AdminShell.openModal(`
      <div class="modal-header">
        <h3>Update Delivery Status</h3>
        <button class="modal-close" onclick="AdminShell.closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Select Current Status</label>
          <select class="form-control" id="mDeliveryStatus">
            <option ${currentStatus === 'Preparing' ? 'selected' : ''}>Preparing</option>
            <option ${currentStatus === 'Packed' ? 'selected' : ''}>Packed</option>
            <option ${currentStatus === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
            <option ${currentStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="AdminShell.closeModal()">Cancel</button>
        <button type="button" class="btn-primary" onclick="AdminPages.saveDeliveryStatus(${id})">Save Status</button>
      </div>
    `);
  },

  saveDeliveryStatus(id) {
    const status = document.getElementById('mDeliveryStatus').value;
    AdminStore.updateDeliveryStatus(id, status);
    AdminShell.closeModal();
    AdminShell.toast(`Delivery status updated to "${status}".`);
    AdminPages.delivery();
  },

  // 8. MENU PLANNER PAGE
  menu() {
    const data = AdminStore.loadData() || AdminStore.init();
    const sched = data.weeklySchedule || {};

    const days = [
      { key: 'Mon', name: 'Monday' },
      { key: 'Tue', name: 'Tuesday' },
      { key: 'Wed', name: 'Wednesday' },
      { key: 'Thu', name: 'Thursday' },
      { key: 'Fri', name: 'Friday' }
    ];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Weekly Menu Planner</h1>
          <p>Plan meals for Monday through Friday and publish directly to parent portal.</p>
        </div>
        <div class="page-actions">
          <button class="btn-primary" onclick="AdminPages.publishMenu()">
            ${AdminIcons.check}
            <span>Publish Menu to Parents</span>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px;">
        ${days.map(d => {
          const m = sched[d.key] || {};
          return `
            <div class="card" style="padding: 16px; min-height: 380px;">
              <div style="padding-bottom: 12px; border-bottom: 1px solid var(--line); margin-bottom: 14px;">
                <h3 style="font-family: var(--font-head); font-size: 16px; color: var(--green);">${d.name}</h3>
                <small style="color: var(--muted);">Sep 14</small>
              </div>

              <div style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
                <div>
                  <span style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--muted);">Main Lunch</span>
                  <div style="font-weight: 600; font-size: 13px; margin-top: 2px; color: var(--ink);">${m.main || 'Veg Dish'}</div>
                </div>

                <div>
                  <span style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--muted);">Alternative</span>
                  <div style="font-weight: 500; font-size: 12.5px; margin-top: 2px; color: var(--ink-secondary);">${m.alt || 'Rice Combo'}</div>
                </div>

                <div>
                  <span style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--muted);">Snack & Fruit</span>
                  <div style="font-weight: 500; font-size: 12.5px; margin-top: 2px; color: var(--ink-secondary);">${m.snack || 'Fresh Fruits'}</div>
                </div>

                <div>
                  <span style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--muted);">Special Diet</span>
                  <div style="font-weight: 500; font-size: 12.5px; margin-top: 2px; color: #15966e;">${m.special || 'Gluten Free'}</div>
                </div>
              </div>

              <button class="btn-secondary" style="width: 100%; justify-content: center; margin-top: 14px; padding: 6px;" onclick="AdminPages.openEditDayMenuModal('${d.key}', '${d.name}')">
                ${AdminIcons.edit}
                <span>Edit Day</span>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  openEditDayMenuModal(dayKey, dayName) {
    const data = AdminStore.loadData() || AdminStore.init();
    const current = (data.weeklySchedule && data.weeklySchedule[dayKey]) || {};

    AdminShell.openModal(`
      <div class="modal-header">
        <h3>Edit Menu for ${dayName}</h3>
        <button class="modal-close" onclick="AdminShell.closeModal()">&times;</button>
      </div>
      <form onsubmit="AdminPages.saveDayMenu(event, '${dayKey}')">
        <div class="modal-body">
          <div class="form-group">
            <label>Main Lunch Dish</label>
            <input type="text" class="form-control" id="mDayMain" required value="${current.main || ''}">
          </div>
          <div class="form-group">
            <label>Alternative Option</label>
            <input type="text" class="form-control" id="mDayAlt" required value="${current.alt || ''}">
          </div>
          <div class="form-group">
            <label>Snack / Salad</label>
            <input type="text" class="form-control" id="mDaySnack" required value="${current.snack || ''}">
          </div>
          <div class="form-group">
            <label>Special Diet / Allergy Option</label>
            <input type="text" class="form-control" id="mDaySpecial" required value="${current.special || ''}">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="AdminShell.closeModal()">Cancel</button>
          <button type="submit" class="btn-primary">Save Menu</button>
        </div>
      </form>
    `);
  },

  saveDayMenu(e, dayKey) {
    e.preventDefault();
    const main = document.getElementById('mDayMain').value.trim();
    const alt = document.getElementById('mDayAlt').value.trim();
    const snack = document.getElementById('mDaySnack').value.trim();
    const special = document.getElementById('mDaySpecial').value.trim();

    const data = AdminStore.loadData() || AdminStore.init();
    if (!data.weeklySchedule) data.weeklySchedule = {};
    data.weeklySchedule[dayKey] = { main, alt, snack, special };
    AdminStore.saveData(data);

    AdminShell.closeModal();
    AdminShell.toast(`Menu updated for ${dayKey}.`);
    AdminPages.menu();
  },

  publishMenu() {
    AdminShell.toast('Weekly Menu published to all parent dashboards!');
  },

  // 9. NOTIFICATIONS PAGE
  notifications() {
    const data = AdminStore.loadData() || AdminStore.init();
    const notifs = data.notifications || [];

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Admin Notifications & Broadcasts</h1>
          <p>Send meal updates, school alerts, and view operational notifications.</p>
        </div>
        <div class="page-actions">
          <button class="btn-primary" onclick="AdminPages.openSendNotifModal()">
            ${AdminIcons.bell}
            <span>Broadcast Message</span>
          </button>
        </div>
      </div>

      <div class="card" style="padding: 0; overflow: hidden;">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700;">Recent Notifications</h3>
          <span style="font-size: 12.5px; color: var(--muted);">${notifs.length} Total</span>
        </div>
        <div style="display: flex; flex-direction: column;">
          ${notifs.map(n => `
            <div style="padding: 16px 20px; border-bottom: 1px solid #f0f6f2; display: flex; align-items: flex-start; gap: 14px; background: ${n.unread ? '#fbfefc' : '#fff'};">
              <div class="stat-icon-wrap ${n.type === 'subscription' ? 'green' : n.type === 'delivery' ? 'blue' : 'gold'}" style="width: 40px; height: 40px;">
                ${AdminIcons.bell}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="font-size: 14px; color: var(--ink);">${n.title}</strong>
                  <span style="font-size: 11.5px; color: var(--muted);">${n.time}</span>
                </div>
                <p style="color: var(--muted); font-size: 13px; margin-top: 4px;">${n.message}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  openSendNotifModal() {
    AdminShell.openModal(`
      <div class="modal-header">
        <h3>Broadcast Notification to Parents</h3>
        <button class="modal-close" onclick="AdminShell.closeModal()">&times;</button>
      </div>
      <form onsubmit="AdminPages.sendBroadcast(event)">
        <div class="modal-body">
          <div class="form-group">
            <label>Target Audience</label>
            <select class="form-control" id="mNotifAudience">
              <option>All Enrolled Parents (187)</option>
              <option>Oakridge Intl. School Parents</option>
              <option>Greenfield School Parents</option>
              <option>Parents with Allergies Listed</option>
            </select>
          </div>
          <div class="form-group">
            <label>Subject / Title *</label>
            <input type="text" class="form-control" id="mNotifTitle" required placeholder="e.g. Special Holiday Feast on Friday!">
          </div>
          <div class="form-group">
            <label>Message Content *</label>
            <textarea class="form-control" id="mNotifMessage" rows="4" required placeholder="Type your broadcast message..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="AdminShell.closeModal()">Cancel</button>
          <button type="submit" class="btn-primary">Send Broadcast</button>
        </div>
      </form>
    `);
  },

  sendBroadcast(e) {
    e.preventDefault();
    const title = document.getElementById('mNotifTitle').value.trim();
    const message = document.getElementById('mNotifMessage').value.trim();

    AdminStore.sendNotification({
      title, message, type: 'subscription'
    });

    AdminShell.closeModal();
    AdminShell.toast('Notification broadcast sent successfully!');
    if (AdminShell.activePage === 'notifications') {
      AdminPages.notifications();
    }
  },

  // 10. REPORTS PAGE
  reports() {
    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Analytics & Financial Reports</h1>
          <p>Track meal consumption, revenue growth, and school engagement metrics.</p>
        </div>
        <div class="page-actions">
          <button class="btn-secondary" onclick="AdminShell.toast('Exporting CSV report...')">
            <span>📥 Export CSV</span>
          </button>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card">
          <div class="stat-icon-wrap green">${AdminIcons.rupee}</div>
          <div class="stat-details">
            <span class="stat-label">Total Revenue (Sep)</span>
            <span class="stat-val">₹5,42,800</span>
            <div class="stat-growth">▲ +16% vs Aug</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap blue">${AdminIcons.pot}</div>
          <div class="stat-details">
            <span class="stat-label">Total Meals Served</span>
            <span class="stat-val">14,280</span>
            <div class="stat-growth">▲ +12%</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap gold">${AdminIcons.parents}</div>
          <div class="stat-details">
            <span class="stat-label">Parent Satisfaction</span>
            <span class="stat-val">98.4%</span>
            <div class="stat-growth">4.9 / 5.0 Rating</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap pink">${AdminIcons.truck}</div>
          <div class="stat-details">
            <span class="stat-label">On-Time Delivery</span>
            <span class="stat-val">99.2%</span>
            <div class="stat-growth">Avg. 11:15 AM</div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 16px;">Top Schools by Meal Count</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                <span>Oakridge Intl. School</span>
                <span>88 Students (35%)</span>
              </div>
              <div style="height: 8px; background: #e8f3ec; border-radius: 4px; overflow: hidden;">
                <div style="width: 35%; height: 100%; background: #075b46;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                <span>Greenfield School</span>
                <span>64 Students (26%)</span>
              </div>
              <div style="height: 8px; background: #e8f3ec; border-radius: 4px; overflow: hidden;">
                <div style="width: 26%; height: 100%; background: #15966e;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                <span>Sunrise Public School</span>
                <span>52 Students (21%)</span>
              </div>
              <div style="height: 8px; background: #e8f3ec; border-radius: 4px; overflow: hidden;">
                <div style="width: 21%; height: 100%; background: #26ab70;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                <span>Maple Kids School</span>
                <span>44 Students (18%)</span>
              </div>
              <div style="height: 8px; background: #e8f3ec; border-radius: 4px; overflow: hidden;">
                <div style="width: 18%; height: 100%; background: #a2dbc0;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title" style="margin-bottom: 16px;">Dietary Distribution</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f6faf7; border-radius: 8px;">
              <strong>Vegetarian Meal</strong>
              <span class="badge-status out-for-delivery">62% (154 Students)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f6faf7; border-radius: 8px;">
              <strong>Non-Veg Meal</strong>
              <span class="badge-status packed">18% (45 Students)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f6faf7; border-radius: 8px;">
              <strong>Gluten-Free & Special Diets</strong>
              <span class="badge-status preparing">12% (30 Students)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f6faf7; border-radius: 8px;">
              <strong>Jain (No Onion/Garlic)</strong>
              <span class="badge-status delivered">8% (19 Students)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  // 11. SETTINGS PAGE
  settings() {
    const data = AdminStore.loadData() || AdminStore.init();
    const conf = data.settings || {};

    const html = `
      <div class="page-header-row">
        <div class="page-title-group">
          <h1>Admin Settings & Operations</h1>
          <p>Configure kitchen schedule, delivery cutoffs, and system notifications.</p>
        </div>
        <div class="page-actions">
          <button class="btn-primary" onclick="AdminPages.saveSettings()">
            ${AdminIcons.check}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px;">
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 18px;">Kitchen & Delivery Operational Timings</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label>Central Kitchen Name</label>
              <input type="text" class="form-control" id="sSchoolName" value="${conf.schoolName || 'SchoolBite Central Kitchen & Network'}">
            </div>
            <div class="form-group">
              <label>Daily Cooking Operations Window</label>
              <input type="text" class="form-control" id="sKitchenHours" value="${conf.kitchenHours || '05:30 AM - 04:00 PM'}">
            </div>
            <div class="form-group">
              <label>Parent Daily Cutoff Time (Order / Pause / Cancel)</label>
              <input type="text" class="form-control" id="sDeliveryCutoff" value="${conf.deliveryCutoff || '07:30 AM Daily'}">
            </div>
            <div class="form-group">
              <label>Admin Support Email</label>
              <input type="email" class="form-control" id="sSupportEmail" value="${conf.supportEmail || 'care@schoolbite.com'}">
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title" style="margin-bottom: 18px;">System Preferences & Alerts</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: var(--green); width: 18px; height: 18px;">
              <span>Auto-dispatch delivery batches to drivers</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: var(--green); width: 18px; height: 18px;">
              <span>Send SMS alert to parents upon school arrival</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: var(--green); width: 18px; height: 18px;">
              <span>Generate automated weekly financial digests</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: var(--green); width: 18px; height: 18px;">
              <span>Cross-dashboard localStorage synchronization</span>
            </label>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pageContent').innerHTML = html;
  },

  saveSettings() {
    AdminShell.toast('Settings saved successfully!');
  }
};

window.AdminPages = AdminPages;
