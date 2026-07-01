---
"@sanity/icons": patch
---

Remove the unused `esm.sh` bundling override from `package.json`. It was added back when the package still shipped a CommonJS build; now that `@sanity/icons` is ESM-only with a single bundled entry point, esm.sh's default bundling behaviour has nothing extra to bundle, so the override is no longer needed.
