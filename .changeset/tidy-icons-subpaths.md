---
'@sanity/ui': patch
---

bump `@sanity/icons` to v5 and import each icon from its own subpath

`@sanity/icons` v5 removed the individual icon exports from its root entry. The icons themselves are unchanged. Import each one from its own subpath instead:

```diff
-import {AddIcon} from '@sanity/icons'
+import {AddIcon} from '@sanity/icons/Add'
```

The root entry now exports the dynamic `Icon` component and the `icons` map only. Use those when the icon name is known at runtime only.
