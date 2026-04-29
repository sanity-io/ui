# @sanity/ui-tokens

## 1.0.0-beta.8

### Patch Changes

- [`1e90c51`](https://github.com/sanity-io/ui/commit/1e90c51459d3abb0388b2879e3e9a34cf63dc04f) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refine CSS token output and namespacing, including exposed primitive/component slot variables, normalized variable identifiers, resolved scheme/tone aliases, namespaced button variants, stable text input output, and RGB transparent colors.

## 1.0.0-beta.7

### Patch Changes

- [`f82aee0`](https://github.com/sanity-io/ui/commit/f82aee0655885270d2f0a8816f6ca0530f700c33) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refine component color tokens and CSS token output.

  This release updates component color tokens to better separate variant-level and interaction-state color decisions, adds component color aliases, and improves support for color mix expressions. Opacity-based colors are now represented as color mix expressions, transparent color tokens are serialized correctly, and precomputed tokens are excluded from CSS output.

  Button styling now includes a pressed state, while obsolete selected button styles have been removed. Input and boolean color variables are now applied correctly in CSS.

## 1.0.0-beta.6

### Patch Changes

- [`8933cce`](https://github.com/sanity-io/ui/commit/8933cceeb2111ad322f206975f19faeaf3b7eec8) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refine v4 token output across color, typography, CSS, Figma sync, and documentation.

  This release adds token-driven color scheme handling, selectable state layer tokens, selectable color variable scopes, and font text transform tokens. It also updates selectable state token paths, heading font scale values, code editor theming, and contrast values for improved light and dark mode behavior.

  Figma sync now projects state layers into modes, includes mode IDs in variable cache keys, supports disabling variable scopes, and syncs font text transform tokens. Workshop/docs styling has also been aligned with the token-driven color scheme behavior.

## 1.0.0-beta.5

### Patch Changes

- [`ef2c65d`](https://github.com/sanity-io/ui/commit/ef2c65df72e02fe9133a62b90aadd0c807b2adb0) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Improves color token handling, CSS token sourcing, and related internal token cleanup.

## 1.0.0-beta.4

### Patch Changes

- [`e004875`](https://github.com/sanity-io/ui/commit/e0048759c5a8ca2f054625c8593a2d920fb0e93f) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refactors layered token and CSS variable internals, adds avatar color tokens, and updates related styling, documentation, and tests.

## 1.0.0-beta.3

### Patch Changes

- [`e4a65a0`](https://github.com/sanity-io/ui/commit/e4a65a065a3a1c42c1d7f8ce1f9eb2a1e2abb361) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Reorganizes UI token and CSS layers, updates token colors and component styling, refreshes package configuration, enables the React Compiler in the workshop, fixes missing `StoryTree` keys, and removes outdated docs and commented code.

## 1.0.0-beta.2

### Patch Changes

- [`b1a7305`](https://github.com/sanity-io/ui/commit/b1a73050b3c95e330b4dd5f7249144c9a09528f7) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Simplifies imports by re-exporting css and token utilities from `@sanity/ui`.

  You must now import everything from the root package:
  - `@sanity/ui/index.css` instead of `@sanity/ui/css/index.css`
  - tokens and css utilities directly from `@sanity/ui`

## 1.0.0-beta.1

### Patch Changes

- [`fb81598`](https://github.com/sanity-io/ui/commit/fb815985aba79b081ef6998201e94f873f64e02e) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Ensure correct build output during publish by switching `prepack` to `turbo run build` across packages.

## 1.0.0-beta.0

### Major Changes

- [`4b06c7e`](https://github.com/sanity-io/ui/commit/4b06c7e7c69ca5c36426d667c9d25e1915dee5a2) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refactor UI architecture with new design tokens and CSS packages.

  This release splits core styling concerns out of `@sanity/ui`:
  - introduce `@sanity/ui-tokens` for design tokens
  - introduce `@sanity/ui-css` for runtime styles
  - update `@sanity/ui` to consume and re-export from these packages
  - include various improvements and internal cleanup

  ⚠️ This is a breaking change and currently released under beta.
