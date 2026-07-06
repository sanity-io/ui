import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
// oxlint-disable-next-line no-deprecated
export type ThemeColorButtonState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorButtonStates_v2` instead.
 */
export interface ThemeColorButtonStates {
  // oxlint-disable-next-line no-deprecated
  enabled: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  hovered: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  pressed: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  selected: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  disabled: ThemeColorGenericState
}

/**
 * TODO: Rename to `ThemeColorButtonMode`.
 * @public
 * @deprecated Use `ThemeColorButtonTones_v2` instead.
 */
export interface ThemeColorButtonTones {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorButtonStates
  // oxlint-disable-next-line no-deprecated
  primary: ThemeColorButtonStates
  // oxlint-disable-next-line no-deprecated
  positive: ThemeColorButtonStates
  // oxlint-disable-next-line no-deprecated
  caution: ThemeColorButtonStates
  // oxlint-disable-next-line no-deprecated
  critical: ThemeColorButtonStates
}

/**
 * @public
 * @deprecated Use `ThemeColorButton_v2` instead.
 */
export interface ThemeColorButton {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorButtonTones
  // oxlint-disable-next-line no-deprecated
  ghost: ThemeColorButtonTones
  // oxlint-disable-next-line no-deprecated
  bleed: ThemeColorButtonTones
}
