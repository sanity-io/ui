---
'@sanity/ui': minor
---

Replace vanilla-extract with Panda CSS for the static stylesheet (`@sanity/ui/styles.css`), emitted in Panda's default `@layer tokens` and `@layer utilities` cascade layers with content-hashed class names (`hash: {className: true}`). styled-components, public exports, component props, and theme CSS variables stay the same (`Arrow` uses `--arrow-size` in place of the previously hashed vanilla-extract `createVar()` custom property).
