---
'@sanity/ui': minor
---

Emit the styled-components rules of `@sanity/ui` components in the `u-styled` CSS cascade layer, so apps can override them through layer order instead of selector specificity.

`u-styled` must come after the `u-tokens` and `u-utilities` layers of `@sanity/ui/styles.css`, and the page sets that order, since a layer takes its place the first time the page mentions it. Load `styles.css` before styled-components' `<style data-styled>` tag, or declare `@layer u-tokens, u-utilities, u-styled;` in global CSS that loads before anything else (see the README). If `styles.css` can load after styled-components' tag, for example on a lazily loaded route, add the statement: without it, static styles win over component styles they should lose to. In Next.js, declare it in the root layout.

Unlayered normal declarations now beat `@sanity/ui` component styles regardless of specificity:

- `styled(Button)` and other styled-components extensions also win against more specific `@sanity/ui` selectors, such as hover and selected states.
- Global element rules beat component styles that they used to lose to, for example a `strong { font-weight }` rule against `Text`'s, or `button { background-color: transparent }` from Tailwind CSS v3's preflight against `Button`'s. Move such rules into a layer ordered before `u-styled`, or remove them.

`!important` declarations work the other way round: a layered one beats an unlayered one, and an earlier layer beats a later one. An unlayered `!important` override now loses to the few `!important` rules of `@sanity/ui`, on autofilled, disabled and read-only `TextInput` and `TextArea`, icon paths inside `Text`, and `Checkbox`'s check mark. Put such an override in a layer declared before `u-styled` instead.
