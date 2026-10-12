---
'@sanity/ui': patch
---

`Avatar`, `AvatarCounter`, `Button` and `Switch` now load more of their styles from `@sanity/ui/styles.css` instead of generating them with JavaScript at runtime. This reduces runtime styling work while keeping the combined JavaScript and CSS download size nearly unchanged.

The components keep the same appearance, props and HTML structure. Theme-dependent and responsive styles continue to work as before, including `Button`'s `width="fill"` option.

**When upgrading:**

- Keep importing `@sanity/ui/styles.css` in your app's entry point.
- If you customize these components with styled-components, make sure that stylesheet loads before styled-components' generated style tags. When your custom CSS targets an element with the same selector specificity as the library's CSS, the rule loaded last wins. For example, a `white-space` override in `styled(Button)` now depends on this order.

This is the same stylesheet load-order requirement introduced for other components in 4.1.0 and 4.2.0. If your app already follows it, no changes are needed.
