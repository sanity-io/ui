---
'@sanity/ui': patch
---

`LayerProvider` registers a layer with its parent in a layout effect instead of a passive effect, so the parent's `isTopLayer` and `size` are up to date before the browser paints. React defers passive effects until a `<ViewTransition>` animation has finished, which left the parent layer of a `Dialog`, `Popover` or `Layer` mounted in a view transition unaware of it (and still handling Escape and outside clicks as the top layer) for the whole animation.
