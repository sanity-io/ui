---
'@sanity/ui': patch
---

`Tooltip` and `Popover` no longer schedule an urgent re-render when the element they are attached to mounts, or when an `<Activity>` hides or shows it. Inside a `<ViewTransition>`, that re-render held up the start of the animation, and made React skip the transition when sync work was flushed while the browser prepared it (a controlled input restoring its value, for example). The child's own `ref` now receives the element in the commit that mounts it.
