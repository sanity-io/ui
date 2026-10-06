---
'@sanity/ui': patch
---

`ElementQuery` no longer reads `window.innerWidth` during render. It starts its `ResizeObserver` from a layout effect, so the browser delivers the element's width after layout and before the first paint, and it writes `data-eq-min` / `data-eq-max` onto the element from the observer callback instead of through state. The first paint now reflects the element's own width rather than the viewport's, a resize no longer re-renders the component, and the component is safe to render on the server.
