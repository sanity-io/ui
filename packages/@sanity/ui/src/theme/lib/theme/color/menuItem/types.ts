import {ThemeColorGenericState} from '../_generic'

/**
 * @deprecated
 * @public
 */
export type ThemeColorMenuItemState = ThemeColorGenericState

/**
 * @public
 */
export interface ThemeColorMenuItemStates {
  enabled: ThemeColorMenuItemState
  hovered: ThemeColorMenuItemState
  pressed: ThemeColorMenuItemState
  selected: ThemeColorMenuItemState
  disabled: ThemeColorMenuItemState
}

/**
 * @public
 */
export interface ThemeColorMenuItem {
  default: ThemeColorMenuItemStates
  primary: ThemeColorMenuItemStates
  positive: ThemeColorMenuItemStates
  caution: ThemeColorMenuItemStates
  critical: ThemeColorMenuItemStates
}
