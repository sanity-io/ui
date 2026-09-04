---
"@sanity/ui": minor
---

Migrate another slice of fully static styles from styled-components to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `Menu`, `Layer`, and `Tab`. No API changes — but as with `SrOnly` and `Spinner` since 4.0.0, these components now render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
