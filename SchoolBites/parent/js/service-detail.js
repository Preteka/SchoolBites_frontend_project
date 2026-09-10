/**
 * SchoolBite — Service Detail Controller (service-detail.js)
 * Reads URL ?service= param, populates the one reusable HTML template
 * with the correct content from services-data.js.
 * Handles: animations, prev/next nav, 404 state, testimonials carousel.
 */

/* --------------------------------------------------
   SVG icon map (mirrors components.js subset)
-------------------------------------------------- */
const SD_ICONS = {
  'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  'shield-check':  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'truck':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  'flame':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  'award':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'heart':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  'box':           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  'user':          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  'calendar':      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  'refresh-cw':    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  'sparkles':      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  'dollar-sign':   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 0-9H6"/></svg>`,
  'rupee':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 0-9H6"/></svg>`,
  'shield':        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  'clock':         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'edit-3':        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  'arrow-right':   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  'arrow-left':    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  'star':          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  'alert-circle':  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  'chevron-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  'leaf':          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
};

function sdIcon(name, cls = '') {
  const svg = SD_ICONS[name] || SD_ICONS['sparkles'];
  return svg.replace('<svg', `<svg class="${cls}" aria-hidden="true"`);
}

/* --------------------------------------------------
   Decorative leaf SVG helper
-------------------------------------------------- */
function leafSvg(fill = '#4CAF50', opacity = 0.75) {
  return `<svg viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 68 C12 50, 2 30, 6 12 C10 0, 24 0, 36 10 C46 18, 42 44, 24 68Z" fill="${fill}" opacity="${opacity}"/>
    <path d="M24 68 C24 42, 21 24, 18 10" stroke="#a8d9b8" stroke-width="1.5" fill="none" opacity="0.5"/>
  </svg>`;
}

/* --------------------------------------------------
   Main init
-------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const params  = new URLSearchParams(window.location.search);
  const key     = params.get('service') || '';
  const service = SERVICES_DETAIL_DATA[key];

  if (!service) {
    showNotFound(key);
    return;
  }

  populatePage(service);
  buildPrevNext(key);
  initScrollReveal();
  initTestimonialCarousel();
  updatePageMeta(service);
});

/* --------------------------------------------------
   Page meta
-------------------------------------------------- */
function updatePageMeta(s) {
  document.title = `${s.title} — SchoolBite`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', s.heroDescription);
}

/* --------------------------------------------------
   404 state
-------------------------------------------------- */
function showNotFound(key) {
  const main = document.getElementById('sd-main');
  if (!main) return;
  main.innerHTML = `
    <div class="container">
      <div class="sd-not-found reveal">
        <div class="sd-not-found-icon">${sdIcon('alert-circle')}</div>
        <h2>Service Not Found</h2>
        <p>${key ? `"${key}" is not a valid service.` : 'No service was specified.'} Please return to the Services page and choose a valid service.</p>
        <a href="services.html" class="sd-btn-primary" style="display:inline-flex;margin:0 auto;">
          ${sdIcon('arrow-left')} View All Services
        </a>
      </div>
    </div>`;
  initScrollReveal();
}

/* --------------------------------------------------
   Main population
-------------------------------------------------- */
function populatePage(s) {
  setBreadcrumb(s);
  buildHero(s);
  buildBenefits(s);
  buildOverview(s);
  buildSteps(s);
  buildHighlight(s);
  buildTestimonials();
  buildCTA(s);
}

/* Breadcrumb */
function setBreadcrumb(s) {
  const el = document.getElementById('sd-breadcrumb-service');
  if (el) el.textContent = s.title;
}

/* Hero */
function buildHero(s) {
  // Eyebrow
  setText('sd-hero-eyebrow-text', s.category);
  // Title
  const titleEl = document.getElementById('sd-hero-title');
  if (titleEl) {
    titleEl.innerHTML = `${escHtml(s.heroTitle)}<br><span class="sd-orange">${escHtml(s.heroTitleHighlight)}</span>`;
  }
  // Desc
  setText('sd-hero-desc', s.heroDescription);
  // Image
  setImg('sd-hero-img', s.heroImage, s.heroImageAlt, s.heroImageFallback);
  // Highlights
  const hlWrap = document.getElementById('sd-hero-highlights');
  if (hlWrap) {
    hlWrap.innerHTML = s.heroHighlights.map(h => `
      <div class="sd-highlight-pill">
        ${sdIcon(h.icon)}
        <span>${escHtml(h.label)}</span>
      </div>`).join('');
  }
  // Floating cards
  const fcWrap = document.getElementById('sd-float-cards');
  if (fcWrap) {
    fcWrap.innerHTML = s.floatingCards.map(c => `
      <div class="sd-float-card">
        <div class="sd-fc-icon">${sdIcon(c.icon)}</div>
        <div class="sd-fc-text">
          <div class="sd-fc-line1">${escHtml(c.line1)}</div>
          <div class="sd-fc-line2">${escHtml(c.line2)}</div>
        </div>
      </div>`).join('');
  }
}

/* Benefits */
function buildBenefits(s) {
  setText('sd-benefits-label', s.benefitsLabel);
  setText('sd-benefits-title', s.benefitsTitle);
  setText('sd-benefits-desc',  s.benefitsDesc);
  const grid = document.getElementById('sd-benefits-grid');
  if (grid) {
    grid.innerHTML = s.benefits.map((b, i) => `
      <div class="sd-benefit-card reveal" style="transition-delay:${i * 0.08}s">
        <div class="sd-benefit-icon">${sdIcon(b.icon)}</div>
        <div class="sd-benefit-title">${escHtml(b.title)}</div>
        <div class="sd-benefit-desc">${escHtml(b.desc)}</div>
      </div>`).join('');
  }
}

/* Overview */
function buildOverview(s) {
  setText('sd-overview-label',  s.overviewLabel);
  setText('sd-overview-title',  s.overviewTitle);
  setText('sd-overview-text',   s.overviewText);
  setImg('sd-overview-img', s.overviewImage, s.overviewImageAlt, s.overviewImageFallback);
  const hw = document.getElementById('sd-overview-handwriting');
  if (hw) hw.textContent = s.overviewHandwriting.replace(/\\n/g, '\n');
  const cl = document.getElementById('sd-checklist');
  if (cl) {
    cl.innerHTML = s.checklist.map(item => `
      <li>
        <div class="sd-check-icon">${sdIcon('check')}</div>
        <span>${escHtml(item)}</span>
      </li>`).join('');
  }
}

/* Steps */
function buildSteps(s) {
  setText('sd-steps-title', s.stepsTitle);
  const grid = document.getElementById('sd-steps-grid');
  if (grid) {
    grid.innerHTML = s.steps.map((st, i) => `
      <div class="sd-step-card reveal" style="transition-delay:${i * 0.1}s">
        <div class="sd-step-num">${escHtml(st.num)}</div>
        <div class="sd-step-icon">${sdIcon(st.icon)}</div>
        <div class="sd-step-title">${escHtml(st.title)}</div>
        <div class="sd-step-desc">${escHtml(st.desc)}</div>
      </div>`).join('');
  }
}

/* Highlight */
function buildHighlight(s) {
  setText('sd-hl-label', s.highlightLabel);
  setText('sd-hl-title', s.highlightTitle);
  setText('sd-hl-desc',  s.highlightDesc);
  setImg('sd-hl-img', s.highlightImage, s.highlightImageAlt, s.highlightImageFallback || s.highlightImage);
  const hw = document.getElementById('sd-hl-handwriting');
  if (hw) hw.textContent = (s.highlightHandwriting || '').replace(/\\n/g, '\n');
  const items = document.getElementById('sd-hl-items');
  if (items) {
    items.innerHTML = s.highlightItems.map(it => `
      <div class="sd-highlight-item">
        ${sdIcon(it.icon)}
        <span>${escHtml(it.text)}</span>
      </div>`).join('');
  }
  // CTA buttons in highlight section point to pricing/contact
  const startBtn = document.getElementById('sd-hl-start-btn');
  if (startBtn) startBtn.href = 'pricing.html';
  const contactBtn = document.getElementById('sd-hl-contact-btn');
  if (contactBtn) contactBtn.href = 'contact.html';
}

/* Testimonials */
function buildTestimonials() {
  const grid = document.getElementById('sd-testimonials-grid');
  if (!grid || typeof SERVICE_TESTIMONIALS === 'undefined') return;
  grid.innerHTML = SERVICE_TESTIMONIALS.map(t => `
    <div class="sd-testimonial-card">
      <div class="sd-testimonial-stars">
        ${'<span>' + sdIcon('star') + '</span>'.repeat(t.rating)}
      </div>
      <p class="sd-testimonial-text">"${escHtml(t.text)}"</p>
      <div class="sd-testimonial-author">
        <img src="${t.avatar}" alt="${escHtml(t.name)}" class="sd-testimonial-avatar"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=e8f5e9&color=075B46&size=80'"/>
        <div>
          <div class="sd-testimonial-name">${escHtml(t.name)}</div>
          <div class="sd-testimonial-role">${escHtml(t.role)}</div>
        </div>
      </div>
    </div>`).join('');
}

/* CTA */
function buildCTA(s) {
  setText('sd-cta-title', s.ctaTitle);
  setText('sd-cta-desc',  s.ctaDesc);
  const startBtn = document.getElementById('sd-cta-start-btn');
  if (startBtn) startBtn.href = 'pricing.html';
  const contactBtn = document.getElementById('sd-cta-contact-btn');
  if (contactBtn) contactBtn.href = 'contact.html';
}

/* Prev / Next */
function buildPrevNext(key) {
  if (typeof SERVICES_ORDER === 'undefined') return;
  const idx  = SERVICES_ORDER.indexOf(key);
  const prev = idx > 0 ? SERVICES_ORDER[idx - 1] : SERVICES_ORDER[SERVICES_ORDER.length - 1];
  const next = idx < SERVICES_ORDER.length - 1 ? SERVICES_ORDER[idx + 1] : SERVICES_ORDER[0];

  const prevData = SERVICES_DETAIL_DATA[prev];
  const nextData = SERVICES_DETAIL_DATA[next];
  const nav = document.getElementById('sd-service-nav');
  if (!nav) return;

  nav.innerHTML = `
    <a href="service-detail.html?service=${prev}" class="sd-nav-link" id="sd-prev-link">
      <div class="sd-nav-arrow">${sdIcon('arrow-left')}</div>
      <div>
        <div class="sd-nav-label">Previous Service</div>
        <div class="sd-nav-name">${escHtml(prevData ? prevData.title : prev)}</div>
      </div>
    </a>
    <a href="service-detail.html?service=${next}" class="sd-nav-link sd-nav-next" id="sd-next-link">
      <div>
        <div class="sd-nav-label">Next Service</div>
        <div class="sd-nav-name">${escHtml(nextData ? nextData.title : next)}</div>
      </div>
      <div class="sd-nav-arrow">${sdIcon('arrow-right')}</div>
    </a>`;
}

/* --------------------------------------------------
   Scroll Reveal
-------------------------------------------------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

/* --------------------------------------------------
   Testimonials — simple responsive indicator
-------------------------------------------------- */
function initTestimonialCarousel() {
  // On mobile the grid stacks to 1 col; no JS carousel needed.
  // This function is a placeholder for future enhancement.
}

/* --------------------------------------------------
   Utilities
-------------------------------------------------- */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

function setImg(id, src, alt, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.alt = alt || '';
  el.src = src || fallback || '';
  if (fallback) {
    el.onerror = function() { this.onerror = null; this.src = fallback; };
  }
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
