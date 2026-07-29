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
  }

};
