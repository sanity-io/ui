---
"@sanity/ui": minor
---

Migrate the next slice of fully static styles from styled-components to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `MenuDivider`, `VirtualList`, and the toast viewport (the fixed container `ToastProvider` renders toasts into). No API changes — but as with `SrOnly` and `Spinner` since 4.0.0, these components now render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
