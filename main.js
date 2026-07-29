/* Dimitri Andreenko — portfolio interactions
   Runs on index.html and gallery.html. Every block is guarded,
   so a missing element on one page never breaks the other.      */

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  const root = document.documentElement;

  /* ── Language ──────────────────────────────────────── */
  const DICT     = window.I18N || {};
  const LANGS    = ['en', 'ru'];
  const LANG_KEY = 'da-lang';
  const isGallery = /gallery\.html$/.test(location.pathname);

  /* things that need to react when the language is switched */
  const langHooks = [];

  function translate(lang) {
    const dict = DICT[lang];
    if (!dict) return;

    $$('[data-i18n]').forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v === undefined) return;
      if (el.tagName === 'META') el.setAttribute('content', v);
      else el.textContent = v;
    });

    $$('[data-i18n-html]').forEach((el) => {
      const v = dict[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    /* language-specific artwork, e.g. an EN and RU book cover */
    $$('[data-img-base]').forEach((pic) => {
      const base = pic.dataset.imgBase + '-' + lang;
      const src  = pic.querySelector('source');
      const img  = pic.querySelector('img');
      if (src) src.srcset = base + '.webp';
      if (img) img.src    = base + '.jpg';
    });

    const title = isGallery ? dict['gal.doc.title'] : dict['doc.title'];
    if (title) document.title = title;
    root.setAttribute('lang', lang);

    $$('.lang__btn').forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    langHooks.forEach((fn) => fn());
  }

  function detectLang() {
    const saved = store.get(LANG_KEY);
    if (LANGS.indexOf(saved) !== -1) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : 'en';
  }

  translate(detectLang());

  $$('.lang__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      translate(btn.dataset.lang);
      store.set(LANG_KEY, btn.dataset.lang);
    });
  });

  /* ── Theme ─────────────────────────────────────────── */
  const toggle    = $('#theme-toggle');
  const THEME_KEY = 'da-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const dark = theme === 'dark';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#090b12' : '#1B4EF5');
  }

  const savedTheme  = store.get(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store.set(THEME_KEY, next);
    });
  }

  /* ── Reveal on scroll ──────────────────────────────── */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ── Mobile nav ────────────────────────────────────── */
  const nav     = $('#nav');
  const menuBtn = $('#menu-btn');

  if (nav && menuBtn) {
    const setMenu = (open) => {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    menuBtn.addEventListener('click', () => {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    $$('.nav__link').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });
  }

  /* ── Project filters ───────────────────────────────── */
  const grid = $('#work-grid');
  if (grid) {
    const cards = $$('.card', grid);
    const empty = $('#grid-empty');

    $$('.filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;

        $$('.filter').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });

        let visible = 0;
        cards.forEach((card) => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.hidden = !show;
          if (show) visible++;
        });
        if (empty) empty.hidden = visible > 0;
      });
    });
  }

  /* ── Lightbox ──────────────────────────────────────── */
  const lb = $('#lightbox');

  if (lb && window.PROJECTS) {
    const PROJ = window.PROJECTS;
    const frame   = $('#lb-frame');
    const capEl   = $('#lb-caption');
    const thumbs  = $('#lb-thumbs');
    const idxEl   = $('#lb-index');
    const totEl   = $('#lb-total');
    const metaEl  = $('#lb-meta');
    const titleEl = $('#lb-title');
    const descEl  = $('#lb-desc');
    const credEl  = $('#lb-credits');
    const prevBtn = $('#lb-prev');
    const nextBtn = $('#lb-next');

    let current = null;   // project object
    let index   = 0;
    let opener  = null;   // element to restore focus to

    const t = (key) => {
      const d = DICT[root.getAttribute('lang')] || DICT.en || {};
      return d[key] !== undefined ? d[key] : key;
    };

    const srcFor = (img) => {
      const lang = root.getAttribute('lang') === 'ru' ? 'ru' : 'en';
      return img.byLang ? img.base + '-' + lang : img.base;
    };

    function paintImage() {
      const img = current.images[index];
      const src = srcFor(img);
      frame.innerHTML =
        '<picture>' +
          '<source srcset="' + src + '.webp" type="image/webp">' +
          '<img src="' + src + '.jpg" alt="' + t(img.cap).replace(/"/g, '&quot;') + '">' +
        '</picture>';
      capEl.textContent = t(img.cap);
      idxEl.textContent = String(index + 1);
      $$('button', thumbs).forEach((b, i) => b.classList.toggle('is-active', i === index));
    }

    function paintAll() {
      if (!current) return;

      metaEl.textContent  = t(current.meta);
      titleEl.textContent = t(current.title);
      descEl.textContent  = t(current.desc);
      totEl.textContent   = String(current.images.length);

      credEl.innerHTML = current.credits.map((row) =>
        '<div><dt>' + t(row[0]) + '</dt><dd>' + t(row[1]) + '</dd></div>'
      ).join('');

      thumbs.innerHTML = current.images.map((img, i) =>
        '<li><button type="button" data-i="' + i + '" aria-label="' + (i + 1) + '">' +
          '<img src="' + srcFor(img) + '.jpg" alt=""></button></li>'
      ).join('');

      const multi = current.images.length > 1;
      prevBtn.hidden = nextBtn.hidden = !multi;
      thumbs.hidden = !multi;

      paintImage();
    }

    function go(step) {
      const n = current.images.length;
      index = (index + step + n) % n;
      paintImage();
    }

    function open(id, trigger) {
      if (!PROJ[id]) return;
      current = PROJ[id];
      index   = 0;
      opener  = trigger || null;

      paintAll();
      lb.hidden = false;
      document.body.classList.add('lb-open');
      $('.lb__close', lb).focus();
    }

    function close() {
      lb.hidden = true;
      document.body.classList.remove('lb-open');
      current = null;
      if (opener) { opener.focus(); opener = null; }
    }

    /* open from a project card */
    $$('[data-project]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        open(link.dataset.project, link);
      });
    });

    /* close */
    $$('[data-lb-close]', lb).forEach((el) => el.addEventListener('click', close));

    /* navigate */
    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));
    thumbs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) { index = Number(btn.dataset.i); paintImage(); }
    });

    /* keyboard: escape, arrows, and a simple focus trap */
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape')     { close(); return; }
      if (e.key === 'ArrowLeft')  { go(-1);  return; }
      if (e.key === 'ArrowRight') { go(1);   return; }
      if (e.key !== 'Tab') return;

      const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', lb)
        .filter((el) => !el.hidden && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    /* swipe on touch */
    let x0 = null;
    frame.addEventListener('touchstart', (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    frame.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    /* redraw when the language changes while open */
    langHooks.push(() => { if (!lb.hidden && current) paintAll(); });
  }

  /* ── Stamp perforation ─────────────────────────────── */
  /* The mask tiles notches at a fixed --step. If the box isn't an
     exact multiple of that, `mask-repeat:round` rescales each axis
     independently — the top edge ends up with a different step to
     the left edge, and the corners stop matching. Rounding the box
     up to a whole number of steps gives both axes one step, so the
     four corners are identical. Content-sized, then quantised.   */
  const paper = $('.stamp__paper');
  if (paper) {
    const quantise = () => {
      paper.style.width = '';
      paper.style.height = '';
      const step = parseFloat(getComputedStyle(paper).getPropertyValue('--step')) || 16;
      // offsetWidth/Height are layout values — unaffected by the rotation
      paper.style.width  = Math.ceil(paper.offsetWidth  / step) * step + 'px';
      paper.style.height = Math.ceil(paper.offsetHeight / step) * step + 'px';
    };

    quantise();
    // webfonts land after first paint and change the text metrics
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(quantise);
    langHooks.push(quantise);

    let stampTimer;
    window.addEventListener('resize', () => {
      clearTimeout(stampTimer);
      stampTimer = setTimeout(quantise, 150);
    });
  }

  /* ── Header state, scroll progress, active link ────── */
  const header   = $('#site-header');
  const progress = $('#scroll-progress');
  const sections = $$('main section[id]');
  const links    = $$('.nav__link');
  let ticking = false;

  function onScroll() {
    const y   = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (header)   header.classList.toggle('is-stuck', y > 12);
    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    if (sections.length) {
      let current = '';
      sections.forEach((sec) => { if (y >= sec.offsetTop - 140) current = sec.id; });
      links.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── Footer year ───────────────────────────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
