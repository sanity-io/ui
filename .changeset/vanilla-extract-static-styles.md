---
"@sanity/ui": minor
---

Move fully static styled-components CSS to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `Autocomplete`, `Breadcrumbs`, `Button` (loading overlay), `Checkbox`, `Dialog`, `Hotkeys`, `Layer`, `Menu`, `MenuDivider`, `Radio`, `Select`, `Skeleton`, `Switch`, `Tab`, `TabList`, `TextArea`, `TextInput`, `Toast`, `Tooltip`, `TreeItem` and `VirtualList`. Styles that read the theme or props stay on styled-components. Equal-specificity overrides of those migrated components use doubled vanilla-extract class selectors (`&&`) where the library itself has to beat a runtime rule.

`MenuDivider` is now a plain component rather than a `styled.hr`. `styled(MenuDivider)` wraps through `className` instead of extending the styled component, and `${MenuDivider}` component selectors no longer work.

Equal-specificity consumer overrides of migrated components (for example `styled(Layer)` with `position: fixed`, or `styled(MenuDivider)` with `height: 20px`) win only if `@sanity/ui/styles.css` loads before styled-components' runtime style tags. That is the usual case when the stylesheet is in the entry chunk.

As with `SrOnly` and `Spinner` since 4.0.0, these components render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
