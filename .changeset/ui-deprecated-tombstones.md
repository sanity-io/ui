---
"@sanity/ui": major
---

**Deprecated props, hooks, and components are removed.**

TypeScript still recognizes the old names: removed props stay on the public types as `@deprecated` `never`, so you get the migration message instead of a bare "does not exist" error. The removed hooks and `ConditionalWrapper` are still exported but throw when called.

What to replace:

- `space` → `gap`
- Grid `columns` / `rows` / `column*` / `row*` → `gridTemplateColumns` / `gridTemplateRows` / `gridColumn*` / `gridRow*`
- Menu `focusFirst` / `focusLast` → `shouldFocus`
- MenuButton top-level popover props → `popover={{…}}`
- Popover `boundaryElement` → `floatingBoundary` / `referenceBoundary` (and `BoundaryElementProvider` for max-width / `constrainSize`)
- Tooltip `allowedAutoPlacements` → `fallbackPlacements`
- `useClickOutside` → `useClickOutsideEvent`
- `useElementRect` → `useElementSize`
- `useForwardedRef` → `useRef` + `useImperativeHandle`
- `useArrayProp(value)` → `Array.isArray(value) ? value : [value]`
