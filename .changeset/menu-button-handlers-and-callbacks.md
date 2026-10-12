---
'@sanity/ui': minor
---

`MenuButton` composes the `onClick`, `onKeyDown` and `onMouseDown` handlers of its `button` element with its own instead of dropping them. They run first, and calling `event.preventDefault()` in one keeps `MenuButton` from acting on that event.

`onOpen` and `onClose` are called from the event that opens or closes the menu instead of from an effect after the commit, so state set in them commits together with the menu's open state. Since they run in the event handler, the menu is not rendered open yet when `onOpen` runs, and an error thrown in them is not caught by an error boundary.
