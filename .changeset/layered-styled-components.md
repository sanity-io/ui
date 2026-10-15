---
'@sanity/ui': minor
---

Emit the styled-components rules of `@sanity/ui` components in the `u-styled` CSS cascade layer, so apps can override them through layer order instead of selector specificity.

`@sanity/ui/styles.css` now starts with `@layer u-tokens, u-utilities, u-styled;`, and `ThemeProvider` emits the same statement ahead of the component styles, which keeps component styles above the static styles whichever of the two stylesheets loads first. Any layer that your page declares after them beats `u-styled`. To order one of your layers below `u-styled`, declare the full order yourself before both, for example `@layer reset, u-tokens, u-utilities, u-styled, app;`.

Unlayered CSS now beats `@sanity/ui` component styles regardless of specificity:

- `styled(Button)` and other styled-components extensions also win against more specific `@sanity/ui` selectors, such as hover and selected states.
- Global element rules beat component styles that they used to lose to, for example a `strong { font-weight }` rule against `Text`'s, or `button { background-color: transparent }` from Tailwind CSS v3's preflight against `Button`'s. Move such rules into a layer ordered before `u-styled`, or remove them.
