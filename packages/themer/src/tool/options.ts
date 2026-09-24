import {
  BuildThemeOptions,
  DEFAULT_ACCENT,
  DEFAULT_BACKGROUND,
  DEFAULT_CONTRAST,
  deriveTextColor,
  ResolvedSchemeOptions,
  resolveThemeOptions,
  SCHEMES,
  SchemeThemeOptions,
} from '../theme/options'

/**
 * Reduces theme options to the minimal object that recreates them through
 * `buildTheme`: in each scheme the accent is dropped when it is the stock
 * one, the text color when it matches the one derived from the accent, and
 * the background and contrast when they match the defaults — and a scheme
 * with nothing left is dropped altogether. Options that boil down to the
 * stock Studio theme reduce to `null` — they need nothing from this package.
 *
 * @internal
 */
export function minimizeOptions(options: BuildThemeOptions): BuildThemeOptions | null {
  const resolved = resolveThemeOptions(options)
  const minimized: BuildThemeOptions = {}

  for (const scheme of SCHEMES) {
    const values = resolved[scheme]
    const kept: SchemeThemeOptions = {}

    if (values.accent !== DEFAULT_ACCENT) kept.accent = values.accent
    if (values.text !== deriveTextColor(values.accent)) kept.text = values.text
    if (values.background !== DEFAULT_BACKGROUND[scheme]) kept.background = values.background
    if (values.contrast !== DEFAULT_CONTRAST) kept.contrast = values.contrast

    if (Object.keys(kept).length > 0) minimized[scheme] = kept
  }

  return Object.keys(minimized).length === 0 ? null : minimized
}

/**
 * Whether two sets of theme options generate the same theme, comparing their
 * resolved forms so that derived and explicit values (and hex casing) don't
 * matter.
 *
 * @internal
 */
export function sameOptions(a: BuildThemeOptions, b: BuildThemeOptions): boolean {
  const left = resolveThemeOptions(a)
  const right = resolveThemeOptions(b)

  return SCHEMES.every((scheme) => sameScheme(left[scheme], right[scheme]))
}

function sameScheme(a: ResolvedSchemeOptions, b: ResolvedSchemeOptions): boolean {
  return (
    a.accent === b.accent &&
    a.text === b.text &&
    a.background === b.background &&
    a.contrast === b.contrast
  )
}
