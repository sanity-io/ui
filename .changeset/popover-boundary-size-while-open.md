---
'@sanity/ui': patch
---

`Popover` only observes the size of its boundary element while it is open. Every popover used to subscribe to a `ResizeObserver` on the boundary from the moment it mounted, so a page with many closed popovers re-rendered all of them on every boundary resize. The boundary is measured synchronously when the popover opens, so its max width is right in the first painted frame, and followed while it stays open. Floating UI itself was already idle while closed (the floating element lives inside a hidden `<Activity>` boundary, which detaches its ref), so a closed popover now holds no boundary or Floating UI observation and no positioning listeners; the only thing it keeps are the intent listeners on its reference element until it has rendered once.

The shared element size observer behind `useElementSize` now forgets an element once its last subscriber unsubscribes, so a later subscriber starts a new observation. It used to keep the element without an observer (or, when another subscriber had left last, keep an observer no one could stop), so a hook that resubscribed to the same element never received a size again.
