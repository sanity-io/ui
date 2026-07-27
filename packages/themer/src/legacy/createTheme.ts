import {applyHues} from './applyHues'
import {parseHuesFromSearchParams} from './parseHuesFromSearchParams'
import {getPreset} from './presets'
import {themeFromHues} from './themeFromHues'
import {Hues, LegacyTheme, PartialHues} from './types'

/**
 * Generates a Studio theme from hues, producing the same colors as importing
 * the theme from the hosted Themer service (themer.sanity.build):
 *
 * ```ts
 * import {createTheme, hues} from '@sanity/themer/legacy'
 * import {defineConfig} from 'sanity'
 *
 * export default defineConfig({
 *   theme: createTheme({...hues, primary: {...hues.primary, mid: '#22fca8'}}),
 *   // ...rest of the config
 * })
 * ```
 *
 * @public
 */
export function createTheme(hues: PartialHues = {}): LegacyTheme {
  return themeFromHues(hues)
}

/**
 * Parses the hues encoded in a hosted Themer service URL, returning the exact
 * hues that `https://themer.sanity.build/api/hues` served for that query —
 * presets and overrides included.
 *
 * ```ts
 * import {createTheme, parseHuesFromUrl} from '@sanity/themer/legacy'
 *
 * const hues = parseHuesFromUrl(
 *   'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8',
 * )
 * const theme = createTheme(hues)
 * ```
 *
 * @public
 */
export function parseHuesFromUrl(url: string | URL): Hues {
  const {searchParams} = new URL(url, 'https://themer.sanity.build/api/hues')
  const preset = getPreset(searchParams.get('preset'))

  return applyHues(parseHuesFromSearchParams(searchParams), preset.hues)
}

/**
 * The one-line replacement for a theme imported from the hosted Themer
 * service — pass the URL that used to be imported:
 *
 * ```ts
 * // Before:
 * // import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant'
 *
 * // After:
 * import {buildThemeFromUrl} from '@sanity/themer/legacy'
 *
 * const theme = buildThemeFromUrl(
 *   'https://themer.sanity.build/api/hues?preset=verdant',
 * )
 * ```
 *
 * @public
 */
export function buildThemeFromUrl(url: string | URL): LegacyTheme {
  return createTheme(parseHuesFromUrl(url))
}
