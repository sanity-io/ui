---
'@sanity/ui': patch
---

fix(tree): read the items from the DOM when a key is pressed, and derive the tab stop from the focused item. `Tree` no longer copies its items into state from an effect after every `children` change, which cost a second commit whenever the tree re-rendered and kept the arrow keys from reaching items that mounted without `children` changing (such as items rendered by a nested component).

The focused (or `selected`) item is the tab stop while it is mounted. Before that, and after it unmounts, the tree element is the tab stop (`tabindex="0"`, or the `tabIndex` you pass, also in server-rendered markup) and passes focus on to the first item. There used to be no tab stop until an effect had run, and none at all after the focused item unmounted. A press between the items no longer moves focus, and `useTree().focusedElement` is `null` until an item is focused or `selected`, instead of the first item.

The arrow keys skip items that cannot take focus (such as hidden ones), leave keys pressed in content inside an item to that content (and so does `Enter`), and keep working after tabbing back onto an item with an `href`.
