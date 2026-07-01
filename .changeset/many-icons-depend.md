---
'@sanity-labs/ui-poc': patch
---

Move `@sanity/icons` and `react-refractor` from `peerDependencies` to `dependencies` so consumers no longer get peer dependency warnings on npm/yarn/bun. Only `react` and `react-dom` remain peer dependencies.
