---
"@sanity/themer": minor
---

**Node.js 22.12+ and React 19.2+ required.**

- The `engines` range is raised to `>=22.12`, matching `sanity` and `@sanity/ui`. The package was already ESM-only.
- The `react` peer dependency range is tightened to `^19.2`, and the package is compiled with the React Compiler targeting `'19'`, which uses React's built-in runtime — the `react-compiler-runtime` dependency is dropped.
- Internal imports are updated to the new `@sanity/ui` subpath entry points (`@sanity/ui/toast`, `@sanity/ui/tooltip`, `@sanity/ui/code`).

What to do: run Node.js 22.12 or later and upgrade `react` to 19.2 or later. No code changes needed.
