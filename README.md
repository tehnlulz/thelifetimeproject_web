# The Lifetime Project — website

Static marketing site (no build step for HTML/JS) deployed via GitHub Pages.

## Rebuilding the CSS

Tailwind CSS is compiled ahead of time into `assets/tailwind.css` and
committed to the repo (the site no longer loads the Tailwind Play CDN
script at runtime). Rebuild it with:

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.src.css -o assets/tailwind.css --minify
```

or, after `npm install`:

```
npm run build:css
```

You must rerun this command whenever a Tailwind utility class is added to
any HTML file or to `script.js` / `blog.js` / `nav.js` — otherwise the new
class won't exist in the committed stylesheet and will render unstyled.
The scanned sources are listed in `tailwind.config.js`'s `content` array.

A couple of classes used in the markup aren't part of Tailwind's default
v3 scale (`border-3`) or come from a Tailwind plugin that isn't installed
(`scrollbar-hide`); these are hand-defined in `styles.css` instead of via
the Tailwind build.
