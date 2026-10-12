---
'@sanity/ui': patch
---

`MenuButton` no longer schedules a state update when its button mounts, unmounts, or is hidden and shown again by an `<Activity>`, nor when its menu opens and registers its elements. Revealing a menu button inside a React 19.3 `<ViewTransition>` starts the animation without a re-render in the way, and a sync flush while the browser prepares that transition no longer cancels it. The forwarded `ref` holds the button from the commit that mounts it (it was set one render later before).
