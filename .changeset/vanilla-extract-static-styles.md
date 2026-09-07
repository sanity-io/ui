---
"@sanity/ui": minor
---

Move the remaining fully static styled-components CSS to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `Arrow`, `Avatar` and `AvatarStack`. Styles that read the theme or props stay on styled-components.

No API changes. As with `SrOnly` and `Spinner` since 4.0.0, these components render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
