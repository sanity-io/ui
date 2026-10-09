---
'@sanity/ui': patch
---

fix(autocomplete): a new `value` prop shows in the render that receives it, not one commit later, and closing the list (blur, Escape) puts the active option back on the value in the same step instead of a commit later, and ends keyboard navigation in the list (an arrow key pressed before the list showed no longer moves focus into it on the next open). Every autocomplete also stops re-rendering once more right after mounting.

The results list opens one render after it is asked for, at transition priority (in the same render when that render is already a transition), so that opening never interrupts the popover's pre-render or holds up the input; it closes in the same commit as the selection, clear, blur or Escape that closes it. The list counts as expanded only while there are results to show — matching options, or a custom `renderPopover` that is not waiting for options — so results arriving for a pending query are what opens it, and `aria-expanded` no longer claims a popup that is not rendered. The open button stays disabled for as long as a query is in progress, as before. Opening the list leaves focus in the input, however focusable the selected option is (a link, say); an arrow key moves it into the list. `aria-activedescendant` is set only while the list shows.

The `value` prop keeps winning when it changes to another value. A `value` equal to the one shown — a parent echoing the selection it was just told about, or the `''` it was told about for a clear — no longer drops a query the user has started since. A selection or clear the parent does not answer with a new `value` stays visible, and a `value` that becomes `undefined` leaves the current value in place; both are unchanged and now documented on `value` and `onChange`.

`TextInput` attaches a forwarded callback ref once, instead of detaching and re-attaching it on every render.
