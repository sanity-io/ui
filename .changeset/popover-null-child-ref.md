---
'@sanity/ui': patch
---

Fix `Popover` crashing when its child forwards a ref that is null. A closed `Tooltip` does this: it forwards its floating card, which is not mounted yet, and React 19 passes that null to the ref callback `Popover` clones on for hover intent. `addEventListener` then ran on null. A null ref and a ref that moves to another element now detach any intent listeners already attached, and a null ref attaches none.
