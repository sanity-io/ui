---
'@sanity/ui': patch
---

fix(menu): `MenuGroup` derives its pressed state and whether its child menu is shown during render. The item is pressed while its child menu is open and the pointer (or, after `ArrowRight`, the focus) is within it, and the child menu is shown only while the item is its menu's active item. Both used to be kept in sync by effects that reset `withinMenu` and `open` one commit after the fact; hovering a sibling item now closes the child menu and clears the pressed state in the same commit as the activation that caused it. Hover, click and `ArrowRight` open, `ArrowLeft` and child item clicks close, and the `aria-pressed` / `data-pressed` / `data-selected` attributes behave as before.
