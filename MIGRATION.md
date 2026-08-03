# Migration guide

## `@sanity/ui`: from v3 to v4

v4 modernizes the runtime without redesigning components. If your app is already on current tooling, the migration is one stylesheet import plus some import path updates — TypeScript walks you through the rest: every removed or moved API is kept in the types as a `@deprecated` tombstone whose message names its replacement.

Work through the checklist top to bottom:

1. [Upgrade the runtime](#1-upgrade-the-runtime) — Node.js 22.12+, React 19.2+, ESM-only
2. [Import the stylesheet](#2-import-the-stylesheet) — `import '@sanity/ui/styles.css'`
3. [Update imports for moved components](#3-update-imports-for-moved-components)
4. [Replace removed deprecated APIs](#4-replace-removed-deprecated-apis)
5. [Less common removals](#5-less-common-removals)
6. [Behavior changes to review](#6-behavior-changes-to-review)

### 1. Upgrade the runtime

- **ESM-only.** The CommonJS build (`.cjs` / `.d.cts`) and the `require` export condition are removed — the package now ships ESM only. This is not a code change for consumers: modern Node.js supports `require(esm)`, so `require('@sanity/ui')` keeps working on the supported Node.js versions.
- **Node.js 22.12 or later** (`engines` is `>=22.12`, matching `sanity`).
- **React 19.2 or later** — peer dependencies are `react: ^19.2` and `react-dom: ^19.2`. Components are compiled with the React Compiler targeting React 19, using React's built-in runtime.
- `styled-components` stays a peer dependency (`^5.2 || ^6`).

```sh
npm install @sanity/ui@^4 react@^19.2 react-dom@^19.2
```

### 2. Import the stylesheet

Static styles (the ones that don't depend on theme or props) are extracted into a stylesheet at build time instead of being injected at runtime, and the stylesheet is **not** loaded automatically.

Add this import once, next to where the app renders `<ThemeProvider>`:

```js
import '@sanity/ui/styles.css'
```

Without it, `SrOnly`, `Spinner` and internal text-overflow styling render unstyled. This is the first slice — more styles move into the stylesheet over time, so the import is required from v4 on. The export path is the same one future versions use, so it carries over unchanged.

### 3. Update imports for moved components

Components with heavy dependencies moved to dedicated subpath entry points, so importing `@sanity/ui` no longer pulls in `@floating-ui/react-dom`, `motion` or `react-refractor` — even without bundler treeshaking.

| Entry point               | Exports                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `@sanity/ui/toast`        | `Toast`, `ToastProvider`, `useToast`                           |
| `@sanity/ui/popover`      | `Popover`                                                      |
| `@sanity/ui/tooltip`      | `Tooltip`, `TooltipDelayGroupProvider`, `useTooltipDelayGroup` |
| `@sanity/ui/menu`         | `Menu`, `MenuButton`, `MenuDivider`, `MenuGroup`, `MenuItem`   |
| `@sanity/ui/autocomplete` | `Autocomplete`                                                 |
| `@sanity/ui/breadcrumbs`  | `Breadcrumbs`                                                  |
| `@sanity/ui/code`         | `Code`                                                         |

Prop, context and message types moved along with their components (`PopoverProps`, `ToastParams`, `MenuItemProps`, `AutocompleteState`, `TooltipDelayGroupContextValue`, …).

```diff
-import {MenuButton, ToastProvider, useToast} from '@sanity/ui'
+import {MenuButton} from '@sanity/ui/menu'
+import {ToastProvider, useToast} from '@sanity/ui/toast'
```

You don't need to hunt these down by hand: every moved symbol is still declared on the root entry as a `@deprecated` `never` tombstone, so TypeScript reports the new location at each usage instead of a bare "does not exist" error.

### 4. Replace removed deprecated APIs

Everything that was deprecated during v3 is removed in v4. Removed props stay on the public types as `@deprecated` `never` (you get the migration message, not a mystery error), and removed hooks are still exported but throw when called.

| Removed                                            | Use instead                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `space` prop                                       | `gap`                                                                                                     |
| Grid `columns` / `rows` / `column*` / `row*` props | `gridTemplateColumns` / `gridTemplateRows` / `gridColumn*` / `gridRow*`                                   |
| Menu `focusFirst` / `focusLast` props              | `shouldFocus`                                                                                             |
| MenuButton top-level popover props                 | `popover={{…}}`                                                                                           |
| Popover `boundaryElement` prop                     | `floatingBoundary` / `referenceBoundary` (plus `BoundaryElementProvider` for max-width / `constrainSize`) |
| Tooltip `allowedAutoPlacements` prop               | `fallbackPlacements`                                                                                      |
| `useClickOutside`                                  | `useClickOutsideEvent`                                                                                    |
| `useElementRect`                                   | `useElementSize`                                                                                          |
| `useForwardedRef`                                  | `useRef` + `useImperativeHandle`                                                                          |
| `useArrayProp(value)`                              | `Array.isArray(value) ? value : [value]`                                                                  |
| `ConditionalWrapper`                               | inline the conditional wrapping logic                                                                     |

### 5. Less common removals

- **`@sanity/ui/_visual-editing` is removed.** Import from `@sanity/ui` instead. The slim private subset is no longer needed: `displayName` side effects are gone, so unused components tree-shake out of consuming bundles.
- **The internal `_ResizeObserver` export is removed** along with the `@juggle/resize-observer` polyfill. Use the global `ResizeObserver`.

### 6. Behavior changes to review

- **`Tooltip` and `Popover` keep closed content mounted** with React's `<Activity>`, preserving internal state and pre-rendering hidden content. With `animate` enabled, hiding is deferred until exit animations finish. Popovers with recursive `content` must gate the recursion on `open` — otherwise they render an infinitely deep hidden tree.
- **All components are plain function components** that take `ref` as a regular prop (React 19 semantics). Refs keep working exactly as before, but components no longer pass `react-is` checks such as `isForwardRef`.

## `@sanity/themer`: from 0.2 to 0.3

`@sanity/themer` 0.3 has no API changes — it adopts the same runtime requirements as `@sanity/ui` v4 (ESM-only, Node.js 22.12+, React 19.2+) and updates its internals to the new `@sanity/ui` entry points.
