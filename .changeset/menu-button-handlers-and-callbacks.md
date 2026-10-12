---
'@sanity/ui': patch
---

Fix `MenuButton` event handling:

- Preserve the button's `onClick`, `onKeyDown`, and `onMouseDown` handlers. They run first; `event.preventDefault()` skips the menu's default action.
- Call `onOpen` and `onClose` during the triggering event, batching their state updates with the menu's. `onOpen` now runs before the menu renders, and callback errors are not caught by error boundaries.
