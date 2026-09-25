---
'@sanity/themer': patch
---

`@sanity/themer/bundle.css` keeps its `color-scheme` declarations as authored: Lightning CSS no longer adds the `--lightningcss-light`/`--lightningcss-dark` custom properties of its `light-dark()` polyfill next to them. The stylesheet also ships unminified, so it reads cleanly when comparing published versions.
