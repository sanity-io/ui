import {ThemeColorToneKey, cssVars} from '../../theme'
import {mutableCardVariables} from '../../theme/lib/theme/color/cssVariables/cardVariables'
import {getToneCssVar} from '../../theme/lib/theme/color/cssVariables/tones'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 * Card overrides in disabled states
 */
export function _colorVarStyleDisabled(checkered = false): CSSObject {
  return {
    [getToneCssVar('default', 'text-link')]: cssVars.default['text-secondary'],
    [getToneCssVar('default', 'text-accent')]: cssVars.default['text-secondary'],
    [getToneCssVar('default', 'text-code')]: cssVars.default['text-secondary'],
    [getToneCssVar('default', 'text-primary')]: cssVars.default['text-secondary'],

    [mutableCardVariables['fg-color']]: cssVars.primary['text-secondary'],
    [mutableCardVariables['muted-fg-color']]: cssVars.primary['text-secondary'],
    [mutableCardVariables['icon-color']]: cssVars.primary['border-base'],
    [mutableCardVariables['accent-color']]: cssVars.primary['base-bg-card'],
    [mutableCardVariables['bg-color']]: cssVars.primary['bg-tint'],
    [mutableCardVariables['bg-image']]: checkered
      ? `repeating-conic-gradient(${cssVars.default['base-bg-card']} 0% 25%, ${cssVars.default['bg-tint']} 0% 50%)`
      : undefined,
  }
}

/**
 * @internal
 * Card overrides in selected states
 */
export function _colorVarStyleSelected(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-accent'],
    [mutableCardVariables['fg-color']]: cssVars.default['bg-base'],
    [mutableCardVariables['muted-fg-color']]: cssVars.default['base-bg-card'],
    [mutableCardVariables['accent-color']]: cssVars.default['base-bg-card'],
    [mutableCardVariables['icon-color']]: cssVars.primary['bg-base'],
  }
}

/**
 * @internal
 * Card overrides in hover
 */
export function _colorVarStyleHover(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-base-hover'],
    [getToneCssVar('default', 'bg-tint')]: cssVars.default['bg-base-active'],
  }
}

/**
 * @internal
 * Card overrides in active / pressed states
 */
export function _colorVarStyleActive(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-base-active'],
  }
}

/**
 * @internal
 * Selectable needs to redefine bg-color and fg-color
 */
export function _selectableVarStyle(tone: ThemeColorToneKey): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: 'inherit',
    [mutableCardVariables['fg-color']]:
      tone === 'default' ? cssVars.default['text-primary'] : cssVars.default['text-secondary'],
  }
}

/**
 * @internal
 * Selectable overrides in disabled states, same as card but with different bg-color
 */
export function _selectableVarStyleDisabled(): CSSObject {
  return {
    ..._colorVarStyleDisabled(),
    [mutableCardVariables['bg-color']]: undefined,
  }
}
