---
"@sanity/icons": minor
---

Restore React 18 support.

Icon components (and the `Icon` wrapper) are wrapped in `React.forwardRef` again, so refs attach to the underlying `svg` element on React 18 as well as React 19. The `react` peer dependency range is widened from `^19` to `^18 || ^19`, and the Node.js `engines` range from `>=22.12` to `>=20.19 <22 || >=22.12`, matching `@sanity/ui`.
