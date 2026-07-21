---
"@sanity/ui": patch
---

fix(deps): update dependency @sanity/icons to ^5.2.0

`@sanity/ui` now imports every icon from its per-icon export path (e.g. `@sanity/icons/Close`) instead of the root barrel, so only the handful of icons the components actually render are pulled into your bundle. `@sanity/icons` v5 is ESM-only, which matches the Node.js versions `@sanity/ui` already supports (`>=20.19 <22 || >=22.12` — the ranges where `require(esm)` works), and v5.2 restores the React 18 peer range.
