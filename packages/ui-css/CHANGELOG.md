# @sanity/ui-css

## 1.0.0-beta.6

### Patch Changes

- [`8933cce`](https://github.com/sanity-io/ui/commit/8933cceeb2111ad322f206975f19faeaf3b7eec8) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refine v4 token output across color, typography, CSS, Figma sync, and documentation.

  This release adds token-driven color scheme handling, selectable state layer tokens, selectable color variable scopes, and font text transform tokens. It also updates selectable state token paths, heading font scale values, code editor theming, and contrast values for improved light and dark mode behavior.

  Figma sync now projects state layers into modes, includes mode IDs in variable cache keys, supports disabling variable scopes, and syncs font text transform tokens. Workshop/docs styling has also been aligned with the token-driven color scheme behavior.

- Updated dependencies [[`8933cce`](https://github.com/sanity-io/ui/commit/8933cceeb2111ad322f206975f19faeaf3b7eec8)]:
  - @sanity/ui-tokens@1.0.0-beta.6

## 1.0.0-beta.5

### Patch Changes

- [`ef2c65d`](https://github.com/sanity-io/ui/commit/ef2c65df72e02fe9133a62b90aadd0c807b2adb0) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Improves color token handling, CSS token sourcing, and related internal token cleanup.

- Updated dependencies [[`ef2c65d`](https://github.com/sanity-io/ui/commit/ef2c65df72e02fe9133a62b90aadd0c807b2adb0)]:
  - @sanity/ui-tokens@1.0.0-beta.5

## 1.0.0-beta.4

### Patch Changes

- [`e004875`](https://github.com/sanity-io/ui/commit/e0048759c5a8ca2f054625c8593a2d920fb0e93f) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refactors layered token and CSS variable internals, adds avatar color tokens, and updates related styling, documentation, and tests.

- Updated dependencies [[`e004875`](https://github.com/sanity-io/ui/commit/e0048759c5a8ca2f054625c8593a2d920fb0e93f)]:
  - @sanity/ui-tokens@1.0.0-beta.4

## 1.0.0-beta.3

### Patch Changes

- [`e4a65a0`](https://github.com/sanity-io/ui/commit/e4a65a065a3a1c42c1d7f8ce1f9eb2a1e2abb361) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Reorganizes UI token and CSS layers, updates token colors and component styling, refreshes package configuration, enables the React Compiler in the workshop, fixes missing `StoryTree` keys, and removes outdated docs and commented code.

- Updated dependencies [[`e4a65a0`](https://github.com/sanity-io/ui/commit/e4a65a065a3a1c42c1d7f8ce1f9eb2a1e2abb361)]:
  - @sanity/ui-tokens@1.0.0-beta.3

## 1.0.0-beta.2

### Patch Changes

- [`b1a7305`](https://github.com/sanity-io/ui/commit/b1a73050b3c95e330b4dd5f7249144c9a09528f7) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Simplifies imports by re-exporting css and token utilities from `@sanity/ui`.

  You must now import everything from the root package:
  - `@sanity/ui/index.css` instead of `@sanity/ui/css/index.css`
  - tokens and css utilities directly from `@sanity/ui`

- Updated dependencies [[`b1a7305`](https://github.com/sanity-io/ui/commit/b1a73050b3c95e330b4dd5f7249144c9a09528f7)]:
  - @sanity/ui-tokens@1.0.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- [`fb81598`](https://github.com/sanity-io/ui/commit/fb815985aba79b081ef6998201e94f873f64e02e) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Ensure correct build output during publish by switching `prepack` to `turbo run build` across packages.

- Updated dependencies [[`fb81598`](https://github.com/sanity-io/ui/commit/fb815985aba79b081ef6998201e94f873f64e02e)]:
  - @sanity/ui-tokens@1.0.0-beta.1

## 1.0.0-beta.0

### Major Changes

- [`4b06c7e`](https://github.com/sanity-io/ui/commit/4b06c7e7c69ca5c36426d667c9d25e1915dee5a2) Thanks [@mariuslundgard](https://github.com/mariuslundgard)! - Refactor UI architecture with new design tokens and CSS packages.

  This release splits core styling concerns out of `@sanity/ui`:
  - introduce `@sanity/ui-tokens` for design tokens
  - introduce `@sanity/ui-css` for runtime styles
  - update `@sanity/ui` to consume and re-export from these packages
  - include various improvements and internal cleanup

  ⚠️ This is a breaking change and currently released under beta.

### Patch Changes

- Updated dependencies [[`4b06c7e`](https://github.com/sanity-io/ui/commit/4b06c7e7c69ca5c36426d667c9d25e1915dee5a2)]:
  - @sanity/ui-tokens@1.0.0-beta.0
