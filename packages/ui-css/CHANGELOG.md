# @sanity/ui-css

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
