---
"@sanity/ui": major
---

Ship static CSS as a stylesheet that consumers import themselves: `import '@sanity/ui/styles.css'`.

Styles that don't depend on the theme or props are migrating from styled-components to [vanilla-extract](https://vanilla-extract.style/), extracted at build time into `dist/styles.css` instead of being injected at runtime. The stylesheet is not loaded automatically — add the import once, e.g. next to where the app renders `<ThemeProvider>`:

```js
import "@sanity/ui/styles.css"
```

The `styles.css` export path is the same one the vanilla-extract based next major version of this library uses, so the import carries over unchanged when upgrading later. This release migrates the first slice (`SrOnly`, `Spinner`, and internal text-overflow styling); more styles will move to the stylesheet over time.
