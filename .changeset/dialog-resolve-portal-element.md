---
'@sanity/ui': patch
---

fix(dialog): scope click-outside and focus handling to the portal element the dialog renders into. `Dialog` now resolves its portal element with the same function as `Portal`, so a dialog with a `portal` name whose entry is missing falls back to the `default` portal element for its scoping, as it already did for rendering. Previously it resolved `null` in that case, which disabled the scoping: clicks and Escape presses from anywhere in the document closed the dialog, and focus leaving the boundary and portal elements after a click inside the dialog was not moved back.
