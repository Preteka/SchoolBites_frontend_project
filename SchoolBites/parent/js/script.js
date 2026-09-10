/**
 * SchoolBite - Main Interaction Controller (script.js)
 * Handles Mobile Nav, Light/Dark Theme Persistence, Scroll Reveal, Number Counters,
 * Meal Selection, FAQ Accordion, Form Validation, Modal Dialogs, and Toast Feedback.
 * Vanilla JavaScript - Zero Libraries.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Common Layout Components (Header, Footer, Modals)
  initLayoutComponents();

  if (window.SchoolBiteComponents && typeof window.SchoolBiteComponents.initHeaderInteractions === 'function') {
    window.SchoolBiteComponents.initHeaderInteractions();
  }

  // 2. Initialize Theme Management
  initTheme();
  initThemeSelectors();

  // 3. Initialize Mobile Navigation
  initMobileNav();

  // 4. Initialize Scroll Reveal Animations
  initScrollReveal();

  // 5. Initialize Statistic Number Counters
  initNumberCounters();

  // 6. Initialize Modals and Auth Forms
  initModals();

  // 7. Initialize Services Grid
  initServices();

  // 8. Initialize Meal Selection & Day Filter
  initMealCatalog();

  // 8. Initialize Dynamic Pricing Toggles
  initPricingToggle();

  // 9. Initialize FAQ Accordions
  initFAQAccordion();

  // 10. Initialize Blog Filter & Search
  initBlogInteractions();

  // 11. Initialize Form Validations (Contact, Profile, Settings)
  initFormValidations();

  // 12. Initialize Settings Tabs
  initSettingsTabs();

  // 13. Initialize Weekly Preview Widget (Home 1)
  initWeeklyPreview();

  // 14. Initialize Navigation Dropdowns
  initNavDropdowns();
});

/**
 * Automatically injects the unified header, footer, and auth modals
 * into placeholder elements on every page.
 */
function initLayoutComponents() {
  const headerMount = document.getElementById('site-header-mount');
  const footerMount = document.getElementById('site-footer-mount');
  const modalsMount = document.getElementById('site-modals-mount');

  // Detect current page filename from window.location.pathname
  const path = window.location.pathname;
  let activePage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  if (!activePage.endsWith('.html')) activePage = 'index.html';

  if (headerMount && window.SchoolBiteComponents) {
    headerMount.innerHTML = window.SchoolBiteComponents.renderHeader(activePage);
  }

  if (footerMount && window.SchoolBiteComponents) {
    footerMount.innerHTML = window.SchoolBiteComponents.renderFooter();
  }

  if (modalsMount && window.SchoolBiteComponents) {
    modalsMount.innerHTML = window.SchoolBiteComponents.renderAuthModals();
  }
}

/**
 * 2. Theme Management: Light / Dark Mode with localStorage persistence
 */
function applySiteTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function initTheme() {
  const THEME_KEY = 'schoolbite_theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = savedTheme || 'dark';

  applySiteTheme(initialTheme);

  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#theme-toggle-btn');
    if (toggleBtn) {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applySiteTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    }
  });
}

function initThemeSelectors() {
  const themeOptions = document.querySelectorAll('[data-theme-option]');
  if (!themeOptions.length) return;

  const syncThemeOptions = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    themeOptions.forEach(option => {
      option.checked = option.value === currentTheme;
    });
  };

  syncThemeOptions();

  themeOptions.forEach(option => {
    option.addEventListener('change', () => {
      const selectedTheme = option.value;
      applySiteTheme(selectedTheme);
      localStorage.setItem('schoolbite_theme', selectedTheme);
      showToast(`Switched to ${selectedTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      syncThemeOptions();
    });
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNav() {
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('#mobile-menu-toggle');
    const closeBtn = e.target.closest('#close-mobile-menu');
    const backdrop = e.target.closest('#drawer-backdrop');
    const drawer = document.getElementById('mobile-drawer');
    const backdropEl = document.getElementById('drawer-backdrop');

    if (openBtn && drawer && backdropEl) {
      drawer.classList.add('open');
      backdropEl.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    if ((closeBtn || backdrop) && drawer && backdropEl) {
      drawer.classList.remove('open');
      backdropEl.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      const toggle = document.getElementById('mobile-menu-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('mobile-drawer');
      const backdropEl = document.getElementById('drawer-backdrop');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        backdropEl.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

/**
 * Navigation Dropdown Controller (Hover, Click, Keyboard)
 */
function initNavDropdowns() {
  document.addEventListener('click', (e) => {
    const dropdownToggle = e.target.closest('.has-dropdown > .nav-link');
    const allDropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    if (dropdownToggle) {
      const parentItem = dropdownToggle.closest('.nav-item.has-dropdown');
      const isAlreadyOpen = parentItem.classList.contains('is-open');

      // If clicked on dropdown toggle icon or on mobile/touch, toggle open state
      if (e.target.closest('.nav-chevron-icon') || window.innerWidth <= 1200) {
        e.preventDefault();
        allDropdownItems.forEach(item => {
          if (item !== parentItem) item.classList.remove('is-open');
        });
        parentItem.classList.toggle('is-open', !isAlreadyOpen);
      }
    } else if (!e.target.closest('.nav-item.has-dropdown')) {
      allDropdownItems.forEach(item => item.classList.remove('is-open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item.has-dropdown').forEach(item => item.classList.remove('is-open'));
    }
  });
}

/**
 * 4. IntersectionObserver Scroll Reveal
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Check prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/**
 * 5. Statistic Number Counters
 */
function initNumberCounters() {
  const statValues = document.querySelectorAll('.stat-value');
  if (!statValues.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNumber = parseFloat(el.getAttribute('data-target') || el.innerText.replace(/[^0-9.]/g, ''));
        const isDecimal = String(targetNumber).includes('.');
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetNumber * easeOut;

          el.innerText = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString('en-IN');

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.innerText = isDecimal ? targetNumber.toFixed(1) : targetNumber.toLocaleString('en-IN');
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statValues.forEach(el => observer.observe(el));
}

/**
 * 6. Interactive Modals (Login, Sign-Up, Add Child)
 */
function initModals() {
  // Open modal via data-modal-target
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      e.preventDefault();
      if (trigger.hasAttribute('data-dashboard-cta') && window.SchoolBiteAuth && SchoolBiteAuth.isLoggedIn()) {
        if (SchoolBiteAuth.isPaid()) window.location.href = 'dashboard/dashboard.html';
        else SchoolBiteAuth.continueSubscription();
        return;
      }
      const planId = trigger.getAttribute('data-plan-id');
      const planCycle = trigger.getAttribute('data-plan-cycle');
      if (planId) {
        localStorage.setItem('schoolbite_pending_plan', decodeURIComponent(planId));
        if (planCycle) localStorage.setItem('schoolbite_pending_cycle', decodeURIComponent(planCycle));
        if (window.SchoolBiteAuth && SchoolBiteAuth.isLoggedIn()) {
          if (SchoolBiteAuth.isPaid()) {
            window.location.href = 'dashboard/dashboard.html';
          } else {
            SchoolBiteAuth.continueSubscription(decodeURIComponent(planId), planCycle && decodeURIComponent(planCycle));
          }
          return;
        }
      }
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    }

    const continueSubscription = e.target.closest('[data-continue-subscription]');
    if (continueSubscription && window.SchoolBiteAuth) {
      e.preventDefault();
      SchoolBiteAuth.continueSubscription();
      return;
    }

    const passwordToggle = e.target.closest('[data-toggle-password]');
    if (passwordToggle) {
      const input = document.getElementById(passwordToggle.getAttribute('data-toggle-password'));
      if (input) {
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        passwordToggle.textContent = showing ? 'Show password' : 'Hide password';
      }
    }

    // Close modal via data-close-modal
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      e.preventDefault();
      const modal = closeBtn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    }

    // Switch between Login and Signup modals
    const switchBtn = e.target.closest('[data-switch-modal]');
    if (switchBtn) {
      e.preventDefault();
      const currentModal = switchBtn.closest('.modal-backdrop');
      const targetModalId = switchBtn.getAttribute('data-switch-modal');
      if (currentModal) closeModal(currentModal);
      setTimeout(() => openModal(targetModalId), 150);
    }

    // Click outside modal dialog to close
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target);
    }
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-backdrop.open');
      if (openModalEl) closeModal(openModalEl);
    }
  });

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * 7. Services Grid Dynamic Generator
 */
function initServices() {
  const container = document.getElementById('services-container');
  if (!container || !window.SCHOOLBITE_DATA || !window.SchoolBiteComponents) return;

  container.innerHTML = window.SCHOOLBITE_DATA.services.map(s => 
    window.SchoolBiteComponents.createServiceCard(s)
  ).join('');
}

/**
 * 8. Meal Selection and Day Filter Logic
 */
function initMealCatalog() {
  const mealsContainer = document.getElementById('meals-container');
  if (!mealsContainer || !window.SCHOOLBITE_DATA || !window.SchoolBiteComponents) return;

  // On Home Page explore meals section, exclude Thursday and Friday meals from displaying
  const allMeals = (window.SCHOOLBITE_DATA.meals || []).filter(m => {
    const day = (m.day || '').toLowerCase();
    return day !== 'thursday' && day !== 'friday';
  });
  let activeDay = 'All';
  const selectedMeals = new Set(JSON.parse(localStorage.getItem('schoolbite_selected_meals') || '[]'));

  // Initial render for active day
  renderMealsForDay(activeDay);

  // Day Filter Button Clicks
  const filterBtns = document.querySelectorAll('.btn-filter-day');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDay = btn.getAttribute('data-day');
      renderMealsForDay(activeDay);
    });
  });

  function renderMealsForDay(day) {
    const filtered = (day === 'All') 
      ? allMeals 
      : allMeals.filter(m => m.day.toLowerCase() === day.toLowerCase());

    mealsContainer.innerHTML = filtered.map(meal => 
      window.SchoolBiteComponents.createMealCard(meal, {
        isSelected: selectedMeals.has(meal.id)
      })
    ).join('');
  }

  // Meal Selection Button Click
  document.addEventListener('click', (e) => {
    const selectBtn = e.target.closest('[data-action="toggle-meal-selection"]');
    if (!selectBtn) return;

    e.preventDefault();
    const mealId = selectBtn.getAttribute('data-meal-id');
    const card = selectBtn.closest('.meal-card');
    const mealObj = allMeals.find(m => m.id === mealId);

    if (selectedMeals.has(mealId)) {
      selectedMeals.delete(mealId);
      selectBtn.classList.remove('selected');
      if (card) card.classList.remove('is-selected');
      showToast(`Removed "${mealObj ? mealObj.name : 'Meal'}" from selection.`, 'info');
    } else {
      selectedMeals.add(mealId);
      selectBtn.classList.add('selected');
      if (card) card.classList.add('is-selected');
      showToast(`Added "${mealObj ? mealObj.name : 'Meal'}" to this week's schedule!`, 'success');
    }

    localStorage.setItem('schoolbite_selected_meals', JSON.stringify(Array.from(selectedMeals)));
  });
}

/**
 * 8. Pricing Billing Frequency Toggle (Monthly vs Term)
 */
function initPricingToggle() {
  const toggleBtn = document.getElementById('pricing-term-toggle');
  const pricingContainer = document.getElementById('pricing-container');
  if (!toggleBtn || !pricingContainer || !window.SCHOOLBITE_DATA || !window.SchoolBiteComponents) return;

  let currentCycle = 'monthly';

  // Render initial pricing cards
  renderPricing(currentCycle);

  toggleBtn.addEventListener('click', () => {
    currentCycle = currentCycle === 'monthly' ? 'term' : 'monthly';
    toggleBtn.classList.toggle('is-term', currentCycle === 'term');

    // Update label classes
    const monthlyLabel = document.getElementById('label-monthly');
    const termLabel = document.getElementById('label-term');
    if (monthlyLabel) monthlyLabel.classList.toggle('active', currentCycle === 'monthly');
    if (termLabel) termLabel.classList.toggle('active', currentCycle === 'term');

    renderPricing(currentCycle);
  });

  function renderPricing(cycle) {
    const plans = window.SCHOOLBITE_DATA.pricingPlans;
    pricingContainer.innerHTML = plans.map(p => 
      window.SchoolBiteComponents.createPricingCard(p, cycle)
    ).join('');
  }
}

/**
 * 9. FAQ Accordion Behavior
 */
function initFAQAccordion() {
  const faqContainer = document.getElementById('faq-container');
  if (faqContainer && window.SCHOOLBITE_DATA && window.SchoolBiteComponents) {
    faqContainer.innerHTML = window.SCHOOLBITE_DATA.faqs.map((faq, i) => 
      window.SchoolBiteComponents.createFAQItem(faq, i)
    ).join('');
  }

  document.addEventListener('click', (e) => {
    const questionBtn = e.target.closest('.faq-question-btn');
    if (!questionBtn) return;

    const faqItem = questionBtn.closest('.faq-item');
    const answerPanel = faqItem.querySelector('.faq-answer-panel');
    const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

    // Close other expanded items for a neat accordion experience
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('is-expanded');
        const btn = item.querySelector('.faq-question-btn');
        const panel = item.querySelector('.faq-answer-panel');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      }
    });

    // Toggle current
    if (isExpanded) {
      faqItem.classList.remove('is-expanded');
      questionBtn.setAttribute('aria-expanded', 'false');
      answerPanel.hidden = true;
    } else {
      faqItem.classList.add('is-expanded');
      questionBtn.setAttribute('aria-expanded', 'true');
      answerPanel.hidden = false;
    }
  });
}

/**
 * 10. Blog Filter & Live Search
 */
function initBlogInteractions() {
  const blogContainer = document.getElementById('blog-grid-container');
  const searchInput = document.getElementById('blog-search-input');
  const categoryTabs = document.querySelectorAll('.btn-blog-category');

  if (!blogContainer || !window.SCHOOLBITE_DATA || !window.SchoolBiteComponents || window.SCHOOLBITE_BLOGS) return;

  const allPosts = window.SCHOOLBITE_DATA.blogPosts;
  let activeCategory = 'All';
  let searchQuery = '';

  function renderBlogs() {
    let filtered = allPosts;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      blogContainer.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
          <p style="font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 1rem;">No articles found matching your criteria.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-blog-filter">Clear Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-blog-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'All';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          categoryTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'All'));
          renderBlogs();
        });
      }
      return;
    }

    blogContainer.innerHTML = filtered.map(post => 
      window.SchoolBiteComponents.createBlogCard(post)
    ).join('');
  }

  // Initial render
  renderBlogs();

  // Category click
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      renderBlogs();
    });
  });

  // Search input with debounce
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = e.target.value;
        renderBlogs();
      }, 250);
    });
  }
}

/**
 * 11. Form Validation with real-time feedback
 */
function initFormValidations() {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = contactForm.querySelector('#contact-name');
      const email = contactForm.querySelector('#contact-email');
      const phone = contactForm.querySelector('#contact-phone');
      const school = contactForm.querySelector('#contact-school');
      const message = contactForm.querySelector('#contact-message');

      if (!validateField(name, name.value.trim().length >= 2, 'Please enter your full name (at least 2 characters)')) isValid = false;
      if (!validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Please enter a valid email address')) isValid = false;
      if (!validateField(phone, /^[0-9+\-\s]{8,15}$/.test(phone.value.trim()), 'Please enter a valid phone number')) isValid = false;
      if (!validateField(school, school.value.trim().length >= 3, 'Please enter the school or institution name')) isValid = false;
      if (!validateField(message, message.value.trim().length >= 10, 'Please write a message with at least 10 characters')) isValid = false;

      if (isValid) {
        showToast('Thank you! Your inquiry has been sent to our school partnership team.', 'success');
        contactForm.reset();
        clearFieldErrors(contactForm);
      }
    });
  }

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const email = loginForm.querySelector('#login-email');
      const password = loginForm.querySelector('#login-password');

      if (!validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Enter a valid email address')) isValid = false;
      if (!validateField(password, password.value.length >= 6, 'Password must be at least 6 characters')) isValid = false;

      if (isValid) {
        const result = window.SchoolBiteAuth ? SchoolBiteAuth.login(email.value, password.value) : { ok: false, message: 'Authentication is unavailable.' };
        if (!result.ok) {
          validateField(password, false, result.message);
          return;
        }
        const pendingPlan = localStorage.getItem('schoolbite_pending_plan');

        showToast('Logged in successfully! Redirecting...', 'success');
        const modal = document.getElementById('login-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';

        setTimeout(() => {
          if (result.user.paymentCompleted && result.user.subscriptionActive) window.location.href = 'dashboard/dashboard.html';
          else if (pendingPlan) SchoolBiteAuth.continueSubscription(pendingPlan, localStorage.getItem('schoolbite_pending_cycle'));
          else window.location.reload();
        }, 450);
      }
    });
  }

  // Sign Up Form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const name = signupForm.querySelector('#signup-name');
      const email = signupForm.querySelector('#signup-email');
      const phone = signupForm.querySelector('#signup-phone');
      const password = signupForm.querySelector('#signup-password');
      const passwordConfirm = signupForm.querySelector('#signup-password-confirm');

      if (!validateField(name, name.value.trim().length >= 2, 'Please enter your full name')) isValid = false;
      if (!validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Enter a valid email address')) isValid = false;
      if (!validateField(phone, /^[0-9+\-\s]{8,15}$/.test(phone.value.trim()), 'Enter a valid phone number for SMS alerts')) isValid = false;
      if (!validateField(password, password.value.length >= 8, 'Password must be at least 8 characters')) isValid = false;
      if (!validateField(passwordConfirm, passwordConfirm.value === password.value, 'Passwords do not match')) isValid = false;

      if (isValid) {
        const result = window.SchoolBiteAuth ? SchoolBiteAuth.signup({ name: name.value.trim(), email: email.value.trim(), phone: phone.value.trim(), password: password.value }) : { ok: false, message: 'Account creation is unavailable.' };
        if (!result.ok) {
          validateField(email, false, result.message);
          return;
        }

        showToast('Account created! Welcome to SchoolBite!', 'success');
        const modal = document.getElementById('signup-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';

        setTimeout(() => { window.location.href = 'pricing.html'; }, 450);
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-public-logout]')) {
      if (window.SchoolBiteAuth) SchoolBiteAuth.logout();
      window.location.reload();
    }
  });

  // Add Child Form (Profile page)
  const addChildForm = document.getElementById('add-child-form');
  if (addChildForm) {
    addChildForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const childName = addChildForm.querySelector('#child-fullname');
      const childSchool = addChildForm.querySelector('#child-school-select');
      const childGrade = addChildForm.querySelector('#child-grade');

      if (!validateField(childName, childName.value.trim().length >= 2, 'Enter child’s name')) isValid = false;
      if (!validateField(childSchool, childSchool.value !== '', 'Please select a school')) isValid = false;
      if (!validateField(childGrade, childGrade.value.trim() !== '', 'Enter grade/class')) isValid = false;

      if (isValid) {
        showToast(`Child "${childName.value}" added to your account!`, 'success');
        const modal = document.getElementById('add-child-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
        addChildForm.reset();
      }
    });
  }

  function validateField(inputEl, condition, errorMessage) {
    if (!inputEl) return true;
    const errorEl = document.getElementById(`${inputEl.id}-error`) || inputEl.closest('.form-group').querySelector('.form-error-text');
    
    if (!condition) {
      inputEl.classList.add('is-invalid');
      if (errorEl) errorEl.innerText = errorMessage;
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      if (errorEl) errorEl.innerText = '';
      return true;
    }
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.form-control').forEach(ctrl => ctrl.classList.remove('is-invalid'));
    form.querySelectorAll('.form-error-text').forEach(err => err.innerText = '');
  }
}

/**
 * 12. Settings Page Tab Switching
 */
function initSettingsTabs() {
  const tabBtns = document.querySelectorAll('.settings-tab-btn');
  const tabPanels = document.querySelectorAll('.settings-tab-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Settings Save Buttons toast confirmation
  const settingsForms = document.querySelectorAll('.settings-form');
  settingsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Settings saved successfully!', 'success');
    });
  });
}

/**
 * 13. Home 1 Weekly Meal Preview Interactive Widget
 */
function initWeeklyPreview() {
  const widgetContainer = document.getElementById('weekly-preview-container');
  if (!widgetContainer || !window.SCHOOLBITE_DATA || !window.SchoolBiteComponents) return;

  const dayTabs = document.querySelectorAll('.btn-preview-day');
  const previewCardMount = document.getElementById('preview-meal-card-mount');

  function renderPreview(day) {
    const meal = window.SCHOOLBITE_DATA.meals.find(m => m.day.toLowerCase() === day.toLowerCase()) || window.SCHOOLBITE_DATA.meals[0];
    if (previewCardMount) {
      previewCardMount.innerHTML = window.SchoolBiteComponents.createMealCard(meal);
    }
  }

  renderPreview('Monday');

  dayTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      dayTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.getAttribute('data-day');
      renderPreview(day);
    });
  });
}

/**
 * Toast Notification Helper
 * @param {string} message - text message
 * @param {string} type - 'success', 'info', or 'error'
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = (type === 'success') 
    ? window.SchoolBiteComponents.getSvgIcon('check-circle', 'toast-icon') 
    : window.SchoolBiteComponents.getSvgIcon('sparkles', 'toast-icon');

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Make showToast available globally
window.showToast = showToast;
