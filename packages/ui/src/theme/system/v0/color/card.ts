import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
// oxlint-disable-next-line no-deprecated
export type ThemeColorCardState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorCard {
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
