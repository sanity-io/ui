import {ThemeColorState_v2} from './state'

/**
 * @public
 */
export interface ThemeColorButtonStates_v2 {
  enabled: ThemeColorState_v2
  hovered: ThemeColorState_v2
  pressed: ThemeColorState_v2
  selected: ThemeColorState_v2
  disabled: ThemeColorState_v2
}

/**
 * TODO: Rename to `ThemeColorButtonMode`.
 * @public
 */
export interface ThemeColorButtonTones_v2 {
  default: ThemeColorButtonStates_v2
  primary: ThemeColorButtonStates_v2
  positive: ThemeColorButtonStates_v2
  caution: ThemeColorButtonStates_v2
  critical: ThemeColorButtonStates_v2
}

/**
 * @public
 */
export interface ThemeColorButton_v2 {
  default: ThemeColorButtonTones_v2
  ghost: ThemeColorButtonTones_v2
  bleed: ThemeColorButtonTones_v2
}
