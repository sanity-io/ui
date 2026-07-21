---
"@sanity/ui": minor
---

update dependency @sanity/icons to ^5.2.0

`@sanity/ui` now imports every icon from its per-icon export path (e.g. `@sanity/icons/Close`) instead of the root barrel, so only the handful of icons the components actually render are pulled into your bundle.
