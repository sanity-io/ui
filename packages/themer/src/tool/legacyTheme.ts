import {
  type Hues,
  hues as hostedDefaults,
  parseHuesFromUrl,
  presets as hostedPresets,
} from '@sanity/themer-legacy'
import {type ThemeColorSchemeKey} from '@sanity/ui/theme'

import {BuildThemeOptions, normalizeColor, SCHEMES, SchemeThemeOptions} from '../theme/options'

/**
 * A hosted Themer URL: the `/api/hues` path and the query after it, up to the
 * quote, whitespace or bracket that ends the URL in a snippet like
 * `import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant'`.
 * Only the query matters — it is all the hosted service read — so any host
 * will do.
 */
const HUES_URL = /\/api\/hues\/?(\?[^\s'"`<>()\\]*)?/g

/** The title of an imported theme that was not based on a hosted preset */
const IMPORTED_TITLE = 'Imported theme'

/**
 * The outcome of looking for a hosted Themer theme in pasted text: there is
 * no URL in it, the URL is one the hosted service would have rejected (with
 * its error message), or the theme converted to `buildTheme` options.
 *
 * @internal
 */
export type LegacyThemeConversion =
  | {status: 'missing'}
  | {status: 'invalid'; message: string}
  | {status: 'converted'; title: string; options: BuildThemeOptions}

/**
 * Converts the theme of a hosted Themer service (themer.sanity.build) URL
 * into `buildTheme` options. The text can be the URL itself or any snippet
 * that holds it — the `import {theme} from 'https://themer.sanity.build/api/hues?…'`
 * line of a Studio config, say — and the URL is parsed exactly like the
 * hosted service did, presets and validation included. The theme is titled
 * after the preset the URL is based on.
 *
 * @internal
 */
export function convertLegacyTheme(text: string): LegacyThemeConversion {
  const query = findLegacyQuery(text)

  if (query === null) return {status: 'missing'}

  let hues: Hues

  try {
    hues = parseHuesFromUrl(query)
  } catch (error) {
    return {status: 'invalid', message: error instanceof Error ? error.message : String(error)}
  }

  const slug = new URLSearchParams(query).get('preset')?.toLowerCase()
  const preset = hostedPresets.find((candidate) => candidate.slug === slug)

  return {
    status: 'converted',
    title: preset?.title ?? IMPORTED_TITLE,
    options: optionsFromLegacyHues(hues),
  }
}

/**
 * The query of the first hosted Themer URL in the text, cleaned up for the
 * parser — or `null` when there is none.
 */
function findLegacyQuery(text: string): string | null {
  for (const match of text.matchAll(HUES_URL)) {
    const query = match[1] ?? ''

    // `themer.d.ts` declares the URL imports as the `?*` wildcard module
    if (query.includes('*')) continue

    return (
      query
        // The service took colors without a `#`, and in a URL it would start the fragment
        .replace(/([=;:])(?:#|%23)/gi, '$1')
        .replace(/#.*$/, '')
        // Punctuation that ends a sentence the URL was pasted in
        .replace(/[.,;:!?]+$/, '')
    )
  }

  return null
}

/**
 * Carries the hues of a hosted Themer theme over into `buildTheme` options
 * the way the presets were: the primary hue becomes the accent, the default
 * hue the text color, and its lightest and darkest colors the light and dark
 * backgrounds — both schemes get the accent and text, as the hosted service
 * had one set of hues for both. Colors the hosted service defaulted to are
 * left to the current defaults instead of pinning the dated ones, so its
 * default theme converts to the stock Studio theme. The other hues and the
 * mid points have no counterpart in `buildTheme`.
 */
function optionsFromLegacyHues(hues: Hues): BuildThemeOptions {
  const shared: SchemeThemeOptions = {}
  const accent = customColor(hues, 'primary', 'mid')
  const text = customColor(hues, 'default', 'mid')

  if (accent) shared.accent = accent
  if (text) shared.text = text

  const backgrounds: Record<ThemeColorSchemeKey, string | undefined> = {
    light: customColor(hues, 'default', 'lightest'),
    dark: customColor(hues, 'default', 'darkest'),
  }

  const options: BuildThemeOptions = {}

  for (const scheme of SCHEMES) {
    const background = backgrounds[scheme]
    const values: SchemeThemeOptions = background ? {...shared, background} : {...shared}

    if (Object.keys(values).length > 0) options[scheme] = values
  }

  return options
}

/** A color of the hues, or `undefined` when it is the one the hosted service defaulted to */
function customColor(
  hues: Hues,
  hue: 'default' | 'primary',
  key: 'mid' | 'lightest' | 'darkest',
): string | undefined {
  const name = `${hue}.${key}`
  const color = normalizeColor(hues[hue][key], name)

  return color === normalizeColor(hostedDefaults[hue][key], name) ? undefined : color
}
