---
'@sanity/ui': patch
---

Remove unnecessary `Tooltip` and `Popover` re-renders when their reference element mounts or `<Activity>` hides or shows it, preventing delayed or skipped `<ViewTransition>` animations. Set child refs on mount and preserve them when `Popover` uses a separate `referenceElement`.
