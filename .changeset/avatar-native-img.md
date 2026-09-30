---
'@sanity/ui': minor
---

`Avatar` renders its image with a native `<img>` instead of an svg `<image>` pattern fill, so React treats it like any other image: inside a `<ViewTransition>` (or a `<Suspense>` boundary that a transition reveals) React now waits for the avatar image to load, up to a timeout, before it commits, instead of animating an empty circle that the image later pops into. The circle clip, the card and avatar color strokes and the dashed `status="editing"` ring render as before.
