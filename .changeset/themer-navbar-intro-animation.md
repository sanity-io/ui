---
'@sanity/themer': minor
---

The themer tool introduces itself: the color wheel icon of its navbar toggle plays an animation on hover — the eight slices of the wheel pop in one at a time with the palette's hues in rainbow order, clockwise from 12 o'clock like the segments of a classic spinner, the wheel spins once as the 6 o'clock slice pops in, and the colors pop out the same way round, easing out from the speed the spin reached as if it kept turning for a second lap. Hovering the button plays it every time; hovering the Studio navbar plays it once per page load for anyone who has never opened the sidebar — opening it (from the topbar button or the narrow-screen menu) is remembered in `localStorage`, and the navbar stops introducing the tool. With `prefers-reduced-motion: reduce` the wheel keeps still and only the colors come and go. The navbar action also renders the toggle as a stable component instead of remounting it on every navbar render.
