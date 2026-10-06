---
'@sanity/ui': patch
---

fix(tooltip): derive the hidden state from `disabled` and `content`, and size the tooltip with Floating UI. A tooltip is now hidden in the same render that disables it or empties its `content`, instead of an effect closing it one commit later. The hover state is kept, so a tooltip that is re-enabled (or given content) while its child is still hovered shows right away rather than on the next `mouseenter`. The max width is no longer measured into state from a layout effect; Floating UI's `size` middleware applies it inside the positioning pass, only while the tooltip is shown: the clipping width of the boundary element (or of the clipping ancestors, when there is none) within the viewport, capped to the portal element's width. Tooltips placed `left` or `right` are capped to the room on that side of the reference instead of the full boundary width, so they wrap rather than overlap the reference or spill out of the boundary.
