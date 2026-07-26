# Dimitri Andreenko — portfolio

Personal portfolio site. Editor and content designer based in Porto, Portugal.

Static HTML, CSS and JavaScript. No framework, no build step, no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All markup and page structure |
| `styles.css` | Design system, layout, responsive rules, dark theme |
| `i18n.js` | EN / RU translation dictionaries |
| `main.js` | Language, theme, nav, filters, scroll behaviour |

## Editing

**Text** — every translatable string lives in `i18n.js`, as matching keys under `en` and `ru`. Change a value in both objects and the page picks it up.

**Colour and type** — the CSS custom properties at the top of `styles.css`. Dark theme overrides sit in the `[data-theme="dark"]` block directly below.

**Projects** — each card is a `<li class="card">` in `index.html`. The `data-cat` attribute drives the filter buttons.

## Running locally

Open `index.html` in a browser. That's it.

## Deployment

Hosted on GitHub Pages from the `main` branch.
