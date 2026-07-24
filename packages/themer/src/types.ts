/**
 * The colors of `CreateThemeOptions`, in the order `createTheme` snippets
 * serialize them.
 *
 * @public
 */
export const COLOR_OPTION_KEYS = [
  'primary',
  'gray',
  'positive',
  'caution',
  'critical',
  'lightest',
  'darkest',
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
  /** Tints the neutral colors (surfaces, borders and text). */
  gray?: string
  /** The brand color — used for buttons, focus rings, links and selections. */
  primary?: string
  /** The color of positive accents, like success badges. */
  positive?: string
  /** The color of caution accents, like warning badges. */
  caution?: string
  /** The color of critical accents, like errors and destructive actions. */
  critical?: string
  /** The lightest surface color — the background of the light color scheme. */
  lightest?: string
  /** The darkest surface color — the background of the dark color scheme. */
  darkest?: string
}
