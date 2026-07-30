---
"@sanity/ui": major
"@sanity/icons": major
"@sanity/logos": major
"@sanity/themer": major
---

Require React 19.2+, compile with the React 19 compiler target, and drop `react-compiler-runtime`.

With `babel-plugin-react-compiler` targeting `'19'`, the compiler uses React’s built-in runtime instead of the separate `react-compiler-runtime` package. Peer dependency ranges are tightened to `^19.2` (and `react-dom` for `@sanity/ui`).
