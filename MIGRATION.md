# Migration guides

- [Upgrade from `@sanity/ui` v3 to v4](#sanityui-from-v3-to-v4)
- [Upgrade from `@sanity/ui` v2 to v3](#sanityui-from-v2-to-v3)

If you upgrade directly from v2 to v4, complete the v2-to-v3 steps first, and then complete the v3-to-v4 steps.

## `@sanity/ui`: from v3 to v4

v4 modernizes the runtime without redesigning components. If your app is already on current tooling, the migration is one stylesheet import plus some import path updates — TypeScript walks you through the rest: every removed or moved API is kept in the types as a `@deprecated` tombstone whose message names its replacement.

Not ready to upgrade? v3 is maintained on the [`v3` branch](https://github.com/sanity-io/ui/tree/v3): `3.x` fixes land there and are published under the `release-v3` npm dist-tag.

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

Without it, `SrOnly`, `Spinner` and internal text-overflow styling render unstyled.

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

## `@sanity/themer`: from 0.3 to 0.4

`@sanity/themer` 0.4 has no API changes — it adopts the same runtime requirements as `@sanity/ui` v4 (ESM-only, Node.js 22.12+, React 19.2+) and updates its internals to the new `@sanity/ui` entry points.

## `@sanity/ui`: from v2 to v3

v3 updates the Node.js requirement and the syntax-highlighting dependencies. Most applications only need to update Node.js and `@sanity/ui`. Applications that use `react-refractor` or `refractor` directly must also update those imports.

Work through the checklist top to bottom:

1. [Upgrade Node.js](#1-upgrade-nodejs)
2. [Upgrade `@sanity/ui`](#2-upgrade-sanityui)
3. [Update direct `react-refractor` usage](#3-update-direct-react-refractor-usage)
4. [Test syntax highlighting](#4-test-syntax-highlighting)

### 1. Upgrade Node.js

v2 supports Node.js 14 or later. v3 supports these Node.js versions:

- `>=20.19 <22`
- `>=22.12`

Node.js 22.0 through 22.11 is not supported.

Check the installed version:

```sh
node --version
```

Upgrade Node.js before you install v3 if the installed version is outside the supported ranges.

### 2. Upgrade `@sanity/ui`

Install the latest v3 release:

```sh
npm install @sanity/ui@^3
```

You do not need to change code that only uses the `Code` component from `@sanity/ui`. Its internal implementation already supports the updated syntax-highlighting dependencies.

### 3. Update direct `react-refractor` usage

v3 updates these dependencies:

- `refractor`: 4.9.0 → 5.0.0
- `react-refractor`: 2.2.0 → 4.0.0

This update addresses [CVE-2024-53382](https://github.com/advisories/GHSA-x7hr-w5r2-h6wg).

If your application imports `react-refractor` or `refractor` directly, make these changes:

- Use the named `Refractor` export instead of the default export.
- Import languages from `refractor/<language>` instead of `refractor/lang/<language>`.
- Use the separate `registerLanguage` and `hasLanguage` functions instead of methods on `Refractor`.

```diff
-import Refractor from 'react-refractor'
-import javascript from 'refractor/lang/javascript'
+import {Refractor, hasLanguage, registerLanguage} from 'react-refractor'
+import javascript from 'refractor/javascript'

-Refractor.registerLanguage(javascript)
-const registered = Refractor.hasLanguage('javascript')
+registerLanguage(javascript)
+const registered = hasLanguage('javascript')
```

Complete example:

```tsx
// v2
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)

function MyComponent() {
  return <Refractor language="javascript" value="const x = 1" />
}
```

```tsx
// v3
import {Refractor, registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'

registerLanguage(javascript)
registerLanguage(json)

function MyComponent() {
  return <Refractor language="javascript" value="const x = 1" />
}
```

### 4. Test syntax highlighting

Test each code path that uses syntax highlighting. Confirm that each registered language still works.

For more information:

- [`@sanity/ui` changelog](packages/ui/CHANGELOG.md)
- [`refractor` 5.0.0 release notes](https://github.com/wooorm/refractor/releases/tag/5.0.0)
- [`react-refractor` 4.0.0 release notes](https://github.com/rexxars/react-refractor/releases/tag/v4.0.0)
- [Open an issue](https://github.com/sanity-io/ui/issues/new)
