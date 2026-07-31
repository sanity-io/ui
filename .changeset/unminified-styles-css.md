---
"@sanity/ui": patch
---

Ship `styles.css` unminified so the CSS output is easy to diff between published versions. It is still processed by lightningcss with the `@sanity/browserslist-config` lowering targets.
