---
"@sanity/ui": minor
---

**`Tooltip` and `Popover` keep closed content mounted with React's `<Activity>`.**

- Internal state is preserved and hidden content pre-renders while closed.
- With `animate` enabled, hiding is deferred until exit animations finish (via `AnimateActivity`, vendored from Motion).

Watch out: popovers with recursive `content` must gate the recursion on `open` — otherwise they render an infinitely deep hidden tree.
