/* ============================================================
   Chistetika Lab — case study copy, EN / RU.

   Kept out of i18n.js so the site dictionary stays readable;
   this merges into the same window.I18N object, so main.js
   resolves these keys exactly like any other.

   Key prefixes
     cs.*        page chrome, headings, prose
     cs.fN.*     figure N — .sN step captions where a figure is
                 a sequence, .cap for the caption under it
   ============================================================ */

(function () {
  const EN = {
    'cs.doc.title'  : 'Chistetika Lab — UX case — Dmitrii Andreenko',
    'cs.meta.desc'  : 'Research, structure, copy and wireframes for a landing page in a new product category. UX case by Dmitrii Andreenko.',
    'cs.back'       : 'All work',
    'cs.eyebrow'    : 'UX Case · 2025',
    'cs.title'      : 'Chistetika Lab',
    'cs.sub'        : 'Research, structure and copy for a new product category',

    'cs.k.role'     : 'Role',
    'cs.v.role'     : 'Lead editor & UX writer — research, structure, all copy, wireframes',
    'cs.k.team'     : 'Team',
    'cs.v.team'     : 'Creative director, visual designer, client’s art director, formula technologists',
    'cs.k.year'     : 'Year',
    'cs.v.year'     : '2025 · 2–3 weeks · 3 review rounds',
    'cs.k.live'     : 'Live',
    'cs.v.live'     : 'chistetika.ru/lab',

    /* 01 — brief */
    'cs.h.brief'    : 'The brief',
    'cs.brief.quote': '“We sell fabrics and we professionally know how to care for them. Now we’re launching a product that opens a new market for us — but we have to use our textile expertise to educate the customer.”',
    'cs.brief.p1'   : 'Chistetika.ru sold interior textiles. It had never sold a cleaning product. This was the first page of its kind, built from zero — for a 35-gram oxygen stain stick (кислородный карандаш): wet the stain, rub, wait fifteen minutes, wash as usual.',
    'cs.f1.tag'     : 'The product',
    'cs.f1.cap'     : 'The object the page had to sell: a 35-gram oxygen stain stick',

    /* 02 — the problem */
    'cs.h.problem'  : 'The problem',
    'cs.pr.1t'      : 'No authority in the category.',
    'cs.pr.1p'      : 'The brand was trusted on textiles and unknown in cleaning chemistry. The page had to carry authority across a category line rather than build it.',
    'cs.pr.2t'      : 'The formula wasn’t ours alone.',
    'cs.pr.2p'      : 'Under six direct competitors, several selling a near-identical formula unbranded. Composition could not win the choice.',
    'cs.pr.3t'      : 'It only works if used correctly.',
    'cs.pr.3p'      : '“No difference” almost always means a skipped step. Instructions weren’t a nicety — they were complaint prevention.',

    /* 03 — research */
    'cs.h.research' : 'Research',
    'cs.res.p1'     : 'Six direct competitors, read for tone of voice, eco claims and how each frames the category. With the technologists I went through the formulas line by line, looking for properties we could legitimately claim — not inventing them, finding them.',
    'cs.res.p2'     : 'A short survey said three things: packaging has to read unmistakably as a cleaning product and not a shampoo, eco and safety must be stated rather than implied, and a price above competitors ends the conversation.',
    'cs.f2.tag'     : 'Competitors',
    'cs.f2.cap'     : 'Six direct competitors, read for tone of voice, eco claims and how each one frames the category',

    /* 05 — decisions */
    'cs.h.dec'      : 'Decisions',

    'cs.d1.h'       : 'Brand values → product benefits',
    'cs.d1.p1'      : 'The first benefits row was brand values in disguise: flawless cleanliness (идеальная чистота без компромиссов), ease of use (простота в применении), safe formulas (безопасные для здоровья формулы), colour retention (сохранность текстуры и цвета мебели). Three would introduce any product in the catalogue and the fourth still said “furniture” (мебели). v2 rewrote them as claims about this product and moved the brand language into a block of its own. v3 deleted that block — About the brand (О Chistetika Lab) and the composition table were already saying it better.',
    'cs.d1.p2'      : 'The most important change in the project. Values are about us; benefits are about the buyer’s problem. Everything after it got easier to decide.',
    'cs.f3.s1'      : 'v1 — brand values in the benefits row. Three of the four would introduce any product; the fourth still says “furniture” (мебели)',
    'cs.f3.s2'      : 'v2 — rewritten as product claims. The brand language survives lower down, as a values block under a mission banner',
    'cs.f3.s3'      : 'v3 — both deleted. The row keeps the claims and gains icons',

    'cs.d2.h'       : 'Showing the composition, not claiming transparency',
    'cs.d2.p1'      : 'Every ingredient in cleaning chemistry looks alarming. We worked directly with the formula’s manufacturer, so I asked the technologists what each component does and built the table with a Function column (Функция) beside every Ingredient (Ингредиент). Soda ash (сода кальцинированная) lifts dirt and grease; the oxygen component (кислородный компонент) whitens without chlorine; anionic surfactants (АПАВ) break down soiling and are biodegradable.',
    'cs.d2.p2'      : 'This was the answer to formula parity. If a competitor sells the same formula without explaining it, the explanation is the difference. An earlier draft argued for transparency in a paragraph — the table demonstrates it, so the paragraph went.',
    'cs.f4.k1'      : 'Pre-design',
    'cs.f4.cap'     : 'Showing transparency instead of claiming it: a Function written for every Ingredient, agreed line by line with the technologists',

    /* 04 — structure */
    'cs.h.struct'   : 'Structure',
    'cs.str.p1'      : 'The brand block sits above the product because in a first-time category trust has to land before the object is examined. Our brands (Наши бренды) started high and broke the narrative; at the bottom it supports the trust claim without interrupting it.',
    'cs.str.p2'      : 'There is no cart. Purchase goes out to SOUZ-SHOP and Ozon, which made the page’s real job presence and indexability — a product you can’t find anywhere on the web is a product people distrust. That is why Where to buy (Где купить) sits low, after the case has been made.',
    'cs.str.p3'      : 'The layout follows from that order: one idea per full-width band on a light neutral ground, each band a card with generous air around it, so a reader can stop anywhere and still know which question is being answered. Photography carries the use cases, a tab switcher holds the range without a second page, and the composition sits in a plain two-column table — the one place on the page where nothing is styled to persuade.',
    'cs.f5.cap'     : 'Final block order and the reasoning behind it',
    'cs.dia.b1'     : 'Presentation',
    'cs.dia.q1'     : 'What is this?',
    'cs.dia.b2'     : 'Product benefits',
    'cs.dia.q2'     : 'Why should I look?',
    'cs.dia.b3'     : 'About the brand',
    'cs.dia.q3'     : 'Why trust you with this?',
    'cs.dia.b4'     : 'Use cases, in photographs',
    'cs.dia.q4'     : 'Where does it fit my life?',
    'cs.dia.b5'     : 'Product card',
    'cs.dia.q5'     : 'What exactly am I buying, and how do I use it?',
    'cs.dia.b6'     : 'Where to buy',
    'cs.dia.q6'     : 'Where do I actually get it?',
    'cs.dia.b7'     : 'Composition',
    'cs.dia.q7'     : 'What is actually in it?',
    'cs.dia.key'    : 'Marked: the two blocks whose position was the decision',

    /* 06 — writing */
    'cs.h.write'    : 'Writing in the brand’s voice',
    'cs.wr.p1'      : 'The competitor reading gave the category’s default register: clinical, technical, a specification sheet with a bottle on it. Chistetika didn’t sound like that anywhere else on its site — it sold interior textiles in a warm, domestic voice, about things people keep. The draft copy for Lab arrived in manufacturer language, so I rewrote every block into that voice: the brand knows how to make loved things last (продлить жизнь любимым вещам), and the cleaning product is the same promise in a different form.',
    'cs.wr.p2'      : 'Voice and evidence had to agree, which set the ceiling. The claim I wanted was “safe for children” (безопасно для детей); the documentation supported children’s clothing, not skin, so it became “safe for the whole family” (безопасны для всей семьи). Warm, and provable. Every line went through both checks.',
    'cs.f6.tag'     : 'Tone of voice',
    'cs.f6.cap'     : 'The About block, rewritten out of manufacturer language and into the register the brand already used for textiles',

    /* 07 — lost argument */
    'cs.h.lost'     : 'The argument I lost',
    'cs.lost.p1'    : 'Two tabs — fabric spray (спрей для тканей) and surface spray (спрей для поверхностей) — sell products that don’t exist. I argued against announcing a line with no confirmed release date; the client was certain and insisted. I contained it: tabs only, a “coming soon” label (скоро в продаже), nothing behind them. If the line slipped, the page would read as one with two extra tabs rather than two empty holes.',
    'cs.lost.p2'    : 'The line was put on hold. The tabs are still live. Containment limited the damage and still carried a bad decision into production — the honest fix was shipping without them.',
    'cs.f7.tag'     : 'The compromise',
    'cs.f7.cap'     : 'Tabs only, nothing behind them',

    /* 08 — result */
    'cs.h.result'   : 'Result',
    'cs.rs.p1'      : 'Live, selling well, collecting strong reviews on the marketplaces. Exact figures are under NDA. Two things changed at release: the palette was neutralised to match the main site’s design code, and the page was absorbed into its navigation and cross-linked from the textile categories — which was always the point.',
    'cs.rs.p2'      : 'Structure, sequence and copy went through unchanged.',
    'cs.f8.cap'     : 'Five versions, three review rounds with the art director and the client’s creative director. Hover to scroll one, click to open it full size',
    'cs.f8.v1'      : 'v1 — the first wireframe after the research',
    'cs.f8.v2'      : 'v2 — work on the copy begins',
    'cs.f8.v3'      : 'v3 — the layout prototype I handed to the visual designer',
    'cs.f8.v4'      : 'v4 — from here I polished the copy while the designer brought in the visual code',
    'cs.f8.v5'      : 'v5 — the final: my structure, layout and copy, with the designer’s finished visuals and content',
    'cs.f9.a'       : 'v5 — the final version, signed off',
    'cs.f9.b'       : 'Released — chistetika.ru/lab',
    'cs.f9.cap'     : 'The released page, live on the client’s site, beside the final version we signed off. The visual language adapted to the main site; the structure, the sequence and the copy did not',

  };

  const RU = {
    'cs.doc.title'  : 'Chistetika Lab — UX-кейс — Дмитрий Андреенко',
    'cs.meta.desc'  : 'Исследование, структура, тексты и прототипы лендинга для новой категории продуктов. UX-кейс Дмитрия Андреенко.',
    'cs.back'       : 'Все работы',
    'cs.eyebrow'    : 'UX-кейс · 2025',
    'cs.title'      : 'Chistetika Lab',
    'cs.sub'        : 'Исследование, структура и тексты для новой категории продуктов',

    'cs.k.role'     : 'Роль',
    'cs.v.role'     : 'Ведущий редактор и UX-редактор — исследование, структура, все тексты, прототипы',
    'cs.k.team'     : 'Команда',
    'cs.v.team'     : 'Креативный директор, визуальный дизайнер, арт-директор клиента, технологи производителя',
    'cs.k.year'     : 'Год',
    'cs.v.year'     : '2025 · 2–3 недели · 3 раунда правок',
    'cs.k.live'     : 'Ссылка',
    'cs.v.live'     : 'chistetika.ru/lab',

    'cs.h.brief'    : 'Задача',
    'cs.brief.quote': '«Мы продаём ткани и профессионально знаем, как за ними ухаживать. Сейчас мы запускаем продукт, который открывает для нас новый рынок, — и нам нужно опереться на экспертизу в текстиле, чтобы объяснить его покупателю».',
    'cs.brief.p1'   : 'Chistetika.ru продавала интерьерный текстиль. Чистящих средств на ней не было никогда. Это первая страница такой категории, сделанная с нуля, — для кислородного карандаша весом 35 граммов: смочить пятно, потереть, подождать пятнадцать минут, постирать как обычно.',
    'cs.f1.tag'     : 'Продукт',
    'cs.f1.cap'     : 'Предмет, который нужно было продать: кислородный карандаш, 35 граммов',

    'cs.h.problem'  : 'Проблема',
    'cs.pr.1t'      : 'В новой категории у бренда нет авторитета.',
    'cs.pr.1p'      : 'Бренду доверяли в текстиле и не знали в бытовой химии. Страница должна была перенести доверие через границу категории, а не построить его заново.',
    'cs.pr.2t'      : 'Формула не только наша.',
    'cs.pr.2p'      : 'Шесть прямых конкурентов, у нескольких почти та же формула, только без бренда. Отстроиться составом было нельзя.',
    'cs.pr.3t'      : 'Работает только по инструкции.',
    'cs.pr.3p'      : '«Средство не сработало» почти всегда означает пропущенный шаг. Инструкция была не дополнением, а защитой от рекламаций.',

    'cs.h.research' : 'Исследование',
    'cs.res.p1'     : 'Шесть прямых конкурентов: тональность, экологические заявления и то, как каждый подаёт категорию. Вместе с технологами я построчно прошёл составы в поисках свойств, которые можно заявить как преимущество, — не придумать, а найти.',
    'cs.res.p2'     : 'Короткий опрос дал три вывода: упаковка должна безошибочно читаться как чистящее средство, а не шампунь; экологичность и безопасность нужно называть прямо; цена выше конкурентов закрывает разговор.',
    'cs.f2.tag'     : 'Конкуренты',
    'cs.f2.cap'     : 'Шесть прямых конкурентов: тональность, экологические заявления и то, как каждый подаёт категорию',

    'cs.h.dec'      : 'Решения',

    'cs.d1.h'       : 'Ценности бренда → польза продукта',
    'cs.d1.p1'      : 'В первой версии строка преимуществ была переодетыми ценностями: идеальная чистота, простота, безопасные формулы, сохранность цвета. Три подошли бы любому товару каталога, четвёртая всё ещё говорила о мебели. Во второй их переписали в утверждения о продукте, а язык ценностей ушёл в отдельный блок. В третьей блок удалили — «О Chistetika Lab» и таблица состава говорили это лучше.',
    'cs.d1.p2'      : 'Главное изменение проекта. Ценности — про нас, польза — про задачу покупателя. После него остальные решения стало принимать легче.',
    'cs.f3.s1'      : 'v1 — ценности бренда в строке преимуществ. Три из четырёх подошли бы любому товару, четвёртая говорит о мебели',
    'cs.f3.s2'      : 'v2 — переписано в утверждения о продукте. Язык ценностей выживает ниже, в блоке под баннером с миссией',
    'cs.f3.s3'      : 'v3 — оба удалены. В строке остались утверждения, к ним добавились иконки',

    'cs.d2.h'       : 'Показать состав, а не заявить о прозрачности',
    'cs.d2.p1'      : 'В бытовой химии любой ингредиент выглядит пугающе. Мы работали напрямую с производителем формулы, поэтому я попросил технологов объяснить, что делает каждый компонент, и собрал таблицу, где рядом с ингредиентом стоит функция. Сода кальцинированная снимает грязь и жир, кислородный компонент осветляет без хлора, АПАВ расщепляют загрязнения и биоразлагаемы.',
    'cs.d2.p2'      : 'Это и есть ответ на одинаковые составы. Если конкурент продаёт ту же формулу и не объясняет её, объяснение и становится отличием. В ранней версии о прозрачности говорил отдельный абзац — таблица её показывает, поэтому абзац убрали.',
    'cs.f4.k1'      : 'Макет',
    'cs.f4.cap'     : 'Прозрачность показана, а не заявлена: у каждого ингредиента написана функция, построчно согласованная с технологами',

    'cs.h.struct'       : 'Структура',
    'cs.str.p1'      : 'Блок о бренде стоит выше продукта: в новой для бренда категории доверие должно сложиться до того, как покупатель начнёт рассматривать сам предмет. «Наши бренды» стояли высоко и ломали повествование; внизу они подтверждают надёжность, не перебивая рассказ.',
    'cs.str.p2'      : 'Корзины нет. Покупка уходит на SOUZ-SHOP и Ozon, и настоящей задачей страницы стали присутствие в интернете и индексация: товару, которого нет нигде, доверяют меньше. Поэтому «Где купить» стоит внизу, после аргументов.',
    'cs.str.p3'      : 'Из этого порядка следует и вёрстка: одна мысль на блок во всю ширину, светлый нейтральный фон, каждый блок — карточка с большим воздухом вокруг, чтобы читатель мог остановиться в любом месте и понимать, на какой вопрос сейчас отвечают. Сценарии показаны фотографиями, линейку продуктов держит переключатель вкладок без второй страницы, а состав стоит простой таблицей в две колонки — единственное место на странице, где ничто не оформлено ради убеждения.',
    'cs.f5.cap'     : 'Финальный порядок блоков и логика за ним',
    'cs.dia.b1'     : 'Презентация',
    'cs.dia.q1'     : 'Что это?',
    'cs.dia.b2'     : 'Преимущества продукта',
    'cs.dia.q2'     : 'Почему на это стоит смотреть?',
    'cs.dia.b3'     : 'О бренде',
    'cs.dia.q3'     : 'Почему вам можно доверять?',
    'cs.dia.b4'     : 'Сценарии в фотографиях',
    'cs.dia.q4'     : 'Где это в моей жизни?',
    'cs.dia.b5'     : 'Карточка товара',
    'cs.dia.q5'     : 'Что именно я покупаю и как этим пользоваться?',
    'cs.dia.b6'     : 'Где купить',
    'cs.dia.q6'     : 'Где это вообще взять?',
    'cs.dia.b7'     : 'Состав',
    'cs.dia.q7'     : 'Что внутри на самом деле?',
    'cs.dia.key'    : 'Отмечены два блока, положение которых и было решением',

    'cs.h.write'    : 'Текст голосом бренда',
    'cs.wr.p1'      : 'Разбор конкурентов дал регистр категории по умолчанию: клинический, технический — спецификация с бутылкой на обложке. Chistetika нигде на своём сайте так не звучала: она продавала интерьерный текстиль тёплым домашним голосом, о вещах, которые берегут. Черновые тексты для Lab пришли на языке производителя, и я переписал каждый блок в этот голос: бренд умеет продлевать жизнь любимым вещам, а чистящее средство — то же обещание в другой форме.',
    'cs.wr.p2'      : 'Голос и доказательства должны были совпадать — это и задало потолок. Я хотел формулировку «безопасно для детей», но документация подтверждала детские вещи, а не кожу, поэтому стало «безопасны для всей семьи». Тепло — и доказуемо. Каждая строка прошла обе проверки.',
    'cs.f6.tag'     : 'Тон голоса',
    'cs.f6.cap'     : 'Блок «О Chistetika Lab», переписанный с языка производителя в регистр, которым бренд уже говорил о текстиле',

    'cs.h.lost'     : 'Спор, который я проиграл',
    'cs.lost.p1'    : 'Две вкладки продают то, чего не существует. Я возражал против анонса линейки без подтверждённых сроков; клиент был уверен и настоял. Я ограничил ущерб — только вкладки, подпись «скоро в продаже» и ничего за ними. Если сроки сдвинутся, это будет страница с двумя лишними вкладками, а не с двумя пустыми дырами.',
    'cs.lost.p2'    : 'Линейку поставили на паузу. Вкладки остались. Ограничение смягчило последствия, но всё равно пронесло плохое решение в продакшен — честнее было выпустить страницу без них.',
    'cs.f7.tag'     : 'Компромисс',
    'cs.f7.cap'     : 'Только вкладки, за ними ничего',

    'cs.h.result'   : 'Результат',
    'cs.rs.p1'      : 'Страница работает, продукт продаётся хорошо и собирает сильные отзывы на маркетплейсах. Точные цифры под NDA. При выпуске изменилось два обстоятельства: палитру привели к нейтральной под дизайн-код основного сайта, и страница вошла в его навигацию с перелинковкой из текстильных категорий — ради этого всё и делалось.',
    'cs.rs.p2'      : 'Структура, последовательность блоков и тексты вышли без изменений.',
    'cs.f8.cap'     : 'Пять версий, три крупных раунда с арт-директором и креативным директором клиента. Наведите, чтобы пролистать, нажмите — чтобы открыть целиком',
    'cs.f8.v1'      : 'v1 — первый каркас после исследования',
    'cs.f8.v2'      : 'v2 — началась работа над текстом',
    'cs.f8.v3'      : 'v3 — прототип вёрстки, который я передал визуальному дизайнеру',
    'cs.f8.v4'      : 'v4 — с этой версии я доводил текст, а дизайнер добавлял элементы визуального кода',
    'cs.f8.v5'      : 'v5 — финал: моя структура, вёрстка и тексты в готовом дизайне и с финальным визуальным материалом',
    'cs.f9.a'       : 'v5 — финальная согласованная версия',
    'cs.f9.b'       : 'Релиз — chistetika.ru/lab',
    'cs.f9.cap'     : 'Выпущенная страница на сайте клиента рядом с финальной согласованной версией. Визуальный язык подстроился под основной сайт; структура, последовательность и тексты — нет',

  };

  window.I18N = window.I18N || { en: {}, ru: {} };
  Object.assign(window.I18N.en, EN);
  Object.assign(window.I18N.ru, RU);
})();
