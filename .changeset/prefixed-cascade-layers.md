---
'@sanity/ui': patch
---

Name the cascade layers in `@sanity/ui/styles.css` `u-reset`, `u-base`, `u-tokens`, `u-recipes`, and `u-utilities` instead of Panda's defaults. `@layer utilities` breaks Tailwind v3 (`@layer utilities` is used but no matching `@tailwind utilities` directive is present) and merges with other Panda bundles on the same page. Class names are unchanged. If you declare a layer order, list the `u-` names.
