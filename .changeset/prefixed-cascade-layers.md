---
'@sanity/ui': patch
---

Fix compatibility with Tailwind CSS v3 and other Panda CSS bundles by prefixing the CSS layer names in `@sanity/ui/styles.css` with `u-`. This prevents Tailwind build errors and keeps Sanity UI's layers separate from other libraries' layers. CSS class names are unchanged.
