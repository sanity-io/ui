---
"@sanity/ui": major
---

**New required import: `@sanity/ui/styles.css`.**

Static styles (the ones that don't depend on theme or props) are now extracted into a stylesheet at build time instead of being injected at runtime. The stylesheet is **not** loaded automatically.

What to do — add this import once, next to where the app renders `<ThemeProvider>`:

```js
import "@sanity/ui/styles.css"
```

Good to know: these styles moved from styled-components to [vanilla-extract](https://vanilla-extract.style/) — in this release that covers `SrOnly`, `Spinner`, and internal text-overflow styling.
