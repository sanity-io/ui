---
'@sanity/ui': minor
---

`MenuButton` composes the `onClick`, `onKeyDown` and `onMouseDown` handlers on its `button` element with its own instead of replacing them. A handler on the button element runs first, and one that calls `event.preventDefault()` keeps `MenuButton` from acting on that event: a click or key press whose default is prevented does not toggle the menu, and `MenuButton` leaves the default of a press on the button of an open menu alone. Handlers on the button element used to be dropped silently.

`onOpen` and `onClose` are now called from the event that opens or closes the menu, before the new state is committed, instead of from an effect after the commit that rendered it. State set in those callbacks commits together with the menu's own open state, and a callback that moves focus does so before the browser paints the open or closed menu. Each callback is still called once per transition, including when closing moves focus back to the button.
