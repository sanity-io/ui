---
'@sanity/ui': patch
---

Fix `Autocomplete` value syncing, responsiveness, and focus:

- Apply `value` changes immediately without clearing a typed query when the parent echoes the current value.
- Defer option component rendering when opening the list; filtering and `renderOption` still run before paint. Closing remains immediate.
- Keep input focus when opening the list on focus, even if the selected option is a link or button.
- Set `aria-activedescendant` only while the list is visible.
