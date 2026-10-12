---
'@sanity/ui': patch
---

Fix `MenuButton` not opening its menu when the button's own `onClick` or `onKeyDown` calls `event.preventDefault()`. Those handlers still run first, but 4.4.2's opt-out is gone: the menu opens or toggles whatever they did to the event. Disable the button to keep its menu closed.
