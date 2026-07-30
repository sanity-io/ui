---
"@sanity/ui": major
"@sanity/themer": major
---

Drop CommonJS support and require Node.js `>=22.12`

`@sanity/ui` is now ESM-only. The `require` export condition and CommonJS build
outputs (`.cjs` / `.d.cts`) have been removed, so it must be consumed via ESM
`import`. `@sanity/themer` was already ESM-only.

The Node.js `engines` range on `@sanity/ui` and `@sanity/themer` is raised to
`>=22.12` to match `sanity`.
