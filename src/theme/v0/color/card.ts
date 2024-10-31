import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorState_v2` instead.
 */
export type ThemeColorCardState = ThemeColorGenericState

/**
 * @public
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorCard {
  enabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
  disabled: ThemeColorGenericState
}
