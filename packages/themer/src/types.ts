/**
 * The colors of `CreateThemeOptions`, in the order `createTheme` snippets
 * serialize them.
 *
 * @public
 */
export const COLOR_OPTION_KEYS = [
  'primary',
  'text',
  'positive',
  'caution',
  'critical',
  'lightBackground',
  'darkBackground',
] as const satisfies ReadonlyArray<keyof CreateThemeOptions>

/**
 * The colors that `createTheme` derives a Sanity Studio theme from.
 *
 * Every color is optional — omitted colors keep their default Sanity ramps.
 * All values are hex colors (`#rgb` or `#rrggbb`).
 *
 * @public
 */
export interface CreateThemeOptions {
  /** The brand color — used for buttons, focus rings, links and selections. */
  primary?: string
  /** Tints the text, icons, borders and neutral surfaces. */
  text?: string
  /** The color of positive accents, like success badges. */
  positive?: string
  /** The color of caution accents, like warning badges. */
  caution?: string
  /** The color of critical accents, like errors and destructive actions. */
  critical?: string
  /** The background of the light color scheme, and the lightest surface color. */
  lightBackground?: string
  /** The background of the dark color scheme, and the darkest surface color. */
  darkBackground?: string
}
