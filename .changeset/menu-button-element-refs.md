---
'@sanity/ui': patch
---

Remove unnecessary `MenuButton` re-renders when registering elements or hiding and showing them with `<Activity>`, preventing delayed or skipped `<ViewTransition>` animations. Set the forwarded button ref on mount rather than one render later.
