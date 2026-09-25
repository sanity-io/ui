---
'@sanity/themer': minor
---

The themer tool is styled with vanilla-extract instead of styled-components: its styles ship as the `@sanity/themer/bundle.css` stylesheet, which `@sanity/themer/tool` imports itself (the `node` export condition resolves it to a no-op shim), and `styled-components` is no longer a peer dependency.
