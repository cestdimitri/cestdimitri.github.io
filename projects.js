/* ============================================================
   Project case data for the lightbox.

   Add a project by giving it a key here, then putting
   data-project="thatkey" on the card's <a> in index.html.

   images[]
     base    — path without extension; .webp and .jpg must both exist
     byLang  — true if the file is suffixed -en / -ru (e.g. cover-en.webp)
     cap     — i18n key for the caption
   All other fields are i18n keys, resolved from i18n.js.
   ============================================================ */

window.PROJECTS = {

  nosorog: {
    title   : 'p1.title',
    meta    : 'nos.meta',
    desc    : 'nos.desc',
    images  : [
      { base: 'images/nosorog/cover',     byLang: true, cap: 'nos.cap1' },
      { base: 'images/nosorog/spread-01',               cap: 'nos.cap2' },
      { base: 'images/nosorog/spread-02',               cap: 'nos.cap3' }
    ],
    credits : [
      ['nos.k.role',    'nos.v.role'],
      ['nos.k.client',  'nos.v.client'],
      ['nos.k.series',  'nos.v.series'],
      ['nos.k.author',  'nos.v.author'],
      ['nos.k.trans',   'nos.v.trans'],
      ['nos.k.extent',  'nos.v.extent'],
      ['nos.k.format',  'nos.v.format'],
      ['nos.k.run',     'nos.v.run'],
      ['nos.k.print',   'nos.v.print']
    ]
  },

  kzine4: {
    title   : 'p2.title',
    meta    : 'kz.meta',
    desc    : 'kz4.desc',
    images  : [
      { base: 'images/kzine/issue4',         byLang: true, cap: 'kz4.cap1' },
      { base: 'images/kzine/issue4-spreads',               cap: 'kz4.cap2' }
    ],
    credits : [
      ['kz.k.role',   'kz.v.role'],
      ['kz.k.client', 'kz.v.client'],
      ['kz.k.issue',  'kz4.v.issue'],
      ['kz.k.authors','kz.v.authors'],
      ['kz.k.lang',   'kz.v.lang'],
      ['kz.k.extent', 'kz4.v.extent'],
      ['kz.k.format', 'kz.v.format'],
      ['kz.k.run',    'kz4.v.run'],
      ['kz.k.print',  'kz4.v.print']
    ]
  },

  kzine6: {
    title   : 'p3.title',
    meta    : 'kz.meta',
    desc    : 'kz6.desc',
    images  : [
      { base: 'images/kzine/issue6',         byLang: true, cap: 'kz6.cap1' },
      { base: 'images/kzine/issue6-spreads',               cap: 'kz6.cap2' }
    ],
    credits : [
      ['kz.k.role',   'kz.v.role'],
      ['kz.k.client', 'kz.v.client'],
      ['kz.k.issue',  'kz6.v.issue'],
      ['kz.k.authors','kz.v.authors'],
      ['kz.k.lang',   'kz.v.lang'],
      ['kz.k.extent', 'kz6.v.extent'],
      ['kz.k.format', 'kz.v.format'],
      ['kz.k.run',    'kz6.v.run'],
      ['kz.k.print',  'kz6.v.print']
    ]
  },

  mfff: {
    title   : 'p7.title',
    meta    : 'mf.meta',
    desc    : 'mf.desc',
    images  : [
      { base: 'images/mfff/cover',   cap: 'mf.cap1' },
      { base: 'images/mfff/spreads', cap: 'mf.cap2' }
    ],
    credits : [
      ['mf.k.role',   'mf.v.role'],
      ['mf.k.client', 'mf.v.client'],
      ['mf.k.lang',   'mf.v.lang'],
      ['mf.k.format', 'mf.v.format'],
      ['mf.k.year',   'mf.v.year']
    ]
  }

};
