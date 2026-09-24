import {
  buildTheme as buildUITheme,
  RootTheme,
  ThemeColorSchemes_v2,
  v0_v2,
  v2_v0,
} from '@sanity/ui/theme'

import {buildPalette} from './buildPalette'
import {BuildThemeOptions} from './options'

/**
 * Generates a Studio theme from a handful of colors per color scheme, by
 * replacing the color palette that the `buildTheme` from `@sanity/ui/theme`
 * otherwise fills with `@sanity/color`: in each scheme the accent color
 * replaces the `blue` scale (primary buttons, focus rings, links), the
 * optional text color the `gray` scale (text, icons, borders), and the
 * optional background replaces `black` (dark) or `white` (light). The result
 * is the same type of theme that `@sanity/ui/theme` builds, ready for the
 * `theme` property of a Studio config.
 *
 * ```ts
 * import {buildTheme} from '@sanity/themer'
 * import {defineConfig} from 'sanity'
 *
 * export const theme = buildTheme({
 *   light: {
 *     accent: '#556bfc',
 *     text: '#727892', // optional — derived from `accent` when omitted
 *     background: '#ffffff', // optional
 *     contrast: 85, // optional, 15–100
 *   },
 *   dark: {
 *     accent: '#556bfc',
 *     background: '#0d0e12',
 *   },
 * })
 *
 * export default defineConfig({
 *   theme,
 *   // ...rest of the config
 * })
 * ```
 *
 * Every option is optional and falls back to the stock Studio colors: called
 * with the stock colors — like the example — or with no options at all, it
 * returns the exact same colors as `buildTheme()` from `@sanity/ui/theme`.
 *
 * @public
 */
export function buildTheme(options: BuildThemeOptions = {}): RootTheme {
  const palettes = buildPalette(options)

  // Sanity UI renders both schemes of a theme from one palette, so each
  // scheme gets a theme of its own palette, and the two are composed into one
  // theme that takes its light scheme from the one and its dark scheme from
  // the other. The scheme getters keep Sanity UI's lazy rendering: a scheme is
  // only computed once something reads it.
  const light = v0_v2(buildUITheme({palette: palettes.light}))
  const dark = v0_v2(buildUITheme({palette: palettes.dark}))

  const color: ThemeColorSchemes_v2 = {
    get light() {
      return light.color.light
    },
    get dark() {
      return dark.color.dark
    },
  }

  return v2_v0({...light, color})
}
