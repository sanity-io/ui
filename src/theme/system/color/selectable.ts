import {ThemeColorState_v2} from './state'

/**
 * @public
 */
export interface ThemeColorSelectableStates_v2 {
  enabled: ThemeColorState_v2
  hovered: ThemeColorState_v2
  pressed: ThemeColorState_v2
  selected: ThemeColorState_v2
  disabled: ThemeColorState_v2
}

/**
 * @public
 */
export interface ThemeColorSelectable_v2 {
  default: ThemeColorSelectableStates_v2
  primary: ThemeColorSelectableStates_v2
  positive: ThemeColorSelectableStates_v2
  caution: ThemeColorSelectableStates_v2
  critical: ThemeColorSelectableStates_v2
}
