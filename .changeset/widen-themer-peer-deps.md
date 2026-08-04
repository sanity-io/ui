---
"@sanity/themer": minor
---

Widen `@sanity/themer` peer dependencies. `react` now allows `^18 || >=19.0.0-0` (so consumers of only `@sanity/themer/legacy` don't hit peer dep errors on React 18), and `sanity` now allows `^3 || ^4 || ^5 || ^6` to support the migration path off the hosted themer.sanity.build service. These peer dep ranges do not indicate whether `themerTool` itself will work.
