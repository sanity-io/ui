---
'@sanity/ui': patch
---

fix(autocomplete): apply a new `value` prop in the render that receives it, and reset the active option as part of closing. The controlled `value` used to be copied into the component's state from an effect, so a parent that set a new value committed one frame that still showed the previous one, and every autocomplete re-rendered once more right after mounting; the prop is now compared with the previous render's prop during render. Blurring (or pressing Escape) used to close the list in one commit and move the active option back to the value in a second one, from an effect reacting to the focus state; the close transition now does both at once. The selection contract is unchanged: a selection or clear that the parent does not answer with a new `value` stays visible until the prop changes, and a `value` prop that becomes `undefined` leaves the current value in place.
