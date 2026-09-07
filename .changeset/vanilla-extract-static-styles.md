---
"@sanity/ui": minor
---

Move the remaining fully static styled-components CSS to [vanilla-extract](https://vanilla-extract.style/), served from `@sanity/ui/styles.css`: `Arrow`, `Avatar` and `AvatarStack`. Styles that read the theme or props stay on styled-components.

Return the equal-specificity overrides that 4.1.0 shipped as doubled vanilla-extract selectors (`&&`) to styled-components: the `Breadcrumbs` expand button margin, the inner `Hotkeys` key display, the `Toast` loading bar background, and the `TextInput` prefix, suffix and clear button card. Those rules have to beat a runtime rule on the same element, so keeping both rules in the runtime stylesheet makes them win regardless of when `@sanity/ui/styles.css` loads.

Restore the `TreeItem` toggle arrow rotation transition, which 4.1.0 dropped.

No API changes. As with `SrOnly` and `Spinner` since 4.0.0, these components render unstyled unless the app imports the stylesheet once:

```js
import "@sanity/ui/styles.css"
```
