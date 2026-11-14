# All In — firm website (v2)

Static site. English pages are generated; the Arabic Layan page in `layan/` is kept by hand.

- Edit copy: `build/content.js` (services, products, articles) and `build/build.js` (page layouts)
- Build: `node build/build.js`
- Check links and banned words: `node build/check.js`
- Preview: `node build/serve.js` then open http://localhost:4173
- Styles: `assets/css/site.css` · Behaviour: `assets/js/site.js`
- Workflow notes: `workflow/`

To publish, copy everything except `build/`, `workflow/` and `README.md` to the root of the `firas-i.github.io` repository.
