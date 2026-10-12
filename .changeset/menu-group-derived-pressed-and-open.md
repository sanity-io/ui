---
'@sanity/ui': patch
---

Fix `MenuGroup` state and styling:

- Clear pressed and child-menu state as soon as a sibling becomes active.
- Transition child-menu updates so slow rendering does not delay the item's highlight.
- Activate the group when a click or `ArrowRight` opens its child menu, even without a preceding hover.
- Only set `data-pressed` while pressed for `as="a"` and `as="div"`, fixing incorrect pressed styling on links.
