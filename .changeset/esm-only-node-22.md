---
"@sanity/ui": major
"@sanity/color": major
"@sanity/logos": major
"@sanity/icons": major
"@sanity/themer": major
---

Drop CommonJS support and require Node.js `>=22.12`

Published packages are now ESM-only. The `require` export condition and CommonJS
build outputs (`.cjs` / `.d.cts`) have been removed from `@sanity/ui`,
`@sanity/color`, and `@sanity/logos`, so they must be consumed via ESM `import`.
`@sanity/icons` and `@sanity/themer` were already ESM-only.

The Node.js `engines` range is raised to `>=22.12` across all published packages
to match `sanity`.
