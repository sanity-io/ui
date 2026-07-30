---
"@sanity/ui": minor
---

Tooltip and Popover now keep their content mounted with React's `<Activity>` when closed, preserving internal state and pre-rendering hidden content. When `animate` is enabled they use `AnimateActivity` (vendored from Motion), which defers hiding until exit animations complete. Popovers with recursive content must gate the recursion on `open` to avoid rendering an infinitely deep hidden tree.
