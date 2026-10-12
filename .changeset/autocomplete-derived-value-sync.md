---
'@sanity/ui': patch
---

fix(autocomplete): follow the `value` prop during render, and open the results list in a deferred render. A changed `value` shows in the render that receives it instead of an effect applying it one commit later, and a `value` equal to the one shown (a parent echoing `onChange`) no longer drops a query typed since. The keystroke, focus or click that opens the list paints before the option components render, so it no longer waits for them (filtering the options and calling `renderOption` still happen before that paint). The list still closes in the same render as the selection, clear, blur or Escape that closes it. Opening the list on focus no longer moves focus into it when the selected option is a link or a button, and `aria-activedescendant` is only set while the list shows.
