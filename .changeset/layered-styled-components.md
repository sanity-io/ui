---
'@sanity/ui': minor
---

Emit the styled-components rules of `@sanity/ui` components in the `u-styled` CSS cascade layer, so apps can override them through layer order instead of selector specificity.

`ThemeProvider` declares the order `@layer sui, u-tokens, u-utilities, u-styled;`, which keeps component styles above the layers of `@sanity/ui/styles.css` wherever that stylesheet loads. Any layer that your page declares after it beats `u-styled`. To order one of your layers below `u-styled`, declare the full order yourself in a stylesheet that loads before styled-components' `<style>` tag, for example `@layer reset, sui, u-tokens, u-utilities, u-styled, app;`.

Unlayered CSS now beats `@sanity/ui` component styles regardless of specificity:

- `styled(Button)` and other styled-components extensions also win against more specific `@sanity/ui` selectors, such as hover and selected states.
- Global element rules beat component styles that they used to lose to, for example a `strong { font-weight }` rule against `Text`'s, or `button { background-color: transparent }` from Tailwind CSS v3's preflight against `Button`'s. Move such rules into a layer ordered before `u-styled`, or remove them.
