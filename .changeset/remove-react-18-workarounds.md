---
"@sanity/ui": patch
---

Remove React 18 workarounds that are obsolete now that React 19.2 is the minimum supported version: the `startTransition` wrappers around the `Autocomplete` and `TreeItem` element-ref state setters (which guarded against a "Maximum update depth exceeded" loop that only occurred on React 18), and the `getElementRef` shim that `Popover` and `Tooltip` used to read a child's ref without triggering the pre-19 `element.ref` warning — on React 19 `ref` is a regular prop and is read as `element.props.ref` directly.
