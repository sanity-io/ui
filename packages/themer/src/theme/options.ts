import {black, blue, gray, white} from '@sanity/color'

import {isColor} from '../lib/mix'
import {hexToHsl, hslToHex} from './hsl'

/**
 * Options for {@link buildTheme} and {@link buildPalette}.
 *
 * Every color is a hex color (`#rgb` or `#rrggbb`). Passing the stock values
 * for every option — or just `accent: '#556bfc'` on its own — reproduces the
 * `@sanity/color` palette exactly, so the generated theme matches
 * `buildTheme()` from `@sanity/ui/theme` with no options.
 *
 * @public
 */
export interface BuildThemeOptions {
  /**
   * The accent color — the brand color of the theme. Replaces the `blue`
   * scale of the palette, which Sanity UI uses for primary buttons, focus
   * rings and links.
   *
   * The stock accent is `#556bfc` (`blue/500` of `@sanity/color`).
   */
  accent: string

  /**
   * The backgrounds of the two color schemes. `dark` replaces `black` in the
   * palette and `light` replaces `white` — every other color of a scheme is
   * blended onto them.
   *
   * Both are kept far enough from the text and accent colors to stay usable:
   * `dark` is made darker until it has enough contrast with them (it can
   * never be lighter than either), and `light` can never be darker than
   * either.
   *
   * The stock backgrounds are `#0d0e12` (dark) and `#ffffff` (light).
   */
  background?: {
    /** The dark scheme background — defaults to `#0d0e12` */
    dark?: string
    /** The light scheme background — defaults to `#ffffff` */
    light?: string
  }

  /**
   * How strongly text and borders separate from the accent color, between 15
   * and 100. The default is 85, which uses the text color as-is. Above 85 the
   * text scale loses its tint until it is fully neutral at 100 — a high
   * contrast scheme with no mixing of the text and accent colors. Below 85
   * more and more of the accent color mixes into the text scale, giving text
   * and borders more color, until the scale fully adopts the accent hue and
   * saturation at 15.
   */
  contrast?: number

  /**
   * The text color. Replaces the `gray` scale of the palette, which Sanity UI
   * uses for text, icons, borders and neutral surfaces. When omitted, it is
   * derived from the accent color: a mostly desaturated version of it, the
   * way the stock `gray` scale carries a hint of the stock blue.
   *
   * The stock text color is `#727892` (`gray/500` of `@sanity/color`).
   */
  text?: string
}

/**
 * {@link BuildThemeOptions} with every option filled in: colors normalized to
 * lowercase `#rrggbb`, the text color derived from the accent when it was
 * omitted, and the contrast clamped into its valid range.
 *
 * @internal
 */
export interface ResolvedThemeOptions {
  accent: string
  background: {dark: string; light: string}
  contrast: number
  text: string
}

/** The stock accent color — `blue/500` of `@sanity/color` @internal */
export const DEFAULT_ACCENT: string = blue[500].hex

/** The stock text color — `gray/500` of `@sanity/color` @internal */
export const DEFAULT_TEXT: string = gray[500].hex

/** The stock dark scheme background — `black` of `@sanity/color` @internal */
export const DEFAULT_BACKGROUND_DARK: string = black.hex

/** The stock light scheme background — `white` of `@sanity/color` @internal */
export const DEFAULT_BACKGROUND_LIGHT: string = white.hex

/** The contrast that applies the text color as-is @internal */
export const DEFAULT_CONTRAST = 85

/** @internal */
export const MINIMUM_CONTRAST = 15

/** @internal */
export const MAXIMUM_CONTRAST = 100

/** @internal */
export function resolveThemeOptions(options: BuildThemeOptions): ResolvedThemeOptions {
  const accent = normalizeColor(options.accent, 'accent')

  return {
    accent,
    background: {
      dark:
        options.background?.dark === undefined
          ? DEFAULT_BACKGROUND_DARK
          : normalizeColor(options.background.dark, 'background.dark'),
      light:
        options.background?.light === undefined
          ? DEFAULT_BACKGROUND_LIGHT
          : normalizeColor(options.background.light, 'background.light'),
    },
    contrast: normalizeContrast(options.contrast),
    text: options.text === undefined ? deriveTextColor(accent) : normalizeColor(options.text, 'text'),
  }
}

/**
 * Derives the text color from an accent color, keeping the relationship the
 * stock palette has between `gray/500` and `blue/500`: the text color takes
 * the accent's hue (offset the way the stock gray is offset from the stock
 * blue), carries about an eighth of its saturation, and keeps the stock text
 * lightness. Deriving from the stock accent returns the stock text color.
 *
 * @internal
 */
export function deriveTextColor(accent: string): string {
  const accentHsl = hexToHsl(normalizeColor(accent, 'accent'))
  const defaultAccent = hexToHsl(DEFAULT_ACCENT)
  const defaultText = hexToHsl(DEFAULT_TEXT)

  return hslToHex({
    h: defaultText.h + (accentHsl.h - defaultAccent.h),
    s: Math.min(1, defaultText.s * (accentHsl.s / defaultAccent.s)),
    l: defaultText.l,
  })
}

function normalizeColor(value: string, name: string): string {
  if (typeof value !== 'string' || !isColor(value)) {
    throw new TypeError(
      `Invalid \`${name}\` color: ${JSON.stringify(value)} — expected a hex color like #556bfc`,
    )
  }

  const lower = value.toLowerCase()

  return lower.length === 4 ? `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}` : lower
}

function normalizeContrast(value: number | undefined): number {
  if (value === undefined) {
    return DEFAULT_CONTRAST
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(
      `Invalid \`contrast\`: ${JSON.stringify(value)} — expected a number between ${MINIMUM_CONTRAST} and ${MAXIMUM_CONTRAST}`,
    )
  }

  return Math.min(MAXIMUM_CONTRAST, Math.max(MINIMUM_CONTRAST, value))
}
