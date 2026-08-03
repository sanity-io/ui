---
"@sanity/ui": major
"@sanity/themer": major
---

**React 19.2+ required.**

- Peer dependency ranges are tightened to `react: ^19.2` (and `react-dom: ^19.2` for `@sanity/ui`).
- Components are compiled with the React Compiler targeting `'19'`, which uses React's built-in runtime — the `react-compiler-runtime` dependency is dropped.

What to do: upgrade `react` and `react-dom` to 19.2 or later. No code changes needed.
