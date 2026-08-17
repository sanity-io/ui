import {buildTheme as buildUITheme, RootTheme} from '@sanity/ui/theme'

import {buildPalette} from './buildPalette'
import {BuildThemeOptions} from './options'

/**
 * Generates a Studio theme from a handful of colors, by replacing the color
 * palette that the `buildTheme` from `@sanity/ui/theme` otherwise fills with
 * `@sanity/color`: the accent color replaces the `blue` scale (primary
 * buttons, focus rings, links), the optional text color the `gray` scale
 * (text, icons, borders), and the optional backgrounds replace `black` and
 * `white`. The result is the same type of theme that `@sanity/ui/theme`
 * builds, ready for the `theme` property of a Studio config.
 *
 * ```ts
 * import {buildTheme} from '@sanity/themer'
 * import {defineConfig} from 'sanity'
 *
 * export const theme = buildTheme({
 *   accent: '#556bfc',
 *   text: '#727892', // optional — derived from `accent` when omitted
 *   background: {dark: '#0d0e12', light: '#ffffff'}, // optional
 *   contrast: 85, // optional, 15–100
 * })
 *
 * export default defineConfig({
 *   theme,
 *   // ...rest of the config
 * })
 * ```
 *
 * Called with the stock colors — like the example — it returns the exact
 * same colors as `buildTheme()` from `@sanity/ui/theme` with no options.
 *
 * @public
 */
export function buildTheme(options: BuildThemeOptions): RootTheme {
  return buildUITheme({palette: buildPalette(options)})
}
