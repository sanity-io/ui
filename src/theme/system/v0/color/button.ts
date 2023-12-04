import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorGenericState` instead.
 */
export type ThemeColorButtonState = ThemeColorGenericState

/**
 * @public
 * @deprecated
 */
export interface ThemeColorButtonStates {
  enabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
  disabled: ThemeColorGenericState
}

/**
 * TODO: Rename to `ThemeColorButtonMode`.
 * @public
 * @deprecated
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
 * @deprecated
 */
export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}
