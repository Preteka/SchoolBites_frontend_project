/**
 * SchoolBite Journal — Controller (blog.js)
 * Single-page blog experience handling:
 * - Dynamic card listing with category tabs & live search
 * - Seamless same-page article expansion and smooth view transitions
 * - Dynamic Table of Contents generation & active scroll spy
 * - Social sharing and link copy toasts
 * - Related articles navigation within the same view
 * - Deep-linking via URL parameters / hash (#blog/slug or ?blog=slug)
 */

(function () {
  'use strict';

  // SVG Icons helper
  const BLOG_ICONS = {
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
  };

  // State
  let activeCategory = 'All';
  let searchQuery = '';
  let currentArticleSlug = null;

  // DOM Elements Cache
  let listingViewEl = null;
  let detailViewEl = null;
  let blogContainerEl = null;
  let searchInputEl = null;
  let categoryTabsEl = [];

  /**
   * Helper to retrieve article data by slug or legacy ID
   */
  function getBlogData(key) {
    if (!window.SCHOOLBITE_BLOGS) return null;
    if (window.SCHOOLBITE_BLOGS[key]) return window.SCHOOLBITE_BLOGS[key];
    const mappedSlug = window.SCHOOLBITE_BLOG_MAP && window.SCHOOLBITE_BLOG_MAP[key];
    if (mappedSlug && window.SCHOOLBITE_BLOGS[mappedSlug]) return window.SCHOOLBITE_BLOGS[mappedSlug];
    return null;
  }

  /**
   * Get all blogs array
   */
  function getAllBlogs() {
    if (!window.SCHOOLBITE_BLOGS) return [];
    return Object.values(window.SCHOOLBITE_BLOGS);
  }

  /**
   * 1. Initialize Blog Controller
   */
  function init() {
    listingViewEl = document.getElementById('blog-listing-view');
    detailViewEl = document.getElementById('blog-detail-view');
    blogContainerEl = document.getElementById('blog-grid-container');
    searchInputEl = document.getElementById('blog-search-input');
    categoryTabsEl = Array.from(document.querySelectorAll('.btn-blog-category'));

    if (!blogContainerEl || !listingViewEl || !detailViewEl) return;

    setupListingInteractions();
    renderBlogListing();
    checkUrlState();

    window.addEventListener('popstate', () => {
      checkUrlState();
    });
  }

  /**
   * 2. Setup Category Filtering and Search
   */
  function setupListingInteractions() {
    // Category Tabs
    categoryTabsEl.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabsEl.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.getAttribute('data-category') || 'All';
        renderBlogListing();
      });
    });

    // Search Input
    if (searchInputEl) {
      let searchTimeout;
      searchInputEl.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          searchQuery = e.target.value;
          renderBlogListing();
        }, 200);
      });
    }

    // Spotlight Read Button
    const spotlightBtn = document.getElementById('btn-spotlight-read');
    if (spotlightBtn) {
      spotlightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openBlogDetail('brain-food');
      });
    }
  }

  /**
   * 3. Render Blog Cards in Listing View
   */
  function renderBlogListing() {
    const allBlogs = getAllBlogs();
    let filtered = allBlogs;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      blogContainerEl.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: #FFFFFF; border-radius: 16px; border: 1px dashed rgba(7,91,70,0.2);">
          <p style="font-size: 1.15rem; color: #618278; margin-bottom: 1.25rem;">No articles found matching "${escapeHtml(searchQuery)}".</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-blog-filter">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-blog-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'All';
          searchQuery = '';
          if (searchInputEl) searchInputEl.value = '';
          categoryTabsEl.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'All'));
          renderBlogListing();
        });
      }
      return;
    }

    blogContainerEl.innerHTML = filtered.map(post => createBlogCardHtml(post)).join('');

    // Attach click listeners to cards
    blogContainerEl.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = card.getAttribute('data-slug');
        if (slug) openBlogDetail(slug);
      });
    });
  }

  /**
   * 4. Generate Single Blog Card HTML
   */
  function createBlogCardHtml(post) {
    return `
      <article class="blog-card" data-slug="${post.slug}" tabindex="0" role="button" aria-label="Read article: ${escapeHtml(post.title)}">
        <div class="blog-card-image-wrap">
          <span class="badge badge-category">${escapeHtml(post.category)}</span>
          <img src="${post.image}" alt="${escapeHtml(post.title)}" class="blog-card-img" loading="lazy" />
        </div>
        <div class="blog-card-content">
          <div class="blog-meta-row">
            <span>${BLOG_ICONS.calendar} ${post.date}</span>
            <span class="meta-dot"></span>
            <span>${BLOG_ICONS.clock} ${post.readTime}</span>
          </div>
          <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="blog-card-footer">
            <span class="blog-author-name">${escapeHtml(post.author)}</span>
            <span class="btn-read-more">
              <span>Read Article</span>
              ${BLOG_ICONS.arrowRight}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * 5. Open Blog Detail on Same Page
   */
  function openBlogDetail(slug, pushState = true) {
    const data = getBlogData(slug);
    if (!data) return;

    currentArticleSlug = data.slug;

    // 1. Populate detail content
    populateDetailContent(data);

    // 2. Transition views
    listingViewEl.classList.add('blog-view-hidden');
    listingViewEl.classList.remove('blog-view-visible');

    detailViewEl.classList.remove('blog-view-hidden');
    detailViewEl.classList.add('blog-view-visible');

    // 3. Update URL hash
    if (pushState) {
      history.pushState({ blogSlug: data.slug }, '', `#blog/${data.slug}`);
    }

    // 4. Update title
    document.title = `${data.title} — SchoolBite Journal`;

    // 5. Smooth scroll to top of article
    window.scrollTo({
      top: detailViewEl.offsetTop - 80,
      behavior: 'smooth'
    });

    // 6. Setup scroll spy for Table of Contents
    setupScrollSpy();
  }

  /**
   * 6. Close Detail & Return to Listing
   */
  function closeBlogDetail(pushState = true) {
    currentArticleSlug = null;

    detailViewEl.classList.add('blog-view-hidden');
    detailViewEl.classList.remove('blog-view-visible');

    listingViewEl.classList.remove('blog-view-hidden');
    listingViewEl.classList.add('blog-view-visible');

    if (pushState) {
      history.pushState(null, '', window.location.pathname);
    }

    document.title = 'The SchoolBite Journal — Child Nutrition, Healthy Habits & School Life';

    // Scroll to listing grid
    const target = document.getElementById('blog-grid-section') || listingViewEl;
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  }

  /**
   * 7. Populate Same-Page Blog Detail Container
   */
  function populateDetailContent(data) {
    // Back Button Bar
    const backBarHtml = `
      <div class="blog-back-bar">
        <button type="button" class="btn-blog-back" id="btn-back-to-articles">
          ${BLOG_ICONS.arrowLeft}
          <span>Back to Articles</span>
        </button>
      </div>
    `;

    // Header Content
    const headerHtml = `
      <header class="article-header">
        <span class="article-category-badge">
          ${BLOG_ICONS.leaf}
          <span>${escapeHtml(data.category)}</span>
        </span>
        <h1 class="article-main-title">${escapeHtml(data.title)}</h1>
        
        <div class="article-meta-bar">
          <div class="article-author-wrap">
            <img src="${data.authorAvatar}" alt="${escapeHtml(data.author)}" class="article-author-avatar" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.author)}&background=e8f5e9&color=075B46&size=120';" />
            <div class="article-author-meta">
              <span class="article-author-name">${escapeHtml(data.author)}</span>
              <span class="article-author-role">${escapeHtml(data.authorRole)}</span>
            </div>
          </div>

          <div class="article-stats-wrap">
            <div class="article-stat-item">
              ${BLOG_ICONS.calendar}
              <span>${data.date}</span>
            </div>
            <div class="article-stat-item">
              ${BLOG_ICONS.clock}
              <span>${data.readTime}</span>
            </div>
          </div>

          <div class="article-share-group">
            <span class="article-share-label">Share:</span>
            <button type="button" class="btn-share-icon" data-share="twitter" title="Share on X (Twitter)" aria-label="Share on Twitter">${BLOG_ICONS.twitter}</button>
            <button type="button" class="btn-share-icon" data-share="facebook" title="Share on Facebook" aria-label="Share on Facebook">${BLOG_ICONS.facebook}</button>
            <button type="button" class="btn-share-icon" data-share="linkedin" title="Share on LinkedIn" aria-label="Share on LinkedIn">${BLOG_ICONS.linkedin}</button>
            <button type="button" class="btn-share-icon" data-share="copy" title="Copy Link" aria-label="Copy Article Link">${BLOG_ICONS.link}</button>
          </div>
        </div>
      </header>
    `;

    // Featured Image
    const imageHtml = `
      <div class="article-featured-image-wrap">
        <img src="${data.image}" alt="${escapeHtml(data.title)}" class="article-featured-img" />
        ${data.imageCaption ? `<div class="article-image-caption">${escapeHtml(data.imageCaption)}</div>` : ''}
      </div>
    `;

    // Highlights Box
    const highlightsHtml = data.highlights && data.highlights.length ? `
      <div class="article-highlights-card">
        <div class="article-highlights-title">
          ${BLOG_ICONS.sparkles}
          <span>Key Insights at a Glance</span>
        </div>
        <ul class="article-highlights-list">
          ${data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    // Article Sections
    const sectionsHtml = data.sections.map(sec => `
      <section id="${sec.id}" class="article-section-block">
        <h2>${escapeHtml(sec.heading)}</h2>
        <p>${escapeHtml(sec.content)}</p>
      </section>
    `).join('');

    // Quote Block
    const quoteHtml = data.quote ? `
      <blockquote class="article-blockquote">
        <p class="article-quote-text">"${escapeHtml(data.quote.text)}"</p>
        <cite class="article-quote-author">— ${escapeHtml(data.quote.author)}</cite>
      </blockquote>
    ` : '';

    // Author Bio Card
    const bioHtml = `
      <div class="article-bio-card">
        <img src="${data.authorAvatar}" alt="${escapeHtml(data.author)}" class="article-bio-avatar" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.author)}&background=e8f5e9&color=075B46&size=120';" />
        <div>
          <h4 class="article-bio-title">Written by ${escapeHtml(data.author)}</h4>
          <div class="article-bio-role">${escapeHtml(data.authorRole)}</div>
          <p class="article-bio-desc">${escapeHtml(data.author)} and our clinical pediatric board review all SchoolBite recipes and meal compositions to guarantee clinical health compliance, allergen safety, and optimal student energy.</p>
        </div>
      </div>
    `;

    // Sidebar TOC Links
    const tocLinksHtml = data.sections.map((sec, idx) => `
      <li>
        <a href="#${sec.id}" class="toc-link ${idx === 0 ? 'active' : ''}" data-target="${sec.id}">
          ${escapeHtml(sec.heading)}
        </a>
      </li>
    `).join('');

    // Sidebar Content
    const sidebarHtml = `
      <aside class="article-sidebar">
        <!-- Table of Contents Widget -->
        <div class="sidebar-widget-card">
          <div class="sidebar-widget-title">
            ${BLOG_ICONS.list}
            <span>Table of Contents</span>
          </div>
          <nav aria-label="Table of contents">
            <ul class="toc-list">
              ${tocLinksHtml}
            </ul>
          </nav>
        </div>

        <!-- Quick Facts Widget -->
        <div class="sidebar-widget-card">
          <div class="sidebar-widget-title">
            ${BLOG_ICONS.info}
            <span>Article Details</span>
          </div>
          <div class="sidebar-info-row">
            <span class="sidebar-info-lbl">Category:</span>
            <span class="sidebar-info-val">${escapeHtml(data.category)}</span>
          </div>
          <div class="sidebar-info-row">
            <span class="sidebar-info-lbl">Read Time:</span>
            <span class="sidebar-info-val">${data.readTime}</span>
          </div>
          <div class="sidebar-info-row">
            <span class="sidebar-info-lbl">Published:</span>
            <span class="sidebar-info-val">${data.date}</span>
          </div>
        </div>

        <!-- Sidebar Promo -->
        <div class="sidebar-promo-card">
          <h4 class="sidebar-promo-title">Give Your Child Wholesome Meals</h4>
          <p class="sidebar-promo-text">Fresh, dietitian-approved school tiffins delivered warm to their campus.</p>
          <a href="pricing.html" class="sidebar-promo-btn">Explore Subscriptions</a>
        </div>
      </aside>
    `;

    // Related Articles Section
    const relatedBlogs = (data.relatedSlugs || [])
      .map(slug => getBlogData(slug))
      .filter(Boolean)
      .slice(0, 3);

    const relatedHtml = relatedBlogs.length ? `
      <section class="article-related-section">
        <div class="article-related-header">
          <h3 class="article-related-title">Related Articles</h3>
          <p class="article-related-subtitle">Continue reading more evidence-backed stories and nutrition guidance.</p>
        </div>
        <div class="blogs-grid">
          ${relatedBlogs.map(b => createBlogCardHtml(b)).join('')}
        </div>
      </section>
    ` : '';

    // Assemble Full Template
    detailViewEl.innerHTML = `
      <div class="container">
        <div class="blog-detail-container">
          ${backBarHtml}
          ${headerHtml}
          ${imageHtml}
          <div class="article-body-layout">
            <div class="article-content-flow">
              <p class="article-lead-text">${escapeHtml(data.intro)}</p>
              ${highlightsHtml}
              ${sectionsHtml}
              ${quoteHtml}
              ${bioHtml}
            </div>
            ${sidebarHtml}
          </div>
          ${relatedHtml}
        </div>
      </div>
    `;

    // Attach Event Listeners to Detail Elements:
    // Back Button
    const backBtn = document.getElementById('btn-back-to-articles');
    if (backBtn) {
      backBtn.addEventListener('click', () => closeBlogDetail(true));
    }

    // TOC Smooth Scroll
    detailViewEl.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          window.scrollTo({
            top: targetEl.offsetTop - 90,
            behavior: 'smooth'
          });
        }
      });
    });

    // Social Sharing Buttons
    detailViewEl.querySelectorAll('.btn-share-icon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const shareType = btn.getAttribute('data-share');
        handleSocialShare(shareType, data);
      });
    });

    // Related Articles Click
    detailViewEl.querySelectorAll('.article-related-section .blog-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const relSlug = card.getAttribute('data-slug');
        if (relSlug) openBlogDetail(relSlug, true);
      });
    });
  }

  /**
   * 8. Setup Scroll Spy for Table of Contents
   */
  function setupScrollSpy() {
    const sectionBlocks = detailViewEl.querySelectorAll('.article-section-block');
    const tocLinks = detailViewEl.querySelectorAll('.toc-link');

    if (!sectionBlocks.length || !tocLinks.length) return;

    function onScroll() {
      const scrollPos = window.scrollY + 120;
      let activeId = '';

      sectionBlocks.forEach(sec => {
        if (sec.offsetTop <= scrollPos) {
          activeId = sec.getAttribute('id');
        }
      });

      if (activeId) {
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-target') === activeId);
        });
      }
    }

    window.removeEventListener('scroll', window._blogScrollSpyHandler);
    window._blogScrollSpyHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /**
   * 9. Handle Social Sharing
   */
  function handleSocialShare(type, data) {
    const shareUrl = encodeURIComponent(window.location.origin + window.location.pathname + '#blog/' + data.slug);
    const title = encodeURIComponent(data.title + ' — SchoolBite');

    if (type === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`, '_blank', 'width=600,height=400');
    } else if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank', 'width=600,height=400');
    } else if (type === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank', 'width=600,height=400');
    } else if (type === 'copy') {
      const fullUrl = window.location.origin + window.location.pathname + '#blog/' + data.slug;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullUrl).then(() => {
          if (window.showToast) {
            window.showToast('Article link copied to clipboard!', 'success');
          } else {
            alert('Article link copied to clipboard!');
          }
        });
      }
    }
  }

  /**
   * 10. Check URL on initial load / popstate
   */
  function checkUrlState() {
    const hash = window.location.hash || '';
    const params = new URLSearchParams(window.location.search);

    let targetSlug = null;

    if (hash.startsWith('#blog/')) {
      targetSlug = hash.replace('#blog/', '').trim();
    } else if (params.get('blog')) {
      targetSlug = params.get('blog');
    } else if (params.get('id')) {
      targetSlug = params.get('id');
    }

    if (targetSlug) {
      const data = getBlogData(targetSlug);
      if (data) {
        openBlogDetail(data.slug, false);
        return;
      }
    }

    // Default: show listing
    closeBlogDetail(false);
  }

  /**
   * Escapes HTML strings
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();