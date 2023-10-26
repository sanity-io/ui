import {ThemeColorGenericState} from '../_generic/types'

/**
 * @public
 */
export interface ThemeColorMutedTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

/**
 * @public
 */
export interface ThemeColorMuted {
  default: ThemeColorMutedTone
  transparent: ThemeColorMutedTone
  primary: ThemeColorMutedTone
  positive: ThemeColorMutedTone
  caution: ThemeColorMutedTone
  critical: ThemeColorMutedTone
}
