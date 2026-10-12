---
'@sanity/ui': patch
---

fix(menu): `MenuGroup` derives its pressed state and whether its child menu is open during render, instead of resetting them from effects one commit later. Hovering a sibling item now closes the child menu and clears the pressed state in the same commit that activates the sibling. The child menu opens and closes in a transition, as `Popover` asks of `open`, so the item's highlight shows right away while a slow child menu renders in the background.

- A click or `ArrowRight` on a `MenuGroup` that is not the active item now makes it the active item as it opens the child menu. This only changes a click with no `mouseenter` before it, such as `fireEvent.click(menuGroup)` in a test.
- A `MenuGroup` rendered with `as="a"` or `as="div"` renders `data-pressed` only while pressed. It used to render `data-pressed="false"`, which painted an `as="a"` group in its pressed colour.
