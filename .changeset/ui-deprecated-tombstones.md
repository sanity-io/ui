---
"@sanity/ui": major
---

Replace deprecated props, hooks, and components with `@deprecated` `never` tombstones and migration instructions.

Removed props remain on public types as `never` so TypeScript still resolves the name and surfaces the deprecation message instead of a bare “does not exist” error. Deprecated hooks (`useClickOutside`, `useArrayProp`, `useForwardedRef`, `useElementRect`) and `ConditionalWrapper` keep callable exports that throw at runtime if used.

Migrate:

- `space` → `gap`
- Grid `columns`/`rows`/`column*`/`row*` → `gridTemplateColumns`/`gridTemplateRows`/`gridColumn*`/`gridRow*`
- Menu `focusFirst`/`focusLast` → `shouldFocus`
- MenuButton top-level popover props → `popover={{…}}`
- Popover `boundaryElement` → `floatingBoundary` / `referenceBoundary`
- Tooltip `allowedAutoPlacements` → `fallbackPlacements`
- `useClickOutside` → `useClickOutsideEvent`
- `useElementRect` → `useElementSize`
- `useForwardedRef` → `useRef` + `useImperativeHandle`
- `useArrayProp(value)` → `Array.isArray(value) ? value : [value]`
