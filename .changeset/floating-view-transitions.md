---
'@sanity/ui': patch
---

`Popover` and `Tooltip` (and `Menu`, `MenuButton` and `Autocomplete`, which render a `Popover`) no longer make React skip a `<ViewTransition>` animation. `@floating-ui/react-dom` commits every position update with `flushSync()`, so an open popover or tooltip that had to be repositioned while React was preparing a view transition (for example when the transition changed its `placement`) cancelled the animation. While a view transition is active, position updates now wait until it has started animating.
