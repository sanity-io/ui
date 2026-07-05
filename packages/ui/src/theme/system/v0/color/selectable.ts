import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
// oxlint-disable-next-line no-deprecated
export type ThemeColorSelectableState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorSelectableStates_v2` instead.
 */
export interface ThemeColorSelectableStates {
  // oxlint-disable-next-line no-deprecated
  enabled: ThemeColorSelectableState
  // oxlint-disable-next-line no-deprecated
  hovered: ThemeColorSelectableState
  // oxlint-disable-next-line no-deprecated
  pressed: ThemeColorSelectableState
  // oxlint-disable-next-line no-deprecated
  selected: ThemeColorSelectableState
  // oxlint-disable-next-line no-deprecated
  disabled: ThemeColorSelectableState
}

/**
 * @public
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorSelectable {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorSelectableStates
  // oxlint-disable-next-line no-deprecated
  primary: ThemeColorSelectableStates
  // oxlint-disable-next-line no-deprecated
  positive: ThemeColorSelectableStates
  // oxlint-disable-next-line no-deprecated
  caution: ThemeColorSelectableStates
  // oxlint-disable-next-line no-deprecated
  critical: ThemeColorSelectableStates
}
