---
'@sanity/ui': patch
---

fix(tooltip): keep the referred element mounted when `disabled` toggles. The disabled branch used to return the bare child while the enabled branch returned a fragment with the tooltip, so flipping `disabled` changed the tree shape and remounted the reference element (losing its DOM node, state and focus). Both branches now render the same fragment, with the tooltip slot empty while disabled.
