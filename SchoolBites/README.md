# 🥗 SchoolBite — Healthy School Lunches & Meal Management Platform

> **SchoolBite** is a modern, responsive web application connecting parents, schools, and central kitchen operations for wholesome, nutritionist-approved school meal deliveries.

---

## 🔑 Demo Access & Login Credentials

You can test both the **Parent Experience** and the **Admin Operations Dashboard** using the pre-configured credentials below:

### 👑 1. Admin Portal (Kitchen & Operations)
| Field | Credential Details |
| :--- | :--- |
| **Portal URL** | [`admin/dashboard.html`](admin/dashboard.html) |
| **Admin Email** | `admin@schoolbite.in` |
| **Admin Password** | `Admin@SchoolBite2026` |
| **Role & Access** | **Super Administrator** (Full access to all 11 management modules) |

---

### 👨‍👩‍👧 2. Parent Portal & Dashboard
| Field | Credential Details |
| :--- | :--- |
| **Landing Page** | [`parent/index.html`](parent/index.html) |
| **Parent Login** | [`parent/login.html`](parent/login.html) |
| **Direct Dashboard**| [`parent/dashboard/dashboard.html`](parent/dashboard/dashboard.html) |
| **Sample Email** | `parent@schoolbite.in` *(or `preteka@example.com`)* |
| **Sample Password** | `Password@123` |
| **Role & Access** | **Enrolled Parent** (Manage children, meal selections, delivery tracking, and payments) |

---

## 🚀 Getting Started & How to Run

SchoolBite is built with pure, modern **HTML5**, **Vanilla CSS3**, and **JavaScript (ES6)**. It has **zero build dependencies** and runs seamlessly offline or online.

### Option A: Direct Browser Preview (Zero Setup)
Simply double-click or open any HTML file in your favorite modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari):
- **Admin Dashboard:** Double-click [`admin/dashboard.html`](admin/dashboard.html)
- **Parent Website:** Double-click [`parent/index.html`](parent/index.html)

### Option B: Local Web Server (Recommended)
You can serve the repository using any local development server:

```bash
# Using VS Code Live Server extension:
Right-click on parent/index.html or admin/dashboard.html -> "Open with Live Server"

# Using Python 3:
python -m http.server 8000
# Then visit: http://localhost:8000/parent/ or http://localhost:8000/admin/

# Using Node.js npx serve:
npx serve .
```

---

## 📁 Repository Structure & Modules

```
SchoolBites/
├── README.md                      # Complete documentation & credentials
├── admin/                         # SchoolBite Admin Operations Portal
│   ├── css/
│   │   └── admin.css              # Admin design tokens, sidebar & responsive grid styles
│   ├── js/
│   │   ├── admin-common.js        # Shared modal handlers, profile dropdowns & toasts
│   │   └── admin-sidebar.js       # Reusable responsive navigation sidebar generator
│   ├── dashboard.html             # Live metrics, delivery status table & quick actions
│   ├── children.html              # School student enrollment records & allergy flags
│   ├── parents.html               # Parent contact directory & linked subscription cards
│   ├── subscriptions.html         # Term, monthly & annual plan renewal ledger
│   ├── meals.html                 # Food recipe catalog with macro-nutrition breakdowns
│   ├── orders.html                # Daily transaction ledger & receipt downloads
│   ├── delivery.html              # Fleet route tracking & temperature monitoring
│   ├── menu.html                  # 5-Day weekly rotational meal planner
│   ├── notifications.html         # Broadcast announcement center & emergency allergy alerts
│   ├── reports.html               # Revenue SVG charts & school campus SLA audit breakdown
│   └── settings.html              # Kitchen cutoffs, Razorpay GST, staff roles & backups
│
└── parent/                        # SchoolBite Parent Public Website & Dashboard
    ├── assets/                    # High-resolution meal photos, logos & vectors
    ├── css/                       # Parent website stylesheets
    ├── js/                        # Public navigation, auth and store scripts
    ├── index.html                 # Public landing page with meal plans & chef highlights
    ├── about.html                 # Brand story, nutrition philosophy & team
    ├── services.html              # School meal delivery service overview
    ├── pricing.html               # Subscription pricing tiers (Monthly/Term/Annual)
    ├── contact.html               # Helpdesk & parent inquiry form
    ├── login.html                 # User authentication with tabbed sign-in/sign-up
    ├── subscription-setup.html    # Step-by-step onboarding wizard for children & diets
    ├── payment.html               # Checkout gateway simulator (UPI, Card, NetBanking)
    ├── payment-success.html       # Order confirmation & instant receipt receipt
    └── dashboard/                 # Parent Management Web App
        ├── css/                   # Dashboard stylesheets & decorative typography
        ├── js/                    # LocalStorage persistence & real-time UI state
        ├── dashboard.html         # Parent home summary with daily meal preview
        ├── children.html          # My Children profiles & dietary preferences
        ├── menu.html              # Interactive weekly meal selection calendar
        ├── subscriptions.html     # Active meal plan management & pause/resume
        ├── payments.html          # Invoices & billing history
        ├── delivery.html          # Live step-by-step lunch delivery tracker
        ├── notifications.html     # Kitchen updates & menu reminders
        └── settings.html          # Parent profile details, theme switcher & contact prefs
```

---

## 🌟 Key Platform Features

### 1. 🛡️ Food Safety & High-Risk Allergy Management
- Medical-grade dietary tags (Pure Vegetarian, Egg/Non-Veg, Jain, Vegan, Gluten-Free).
- Severe allergy safety badges (e.g., Peanut, Tree Nut, Lactose) that trigger alerts directly on the admin delivery dispatch and kitchen prep boxes.

### 2. 📅 5-Day Weekly Rotational Menu Planner
- Balanced menus designed by nutritionists with complete calorie and macro splits (Protein, Carbs, Fats).
- Parents can preview meals for Monday through Friday and customize lunch choices prior to daily cutoff times (08:00 AM).

### 3. 🚚 Fleet Tracking & Cafeteria Delivery SLAs
- 5 designated school routes (Delhi Public School, Ryan International, Oakridge International, St. Mary's Convent, Heritage Valley).
- Insulated hot-box temperature monitoring (maintained at ~68°C) and automated delivery confirmation alerts to parents.

### 4. 📢 Broadcast & Urgent Announcement Center
- Admin can instantly broadcast messages to all parents, specific schools, or targeted dietary groups.
- Multi-channel dispatch options (In-App Push, WhatsApp, and SMS).

### 5. 📊 Operational Analytics & Audit Reports
- Interactive SVG vector revenue trend charts.
- Campus-wise delivery SLA compliance audit table with CSV and PDF export options.

---

## 🎨 Design System & Typography

- **Brand Colors:**
  - `Forest Green (#075b46)` — Primary brand color representing health & freshness
  - `Emerald (#15966e)` — Vibrant accent for active badges & progress states
  - `Warm Saffron (#f4a340)` — Secondary accent for highlights & notifications
  - `Light Sage (#e8f3e8 / #f4f8f5)` — Clean, eye-friendly background canvas
- **Typography:**
  - **Headings:** `'Sora', sans-serif` (Modern, geometric, friendly)
  - **Body Copy:** `'DM Sans', sans-serif` (Clean, highly legible)
  - **Decorative Branded Script:** `'Caveat', cursive` (`.schoolbite-decorative-text` for *"Healthy kids, happier tomorrows"* & *"Growing healthy, growing happy"*)
- **Responsive Layout:**
  - **Desktop (≥ 1280px):** Multi-column dashboard grids with persistent sidebar.
  - **Tablet (700px – 1024px):** Adaptive 2-column grids and scrollable navigation tabs.
  - **Mobile (< 700px):** Off-canvas slide-out hamburger navigation, touch-friendly tap targets, and horizontal scroll tables.

---

## 📞 Support & Contact

- **Helpline:** +91 98765 43210
- **Email:** `support@schoolbite.in`
- **Location:** New Delhi, India
- **Operating Hours:** Monday – Saturday, 06:00 AM – 06:00 PM IST
