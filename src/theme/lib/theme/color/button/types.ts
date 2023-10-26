import {ThemeColorGenericState} from '../_generic'

/**
 * @public
 */
export type ThemeColorButtonModeKey = 'default' | 'ghost' | 'bleed'

/**
 * @deprecated Use `ThemeColorGenericState` instead.
 * @public
 */
export type ThemeColorButtonState = ThemeColorGenericState

/**
 * @public
 */
export interface ThemeColorButtonStates {
  enabled: ThemeColorButtonState
  hovered: ThemeColorButtonState
  pressed: ThemeColorButtonState
  selected: ThemeColorButtonState
  disabled: ThemeColorButtonState
}

/**
 * TODO: Rename to `ThemeColorButtonMode`.
 * @public
 */
export interface ThemeColorButtonTones {
  default: ThemeColorButtonStates
  primary: ThemeColorButtonStates
  positive: ThemeColorButtonStates
  caution: ThemeColorButtonStates
  critical: ThemeColorButtonStates
}

/**
 * @public
 */
export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}
