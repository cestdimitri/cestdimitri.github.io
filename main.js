/* Dmitrii Andreenko — portfolio interactions
   Runs on every page. Every block is guarded,
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
  /* each page names its own <title> key */
  const PAGE_TITLE_KEY =
      /gallery\.html$/.test(location.pathname)         ? 'gal.doc.title'
    : /case-chistetika\.html$/.test(location.pathname) ? 'cs.doc.title'
    :                                                    'doc.title';

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

    /* labels that aren't visible text still need translating */
    $$('[data-i18n-aria]').forEach((el) => {
      const v = dict[el.dataset.i18nAria];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });

    /* language-specific artwork, e.g. an EN and RU book cover */
    $$('[data-img-base]').forEach((pic) => {
      const base = pic.dataset.imgBase + '-' + lang;
      const src  = pic.querySelector('source');
      const img  = pic.querySelector('img');
      if (src) src.srcset = base + '.webp';
      if (img) img.src    = base + '.jpg';
    });

    const title = dict[PAGE_TITLE_KEY];
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
    if (meta) meta.setAttribute('content', dark ? '#090b12' : '#F4F5F8');
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

    /* ── Card slideshow ──────────────────────────────── */
    /* Cycles a card through its project's images on hover. Frames
       are created on first hover, not on load, so the spreads are
       only fetched once someone shows interest in that card.     */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    $$('[data-project]').forEach((link) => {
      const proj   = PROJ[link.dataset.project];
      const visual = $('.card__visual', link);
      if (!proj || !visual || !proj.images.length) return;

      let frames = null, dots = null, i = 0, timer = null;

      const build = () => {
        if (frames) return;
        // frame 0 is the card's own cover photo, which isn't part of
        // the case gallery — so every project image is appended after it
        const first = visual.querySelector('picture');
        proj.images.forEach((img) => {
          const src = srcFor(img);
          const pic = document.createElement('picture');
          pic.innerHTML =
            '<source srcset="' + src + '.webp" type="image/webp">' +
            '<img src="' + src + '.jpg" alt="" loading="lazy" decoding="async">';
          visual.appendChild(pic);
        });
        first.classList.add('is-on');

        dots = document.createElement('span');
        dots.className = 'card__dots';
        dots.setAttribute('aria-hidden', 'true');
        dots.innerHTML = Array.from({ length: proj.images.length + 1 }, (_, n) =>
          '<i' + (n === 0 ? ' class="is-on"' : '') + '></i>').join('');
        visual.appendChild(dots);

        frames = $$('picture', visual);
        visual.classList.add('is-slideshow');   // now safe to hide frames
      };

      const show = (n) => {
        i = (n + frames.length) % frames.length;
        frames.forEach((f, k) => f.classList.toggle('is-on', k === i));
        $$('i', dots).forEach((d, k) => d.classList.toggle('is-on', k === i));
      };

      const start = () => {
        build();
        if (reduced) return;
        clearInterval(timer);
        timer = setInterval(() => show(i + 1), 1400);
      };
      const stop = () => { clearInterval(timer); if (frames) show(0); };

      link.addEventListener('mouseenter', start);
      link.addEventListener('mouseleave', stop);
      link.addEventListener('focus', start);
      link.addEventListener('blur', stop);
    });

    /* language switch has to re-point every built frame */
    langHooks.push(() => {
      $$('[data-project]').forEach((link) => {
        const proj = PROJ[link.dataset.project];
        if (!proj) return;
        $$('.card__visual picture', link).forEach((pic, n) => {
          if (n === 0) return;                  // cover photo carries no text
          const img = proj.images[n - 1];
          if (!img || !img.byLang) return;
          const src = srcFor(img);
          const s = pic.querySelector('source'); if (s) s.srcset = src + '.webp';
          const m = pic.querySelector('img');    if (m) m.src    = src + '.jpg';
        });
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

  /* ── Scroll progress, active dock link, back to top ── */
  const progress = $('#scroll-progress');
  const toTop    = $('#to-top');
  const sections = $$('main section[id]');
  const links    = $$('.dock__link');
  let ticking = false;

  function onScroll() {
    const y   = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    // the button only earns its space once there's something to go back to
    if (toTop) toTop.classList.toggle('is-shown', y > window.innerHeight * 0.6);

    if (sections.length) {
      let current = '';
      sections.forEach((sec) => { if (y >= sec.offsetTop - 160) current = sec.id; });
      links.forEach((a) => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('is-active', href.slice(href.indexOf('#')) === '#' + current);
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── Mobile dock menu ──────────────────────────────────
     The dock keeps burger, language and theme; the links live
     in a panel above it. Purely a small-screen affordance —
     above 640 the panel is a plain flex row again and the
     is-open class means nothing.                          */
  const dock   = $('.dock');
  const burger = $('#nav-toggle');

  if (dock && burger) {
    const setMenu = (open) => {
      dock.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    burger.addEventListener('click', () => {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    /* a link is a destination, so following one closes the menu */
    $$('.dock__link', dock).forEach((a) => a.addEventListener('click', () => setMenu(false)));

    document.addEventListener('click', (e) => {
      if (!dock.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dock.classList.contains('is-open')) {
        setMenu(false); burger.focus();
      }
    });
    /* rotating the phone can take you past the breakpoint mid-menu */
    window.matchMedia('(min-width: 641px)').addEventListener('change', (m) => {
      if (m.matches) setMenu(false);
    });
  }

  /* ── Full-size image viewer ────────────────────────────
     The strip shows five page shots at ~150px wide, which is
     enough to compare silhouettes and useless for reading. A
     click opens the full-width file in a scrolling overlay —
     the images are 3,200px tall, so fitting them to the screen
     would defeat the point. Only the clicked file is fetched. */
  const zoom = $('#zoom');

  /* Every figure image opens too, not just the version strip. Rather
     than wrapping each <picture> in a button — which would break the
     `.fig > picture` plate, since picture would stop being a child —
     the image itself becomes the control.                        */
  $$('.fig__img, .gal__fig img, .shot__reel img').forEach((img) => {
    img.classList.add('is-zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
  });

  /* one list, in document order, so prev/next walks the page */
  const shots = $$('.strip__item[data-zoom-src], .is-zoomable');

  if (zoom && shots.length) {
    const zImg    = $('#zoom-img',    zoom);
    const zSource = $('#zoom-source', zoom);
    const zLabel  = $('#zoom-label',  zoom);
    const zDesc   = $('#zoom-desc',   zoom);
    const scroller = $('.zoom__scroll', zoom);
    let at = 0;
    let opener = null;

    /* a strip button carries its own bigger file and a dictionary key;
       a figure image carries its own src and a caption element, which
       is read live so it follows a language switch */
    const describe = (el) => {
      if (el.dataset.zoomSrc) {
        return {
          src: el.dataset.zoomSrc,
          srcset: el.dataset.zoomSrcset || '',
          label: el.dataset.zoomLabel || '',
          capKey: el.dataset.zoomCap,
          capEl: el.querySelector('.strip__desc')
        };
      }
      const pic  = el.closest('picture');
      const fig  = el.closest('figure');
      const item = el.closest('.pair__item');
      return {
        src: el.currentSrc || el.src,
        srcset: (pic && pic.querySelector('source')) ? pic.querySelector('source').srcset : '',
        label: item && item.querySelector('.pair__label')
                 ? item.querySelector('.pair__label').textContent.trim() : '',
        capKey: null,
        capEl: fig ? fig.querySelector('figcaption') : null
      };
    };

    const paint = (n) => {
      at = (n + shots.length) % shots.length;
      const d = describe(shots[at]);
      zSource.srcset = d.srcset;
      zImg.src       = d.src;
      zImg.alt       = '';
      zLabel.textContent = d.label;
      const dict = DICT[root.lang === 'ru' ? 'ru' : 'en'] || {};
      zDesc.textContent = (d.capKey && dict[d.capKey]) || (d.capEl ? d.capEl.textContent.trim() : '');
      scroller.scrollTop = 0;
    };

    const open = (n, from) => {
      opener = from || null;
      paint(n);
      zoom.hidden = false;
      document.body.classList.add('lb-open');
      $('.zoom__btn--close', zoom).focus();
    };

    const close = () => {
      zoom.hidden = true;
      document.body.classList.remove('lb-open');
      if (opener) opener.focus();
    };

    shots.forEach((el, n) => {
      el.addEventListener('click', () => open(n, el));
      /* the strip items are real buttons; the images are not, so they
         need Enter and Space wired by hand */
      if (el.tagName === 'IMG') {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n, el); }
        });
      }
    });

    /* the close button always closes — its click lands on the inner
       <svg>, so no target guard. The scroller only closes when the
       click is on the backdrop itself and not on the image. */
    $('.zoom__btn--close', zoom).addEventListener('click', close);
    scroller.addEventListener('click', (e) => { if (e.target === scroller) close(); });
    $('#zoom-prev', zoom).addEventListener('click', () => paint(at - 1));
    $('#zoom-next', zoom).addEventListener('click', () => paint(at + 1));

    document.addEventListener('keydown', (e) => {
      if (zoom.hidden) return;
      if (e.key === 'Escape')     { close();       }
      if (e.key === 'ArrowLeft')  { paint(at - 1); }
      if (e.key === 'ArrowRight') { paint(at + 1); }
    });

    /* the caption in the overlay is translated copy too */
    langHooks.push(() => { if (!zoom.hidden) paint(at); });
  }

  /* ── Footer year ───────────────────────────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
