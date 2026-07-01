---
"@sanity/icons": major
---

Drop CommonJS support and require Node.js `>=22.12`

`@sanity/icons` is now ESM-only. The `require` export condition and the CommonJS build output (`./dist/index.cjs`) have been removed, so the package must be consumed via ESM `import`. The minimum supported Node.js version has been raised to `>=22.12` to match `sanity`.
