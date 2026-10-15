---
'@sanity/ui': patch
---

Build the Panda CSS styles with the `panda` option of `@sanity/tsdown-config` (`@sanity/pandacss-tsdown-plugin`) instead of a custom build plugin. The published JavaScript, type declarations, `styles.css` and `package.json` exports are unchanged. Source maps now point styles inlined from `.css.ts` files at the right lines.
