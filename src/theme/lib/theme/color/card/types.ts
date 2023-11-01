import {ThemeColorGenericState} from '../_generic'

/**
 * @deprecated Use `ThemeColorGenericState` instead.
 * @public
 */
export type ThemeColorCardState = ThemeColorGenericState

/**
 * @public
 */
export interface ThemeColorCard {
  enabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
  disabled: ThemeColorGenericState
}
