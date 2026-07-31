---
"@sanity/ui": major
"@sanity/themer": patch
---

Move components with heavy dependencies to dedicated subpath entry points.

Importing `@sanity/ui` no longer references `@floating-ui/react-dom`, `motion`
or `react-refractor` — regardless of bundler treeshaking. Components that need
those dependencies now live on their own entry points, grouped with the APIs
they are used together with:

- `@sanity/ui/toast`: `Toast`, `ToastProvider`, `useToast` (motion)
- `@sanity/ui/popover`: `Popover` (@floating-ui/react-dom, motion)
- `@sanity/ui/tooltip`: `Tooltip`, `TooltipDelayGroupProvider`,
  `useTooltipDelayGroup` (@floating-ui/react-dom, motion)
- `@sanity/ui/menu`: `Menu`, `MenuButton`, `MenuDivider`, `MenuGroup`,
  `MenuItem` (renders `Popover`)
- `@sanity/ui/autocomplete`: `Autocomplete` (renders `Popover`)
- `@sanity/ui/breadcrumbs`: `Breadcrumbs` (renders `Popover`)
- `@sanity/ui/code`: `Code` (lazy-loads react-refractor)

Prop, context and message types moved along with their components (e.g.
`PopoverProps`, `ToastParams`, `MenuItemProps`, `AutocompleteState`,
`TooltipDelayGroupContextValue`).

Migrate by importing from the new entry points:

```diff
-import {MenuButton, ToastProvider, useToast} from '@sanity/ui'
+import {MenuButton} from '@sanity/ui/menu'
+import {ToastProvider, useToast} from '@sanity/ui/toast'
```

The root entry point keeps `@deprecated` `never`-typed tombstones for every
moved symbol, so TypeScript surfaces the new location instead of a bare “does
not exist” error. `ErrorBoundary` now renders a plain `<pre><code>` instead of
the `Code` primitive, keeping the root entry free of the `react-refractor`
module graph.

`@sanity/themer` is republished with its imports updated to the new
`@sanity/ui` entry points.
