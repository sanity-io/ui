---
"@sanity/themer": minor
---

Widen `@sanity/themer` peer dependencies. `react` now allows `^18 || >=19.0.0-0`, `sanity` allows `^3 || ^4 || ^5 || ^6`, and `styled-components` allows `^5.2 || ^6`. This avoids peer dependency errors for consumers using only `@sanity/themer/legacy` as a migration path off the hosted themer.sanity.build service. These peer dependency ranges do not indicate whether `themerTool` itself will work.
