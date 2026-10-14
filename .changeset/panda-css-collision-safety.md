---
'@sanity/ui': patch
---

- Replace vanilla-extract with Panda CSS for much stronger guarantees against CSS class name collisions. Static CSS now uses CSS `@layer`, making it easier to override even when userland CSS loads out of order.
- Keep public exports, component props, theme CSS variables, and styled-components behavior unchanged.
- Prefix hashed Panda class names with `u-` and guard against future class name reuse.
- Hash Panda-generated CSS variables and generate stricter style types.
- Omit the internal `#styled-system/*` build-time alias from the published package.
