import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorGenericState` instead.
 */
export type ThemeColorCardState = ThemeColorGenericState

/**
 * @public
 * @deprecated
 */
export interface ThemeColorCard {
  enabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
  disabled: ThemeColorGenericState
}
