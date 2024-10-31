import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
export type ThemeColorButtonState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorButtonStates_v2` instead.
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
 * @deprecated Use `ThemeColorButtonTones_v2` instead.
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
 * @deprecated Use `ThemeColorButton_v2` instead.
 */
export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}
