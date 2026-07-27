/**
 * The colors of `CreateThemeOptions`, in the order `createTheme` snippets
 * serialize them.
 *
 * @public
 */
export const COLOR_OPTION_KEYS = [
  'primary',
  'text',
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
  /** The background of the light color scheme, and the lightest surface color. */
  lightBackground?: string
  /** The background of the dark color scheme, and the darkest surface color. */
  darkBackground?: string
}
