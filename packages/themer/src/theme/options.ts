import {black, blue, gray, white} from '@sanity/color'
import {type ThemeColorSchemeKey} from '@sanity/ui/theme'

import {isColor} from '../lib/mix'
import {hexToHsl, hslToHex} from './hsl'

/**
 * The colors of one color scheme, for {@link BuildThemeOptions}. Every color
 * is a hex color (`#rgb` or `#rrggbb`), and everything is optional: omitted
 * options fall back to the stock Studio colors, so an empty object reproduces
 * the stock scheme exactly.
 *
 * @public
 */
export interface SchemeThemeOptions {
  /**
   * The accent color — the brand color of the scheme. Replaces the `blue`
   * scale of the palette, which Sanity UI uses for primary buttons, focus
   * rings and links.
   *
   * The stock accent is `#556bfc` (`blue/500` of `@sanity/color`).
   */
  accent?: string

  /**
   * The background of the scheme — every other color of the scheme is
   * blended onto it. The dark scheme's background replaces `black` in the
   * palette and the light scheme's replaces `white`.
   *
   * It is kept far enough from the text and accent colors to stay usable:
   * a dark background is made darker until it has enough contrast with them
   * (it can never be lighter than either), and a light background can never
   * be darker than either.
   *
   * The stock backgrounds are `#0d0e12` (dark) and `#ffffff` (light).
   */
  background?: string

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
 * Options for {@link buildTheme} and {@link buildPalette}: the colors of the
 * dark and the light scheme, each with its own accent, text, background and
 * contrast — so the two schemes can differ in more than their background.
 * Both schemes are optional, and so is every color: whatever is omitted
 * falls back to the stock Studio colors, so `buildTheme({})` matches
 * `buildTheme()` from `@sanity/ui/theme` exactly.
 *
 * @public
 */
export interface BuildThemeOptions {
  /** The colors of the dark scheme */
  dark?: SchemeThemeOptions
  /** The colors of the light scheme */
  light?: SchemeThemeOptions
}

/**
 * {@link SchemeThemeOptions} with every option filled in: colors normalized
 * to lowercase `#rrggbb`, the text color derived from the accent when it was
 * omitted, and the contrast clamped into its valid range.
 *
 * @internal
 */
export interface ResolvedSchemeOptions {
  accent: string
  background: string
  contrast: number
  text: string
}

/** {@link BuildThemeOptions} with both schemes resolved @internal */
export type ResolvedThemeOptions = Record<ThemeColorSchemeKey, ResolvedSchemeOptions>

/** The color schemes, in the order the tool presents them @internal */
export const SCHEMES: ThemeColorSchemeKey[] = ['light', 'dark']

/** The stock accent color — `blue/500` of `@sanity/color` @internal */
export const DEFAULT_ACCENT: string = blue[500].hex

/** The stock text color — `gray/500` of `@sanity/color` @internal */
export const DEFAULT_TEXT: string = gray[500].hex

/** The stock backgrounds — `black` and `white` of `@sanity/color` @internal */
export const DEFAULT_BACKGROUND: Record<ThemeColorSchemeKey, string> = {
  dark: black.hex,
  light: white.hex,
}

/** The contrast that applies the text color as-is @internal */
export const DEFAULT_CONTRAST = 85

/** @internal */
export const MINIMUM_CONTRAST = 15

/** @internal */
export const MAXIMUM_CONTRAST = 100

/** The keys of the options shape before they were grouped by scheme */
const FLAT_OPTION_KEYS = ['accent', 'text', 'background', 'contrast']

/** @internal */
export function resolveThemeOptions(options: BuildThemeOptions = {}): ResolvedThemeOptions {
  if (FLAT_OPTION_KEYS.some((key) => key in options)) {
    throw new TypeError(
      'The `buildTheme` options are grouped by color scheme: pass `{light: {accent, text, background, contrast}, dark: {…}}` instead of one set of colors for both',
    )
  }

  return {
    dark: resolveSchemeOptions(options.dark ?? {}, 'dark'),
    light: resolveSchemeOptions(options.light ?? {}, 'light'),
  }
}

function resolveSchemeOptions(
  options: SchemeThemeOptions,
  scheme: ThemeColorSchemeKey,
): ResolvedSchemeOptions {
  const accent =
    options.accent === undefined
      ? DEFAULT_ACCENT
      : normalizeColor(options.accent, `${scheme}.accent`)

  return {
    accent,
    background:
      options.background === undefined
        ? DEFAULT_BACKGROUND[scheme]
        : normalizeColor(options.background, `${scheme}.background`),
    contrast: normalizeContrast(options.contrast, scheme),
    text:
      options.text === undefined
        ? deriveTextColor(accent)
        : normalizeColor(options.text, `${scheme}.text`),
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

  return lower.length === 4
    ? `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}`
    : lower
}

function normalizeContrast(value: number | undefined, scheme: ThemeColorSchemeKey): number {
  if (value === undefined) {
    return DEFAULT_CONTRAST
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(
      `Invalid \`${scheme}.contrast\`: ${JSON.stringify(value)} — expected a number between ${MINIMUM_CONTRAST} and ${MAXIMUM_CONTRAST}`,
    )
  }

  return Math.min(MAXIMUM_CONTRAST, Math.max(MINIMUM_CONTRAST, value))
}
