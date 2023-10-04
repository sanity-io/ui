import {ColorTints} from '@sanity/color'
import {
  ThemeColorBase,
  ThemeColorGenericState,
  ThemeColorName,
  ThemeColorSchemeKey,
} from '../../theme'
import {createVars} from '../../theme/lib/theme/color/cssVars'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 */
export function _colorVarsStyle(
  base: ThemeColorBase,
  color: ThemeColorGenericState,
  checkered = false,
): CSSObject {
  return {
    // Base
    // @todo: rename to "--base-"?
    '--card-shadow-outline-color': base.shadow.outline,
    '--card-shadow-umbra-color': base.shadow.umbra,
    '--card-shadow-penumbra-color': base.shadow.penumbra,
    '--card-shadow-ambient-color': base.shadow.ambient,
    '--card-focus-ring-color': base.focusRing,

    // Card
    '--card-bg-color': color.bg,
    '--card-bg-image': checkered
      ? `repeating-conic-gradient(${color.bg} 0% 25%, ${color.bg2 || color.bg} 0% 50%)`
      : undefined,
    '--card-fg-color': color.fg,
    '--card-border-color': color.border,
    '--card-muted-fg-color': color.muted?.fg,
    '--card-accent-fg-color': color.accent?.fg,
    '--card-link-fg-color': color.link?.fg,
    '--card-code-bg-color': color.code?.bg,
    '--card-code-fg-color': color.code?.fg,
    '--card-skeleton-color-from': color.skeleton?.from,
    '--card-skeleton-color-to': color.skeleton?.to,

    // @todo: deprecate
    '--card-link-color': color.link?.fg,
    '--card-hairline-soft-color': color.border,
    '--card-hairline-hard-color': color.border,
  }
}

/**
 * @internal
 * Creates CSS variables for the given theme color scheme and tones, used in cards to create a new context for variables.
 */
export function _cssVarStyles(
  scheme: ThemeColorSchemeKey,
  tones: Record<ThemeColorName, ColorTints>,
): CSSObject {
  const cssVariables = createVars(scheme, tones)

  return cssVariables.reduce((acc: CSSObject, cssVar) => {
    acc[cssVar.name] = cssVar.value

    return acc
  }, {})
}
