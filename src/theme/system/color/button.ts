import {ThemeColorGenericState} from './_generic'

/**
 * @deprecated Use `ThemeColorGenericState` instead.
 * @public
 */
export type ThemeColorButtonState = ThemeColorGenericState

/**
 * @public
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
