import {ThemeColorBase, ThemeColorGenericState} from '../../theme'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 */
export function _colorVarsStyle(
  _base: ThemeColorBase,
  color: ThemeColorGenericState,
  checkered = false,
): CSSObject {
  return {
    // Card
    '--card-bg-color': color.bg,
    '--card-bg-image': checkered
      ? `repeating-conic-gradient(${color.bg} 0% 25%, ${color.bg2 || color.bg} 0% 50%)`
      : undefined,
    '--card-fg-color': color.fg,
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
