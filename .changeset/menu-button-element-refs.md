---
'@sanity/ui': patch
---

`MenuButton` no longer schedules a state update when its button mounts, unmounts, or is hidden and shown again by an `<Activity>`, nor when its menu registers its elements as it opens. The button element and the menu elements used to be set into state from ref callbacks, which React schedules at Immediate priority as they run in the commit phase. Inside a React 19.3 `<ViewTransition>` such an update is committed as soon as the transition that reveals (or hides) the button is ready to animate, right before its first frame, and as a pending sync update it made React skip the transition should anything flush sync work while the browser was still preparing it. The button that opened the menu is now set into state as the menu opens (it is what the menu returns focus to), the menu elements live in a ref the click-outside and blur handlers read, and the forwarded `ref` is attached to the button directly, so it holds the element from the commit that mounts it on, where it was set one render later before.

`Popover` no longer reattaches the `ref` of its child on every commit: it now does so only when the reference element or that `ref` changes, so a callback `ref` — the one `MenuButton` forwards to its button among them — is no longer detached and attached again each time the popover opens, closes or repositions.
