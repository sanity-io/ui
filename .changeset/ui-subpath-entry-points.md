---
"@sanity/ui": major
---

**Heavy components moved out of the root entry point.**

Importing `@sanity/ui` no longer pulls in `@floating-ui/react-dom`, `motion` or `react-refractor` — even without bundler treeshaking.

What moved where:

- `@sanity/ui/toast` — `Toast`, `ToastProvider`, `useToast` (motion)
- `@sanity/ui/popover` — `Popover` (@floating-ui/react-dom, motion)
- `@sanity/ui/tooltip` — `Tooltip`, `TooltipDelayGroupProvider`, `useTooltipDelayGroup` (@floating-ui/react-dom, motion)
- `@sanity/ui/menu` — `Menu`, `MenuButton`, `MenuDivider`, `MenuGroup`, `MenuItem` (renders `Popover`)
- `@sanity/ui/autocomplete` — `Autocomplete` (renders `Popover`)
- `@sanity/ui/breadcrumbs` — `Breadcrumbs` (renders `Popover`)
- `@sanity/ui/code` — `Code` (lazy-loads react-refractor)

Prop, context and message types moved along with their components (`PopoverProps`, `ToastParams`, `MenuItemProps`, `AutocompleteState`, `TooltipDelayGroupContextValue`, …).

What to do — update the imports:

```diff
-import {MenuButton, ToastProvider, useToast} from '@sanity/ui'
+import {MenuButton} from '@sanity/ui/menu'
+import {ToastProvider, useToast} from '@sanity/ui/toast'
```

TypeScript points the way: every moved symbol stays on the root entry as a `@deprecated` `never` tombstone naming its new location, instead of a bare "does not exist" error.

Also part of this change: `ErrorBoundary` renders a plain `<pre><code>` instead of the `Code` primitive, keeping the root entry free of the `react-refractor` module graph.
