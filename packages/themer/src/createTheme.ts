import {color, COLOR_TINTS, ColorHueKey, ColorTintKey} from '@sanity/color'
import {buildTheme, RootTheme, ThemeColorPalette, ThemeConfig} from '@sanity/ui/theme'

import {isColor, mix} from './lib/mix'
import {CreateThemeOptions} from './types'

/** The palette hue that each themeable color drives */
const HUE_MAPPING: ReadonlyArray<[option: keyof CreateThemeOptions, hueKey: ColorHueKey]> = [
  ['gray', 'gray'],
  ['primary', 'blue'],
  ['positive', 'green'],
  ['caution', 'yellow'],
  ['critical', 'red'],
]

/**
 * Maps themeable colors to a `@sanity/ui` `ThemeConfig`, for when a theme
 * needs further customization than `createTheme` exposes:
 *
 * ```ts
 * import {themeConfigFromColors} from '@sanity/themer'
 * import {buildTheme} from '@sanity/ui/theme'
 *
 * const theme = buildTheme({
 *   ...themeConfigFromColors({primary: '#2276fc'}),
 *   // ...other ThemeConfig properties
 * })
 * ```
 *
 * @public
 */
export function themeConfigFromColors(colors: CreateThemeOptions): ThemeConfig {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string' && !isColor(value)) {
      throw new TypeError(
        `Invalid color for ${JSON.stringify(key)}: ${JSON.stringify(value)} — expected a hex color`,
      )
    }
  }

  const anchored = Boolean(colors.lightest || colors.darkest)

  if (!anchored && !HUE_MAPPING.some(([option]) => colors[option])) {
    return {}
  }

  const lightest = (colors.lightest ?? color.white.hex).toLowerCase()
  const darkest = (colors.darkest ?? color.black.hex).toLowerCase()

  const palette: ThemeColorPalette = {...color, black: darkest, white: lightest}

  for (const [option, hueKey] of HUE_MAPPING) {
    const mid = colors[option]?.toLowerCase()

    // Untouched ramps only need regenerating when the surface endpoints moved
    if (mid || anchored) {
      palette[hueKey] = buildHueTints({
        mid: mid ?? color[hueKey][500].hex,
        lightest,
        darkest,
      })
    }
  }

  return {palette}
}

/**
 * Generates a Sanity Studio theme from a handful of colors:
 *
 * ```ts
 * import {createTheme} from '@sanity/themer'
 * import {defineConfig} from 'sanity'
 *
 * export default defineConfig({
 *   theme: createTheme({primary: '#2276fc'}),
 *   // ...rest of the config
 * })
 * ```
 *
 * Calling it without options returns the default Sanity Studio theme.
 *
 * @public
 */
export function createTheme(colors: CreateThemeOptions = {}): RootTheme {
  return buildTheme(themeConfigFromColors(colors))
}

/**
 * Interpolates a full tint ramp (50–950) from a mid color placed at the 500
 * tint, sliding towards `lightest` and `darkest` at the extremes.
 */
function buildHueTints(options: {
  mid: string
  lightest: string
  darkest: string
}): Record<ColorTintKey, string> {
  const {mid, lightest, darkest} = options

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the reduce assigns every COLOR_TINTS key, so the Partial is complete
  return COLOR_TINTS.reduce<Partial<Record<ColorTintKey, string>>>((tints, tintKey) => {
    const tint = Number(tintKey)

    if (tint === 500) {
      tints[tintKey] = mid
    } else if (tint < 500) {
      tints[tintKey] = mix(tint / 500, mid, lightest)
    } else {
      tints[tintKey] = mix((tint - 500) / 500, darkest, mid)
    }

    return tints
  }, {}) as Record<ColorTintKey, string>
}
