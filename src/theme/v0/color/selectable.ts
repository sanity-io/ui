import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
export type ThemeColorSelectableState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorSelectableStates_v2` instead.
 */
export interface ThemeColorSelectableStates {
  enabled: ThemeColorSelectableState
  hovered: ThemeColorSelectableState
  pressed: ThemeColorSelectableState
  selected: ThemeColorSelectableState
  disabled: ThemeColorSelectableState
}

/**
 * @public
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorSelectable {
  default: ThemeColorSelectableStates
  primary: ThemeColorSelectableStates
  positive: ThemeColorSelectableStates
  caution: ThemeColorSelectableStates
  critical: ThemeColorSelectableStates
}
