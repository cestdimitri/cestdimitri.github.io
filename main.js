/* Dimitri Andreenko — portfolio interactions
   Language · theme · reveal · nav · filters · scroll        */

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  /* ── Language ──────────────────────────────────────── */
  const DICT     = window.I18N || {};
  const LANGS    = ['en', 'ru'];
  const LANG_KEY = 'da-lang';
  const root     = document.documentElement;

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

    if (dict['doc.title']) document.title = dict['doc.title'];
    root.setAttribute('lang', lang);

    $$('.lang__btn').forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function detectLang() {
    const saved = store.get(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : 'en';
  }

  translate(detectLang());

  $$('.lang__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      translate(lang);
      store.set(LANG_KEY, lang);
    });
  });

  /* ── Theme ─────────────────────────────────────────── */
  const toggle    = $('#theme-toggle');
  const THEME_KEY = 'da-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const dark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#090b12' : '#1B4EF5');
  }

  const savedTheme  = store.get(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.set(THEME_KEY, next);
  });

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

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuBtn.addEventListener('click', () => {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  $$('.nav__link').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });

  /* ── Project filters ───────────────────────────────── */
  const cards = $$('#work-grid .card');
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
      empty.hidden = visible > 0;
    });
  });

  /* ── Header state, scroll progress, active link ────── */
  const header   = $('#site-header');
  const progress = $('#scroll-progress');
  const sections = $$('main section[id]');
  const links    = $$('.nav__link');
  let ticking = false;

  function onScroll() {
    const y   = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    header.classList.toggle('is-stuck', y > 12);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    let current = '';
    sections.forEach((sec) => { if (y >= sec.offsetTop - 140) current = sec.id; });
    links.forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── Footer year ───────────────────────────────────── */
  $('#year').textContent = String(new Date().getFullYear());
})();
