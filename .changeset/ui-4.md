---
"@sanity/ui": major
---

**`@sanity/ui` 4.0.** The full upgrade procedure is in the [migration guide](https://github.com/sanity-io/ui/blob/main/MIGRATION.md). TypeScript walks you through most of it: every removed or moved API stays in the types as a `@deprecated` tombstone whose message names its replacement.

**ESM-only. Node.js 22.12+ required.**

- The CommonJS build (`.cjs` / `.d.cts`) and the `require` export condition are removed — the package now ships ESM only.
- Node.js below 22.12 is no longer supported (`engines` is now `>=22.12`, matching `sanity`).
- What to do: run Node.js 22.12 or later — that's it. Modern Node supports `require(esm)`, so `require('@sanity/ui')` keeps working; things only break if the Node.js version is too old.

**React 19.2+ required.**

- Peer dependency ranges are tightened to `react: ^19.2` and `react-dom: ^19.2`. The 19.2 floor is set by the new [`<Activity>`](https://react.dev/reference/react/Activity) component, which shipped in React 19.2.0 and which v4 uses to keep closed `Tooltip` and `Popover` content mounted.
- Components are compiled with the React Compiler targeting `'19'`, which uses React's built-in runtime — the `react-compiler-runtime` dependency is dropped.
- What to do: upgrade `react` and `react-dom` to 19.2 or later. No code changes needed.

**New required import: `@sanity/ui/styles.css`.**

Static styles (the ones that don't depend on theme or props) are now extracted into a stylesheet at build time instead of being injected at runtime. The stylesheet is **not** loaded automatically — add this import once, next to where the app renders `<ThemeProvider>`:

```js
import "@sanity/ui/styles.css"
```

Without it, `SrOnly`, `Spinner` and internal text-overflow styling render unstyled. These styles moved from styled-components to [vanilla-extract](https://vanilla-extract.style/).

**Heavy components moved out of the root entry point.**

Importing `@sanity/ui` no longer pulls in `@floating-ui/react-dom`, `motion` or `react-refractor` — even without bundler treeshaking. What moved where:

- `@sanity/ui/toast` — `Toast`, `ToastProvider`, `useToast` (motion)
- `@sanity/ui/popover` — `Popover` (@floating-ui/react-dom, motion)
- `@sanity/ui/tooltip` — `Tooltip`, `TooltipDelayGroupProvider`, `useTooltipDelayGroup` (@floating-ui/react-dom, motion)
- `@sanity/ui/menu` — `Menu`, `MenuButton`, `MenuDivider`, `MenuGroup`, `MenuItem` (renders `Popover`)
- `@sanity/ui/autocomplete` — `Autocomplete` (renders `Popover`)
- `@sanity/ui/breadcrumbs` — `Breadcrumbs` (renders `Popover`)
- `@sanity/ui/code` — `Code` (lazy-loads react-refractor)

Prop, context and message types moved along with their components (`PopoverProps`, `ToastParams`, `MenuItemProps`, `AutocompleteState`, `TooltipDelayGroupContextValue`, …). Update the imports:

```diff
-import {MenuButton, ToastProvider, useToast} from '@sanity/ui'
+import {MenuButton} from '@sanity/ui/menu'
+import {ToastProvider, useToast} from '@sanity/ui/toast'
```

Also part of this change: `ErrorBoundary` renders a plain `<pre><code>` instead of the `Code` primitive, keeping the root entry free of the `react-refractor` module graph.

**Deprecated props, hooks, and components are removed.**

Removed props stay on the public types as `@deprecated` `never`, so you get the migration message instead of a bare "does not exist" error. The removed hooks and `ConditionalWrapper` are still exported but throw when called. What to replace:

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
- `ConditionalWrapper` → inline the conditional wrapping logic

**The private `@sanity/ui/_visual-editing` entry point is removed.**

Import from `@sanity/ui` instead. The slim subset is no longer needed: `displayName` side effects are gone, so unused components tree-shake out of consuming bundles.

**The `@juggle/resize-observer` polyfill is removed — the native `ResizeObserver` is used directly.**

The internal `_ResizeObserver` export is gone. If you imported it, use the global `ResizeObserver` instead.

**`Tooltip` and `Popover` keep closed content mounted with React's `<Activity>`.**

- Internal state is preserved and hidden content pre-renders while closed.
- With `animate` enabled, hiding is deferred until exit animations finish (via `AnimateActivity`, vendored from Motion).
- Watch out: popovers with recursive `content` must gate the recursion on `open` — otherwise they render an infinitely deep hidden tree.

**All components are plain function components — `ref` is a regular prop (React 19 semantics).**

Refs keep working exactly as before. The one observable change: components no longer pass `react-is` checks such as `isForwardRef`.
