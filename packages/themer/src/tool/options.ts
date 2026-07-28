import {
  BuildThemeOptions,
  DEFAULT_ACCENT,
  DEFAULT_BACKGROUND_DARK,
  DEFAULT_BACKGROUND_LIGHT,
  DEFAULT_CONTRAST,
  deriveTextColor,
  resolveThemeOptions,
} from '../theme/options'

/**
 * Reduces theme options to the minimal object that recreates them through
 * `buildTheme`: the text color is dropped when it matches the one derived
 * from the accent, and backgrounds and contrast are dropped when they match
 * the defaults. Options that boil down to the stock Studio theme reduce to
 * `null` — they need nothing from this package.
 *
 * @internal
 */
export function minimizeOptions(options: BuildThemeOptions): BuildThemeOptions | null {
  const resolved = resolveThemeOptions(options)
  const minimized: BuildThemeOptions = {accent: resolved.accent}

  if (resolved.text !== deriveTextColor(resolved.accent)) {
    minimized.text = resolved.text
  }

  const dark = resolved.background.dark === DEFAULT_BACKGROUND_DARK ? null : resolved.background.dark
  const light =
    resolved.background.light === DEFAULT_BACKGROUND_LIGHT ? null : resolved.background.light

  if (dark !== null || light !== null) {
    minimized.background = {}
    if (dark !== null) minimized.background.dark = dark
    if (light !== null) minimized.background.light = light
  }

  if (resolved.contrast !== DEFAULT_CONTRAST) {
    minimized.contrast = resolved.contrast
  }

  if (minimized.accent === DEFAULT_ACCENT && Object.keys(minimized).length === 1) {
    return null
  }

  return minimized
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

  return (
    left.accent === right.accent &&
    left.text === right.text &&
    left.background.dark === right.background.dark &&
    left.background.light === right.background.light &&
    left.contrast === right.contrast
  )
}
