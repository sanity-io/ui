---
"@sanity/ui": minor
---

Move fully static styled-components CSS to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `Autocomplete`, `Breadcrumbs`, `Button` (loading overlay), `Checkbox`, `Dialog`, `Hotkeys`, `Layer`, `Menu`, `MenuDivider`, `Radio`, `Select`, `Skeleton`, `Switch`, `Tab`, `TabList`, `TextArea`, `TextInput`, `Toast`, `Tooltip`, `TreeItem` and `VirtualList`. Styles that read the theme or props, or that would have to override a styled-components rule at equal specificity, stay on styled-components. No API changes, but as with `SrOnly` and `Spinner` since 4.0.0, these components now render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
