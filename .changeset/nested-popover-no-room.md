---
'@sanity/ui': patch
---

Keep a `constrainSize` popover with no room in the area it is measured in, such as a submenu beside the scrolling menu its reference is in, from collapsing to a max width or height of zero. The boundary's cap still applies.
