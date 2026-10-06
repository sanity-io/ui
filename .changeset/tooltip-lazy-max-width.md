---
'@sanity/ui': patch
---

`Tooltip` measures the boundary, portal and `document.body` widths it caps its max width to only when it opens. Previously it read their `offsetWidth` on mount and whenever the boundary or portal element changed, and the React Compiler also lifted `portalElement?.offsetWidth` into a render-time memo dependency — a forced synchronous layout per tooltip per render, which adds up in forms with many tooltips.
