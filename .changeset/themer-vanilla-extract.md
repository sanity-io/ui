---
'@sanity/themer': minor
---

The themer tool is styled with vanilla-extract instead of styled-components: its styles ship as the `@sanity/themer/bundle.css` stylesheet, which `@sanity/themer/tool` imports itself (the `node` export condition resolves it to a no-op shim), and `styled-components` is no longer a peer dependency. The sidebar header has its bottom border back and takes the height of the Studio navbar, so the two line up — whatever height the Studio version, breakpoint or a custom navbar gives it. With `prefers-reduced-motion: reduce` the split preview switches layouts without its view transition animating.
