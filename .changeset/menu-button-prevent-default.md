---
'@sanity/ui': patch
---

Fix a regression introduced in 4.4.2 where calling `event.preventDefault()` in the button's `onClick` or `onKeyDown` handler stopped `MenuButton` from opening. These handlers still run first, but `preventDefault()` no longer blocks the menu from opening or toggling. To keep the menu closed, disable the button.
