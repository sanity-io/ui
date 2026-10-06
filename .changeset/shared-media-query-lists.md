---
'@sanity/ui': patch
---

`useMatchMedia` (and with it `usePrefersDark` and `usePrefersReducedMotion`) and `useMediaIndex` (used by every `Layer` and `Popover`) now share one `MediaQueryList` per media query and one subscription per query across all components. Previously every component instance evaluated its own copies through `window.matchMedia` — `useMatchMedia` on every render — so a form with many tooltips and popovers created hundreds of lists and listeners and re-evaluated media queries on each render.
