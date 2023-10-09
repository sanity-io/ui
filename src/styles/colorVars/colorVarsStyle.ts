import {ThemeColorBase, ThemeColorGenericState, cssVars} from '../../theme'
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

    '--card-shadow-outline-color': cssVars.default['base-shadow-outline-color'],
    '--card-shadow-umbra-color': cssVars.default['base-shadow-umbra-color'],
    '--card-shadow-penumbra-color': cssVars.default['base-shadow-penumbra-color'],
    '--card-shadow-ambient-color': cssVars.default['base-shadow-ambient-color'],
    '--card-focus-ring-color': cssVars.positive.bg_accent,
    '--card-icon-color': cssVars.default.icon_default,


    // Card
    '--card-bg-color': color.bg,
    '--card-bg-image': checkered
      ? `repeating-conic-gradient(${cssVars.default.card_base_bg} 0% 25%, ${cssVars.default.bg_tint} 0% 50%)`
      : undefined,
    '--card-fg-color': color.fg,
    '--card-muted-fg-color': color.muted?.fg,
    '--card-accent-fg-color': color.accent?.fg,
    '--card-link-fg-color': color.link?.fg,
    '--card-code-bg-color': color.code?.bg,
    '--card-code-fg-color': color.code?.fg,
    '--card-skeleton-color-from': cssVars.default['skeleton-from'],
    '--card-skeleton-color-to': cssVars.default['skeleton-to'],

    // @todo: deprecate
    '--card-link-color': cssVars.card['link-color'],
    '--card-hairline-soft-color': cssVars.default.border_base,
    '--card-hairline-hard-color': cssVars.default.border_base,

    // Card
    '--card-bg2-color': cssVars.default.bg_tint,
}
