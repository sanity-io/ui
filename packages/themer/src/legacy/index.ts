// The legacy generator moved to `@sanity/themer-legacy`. Each member is
// re-exported through its own declaration rather than `export {x} from`, so
// the `@deprecated` tags survive into the bundled `.d.ts` and TypeScript
// flags imports of them — plain re-exports carry no TSDoc of their own.
import * as themerLegacy from '@sanity/themer-legacy'

/**
 * @deprecated Import `buildThemeFromUrl` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const buildThemeFromUrl: typeof themerLegacy.buildThemeFromUrl =
  themerLegacy.buildThemeFromUrl

/**
 * @deprecated Import `createTheme` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const createTheme: typeof themerLegacy.createTheme = themerLegacy.createTheme

/**
 * @deprecated Import `parseHuesFromUrl` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const parseHuesFromUrl: typeof themerLegacy.parseHuesFromUrl = themerLegacy.parseHuesFromUrl

/**
 * @deprecated Import `hues` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const hues: typeof themerLegacy.hues = themerLegacy.hues

/**
 * @deprecated Import `theme` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const theme: typeof themerLegacy.theme = themerLegacy.theme

/**
 * @deprecated Import `presets` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` re-exports it unchanged for now and will be removed
 * in `@sanity/themer@1.0`.
 * @public
 */
export const presets: typeof themerLegacy.presets = themerLegacy.presets

/**
 * @deprecated Import `Hue` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type Hue = themerLegacy.Hue

/**
 * @deprecated Import `HueMidPoint` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type HueMidPoint = themerLegacy.HueMidPoint

/**
 * @deprecated Import `Hues` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type Hues = themerLegacy.Hues

/**
 * @deprecated Import `LegacyTheme` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type LegacyTheme = themerLegacy.LegacyTheme

/**
 * @deprecated Import `PartialHues` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type PartialHues = themerLegacy.PartialHues

/**
 * @deprecated Import `ThemePreset` from `@sanity/themer-legacy` instead.
 * `@sanity/themer/legacy` will be removed in `@sanity/themer@1.0`.
 * @public
 */
export type ThemePreset = themerLegacy.ThemePreset
