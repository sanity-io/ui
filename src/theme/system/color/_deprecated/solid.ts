import {ThemeColorGenericState} from '../_generic'

/**
 * @public
 * @deprecated
 */
export interface ThemeColorSolidTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

/**
 * @public
 * @deprecated
 */
export interface ThemeColorSolid {
  default: ThemeColorSolidTone
  transparent: ThemeColorSolidTone
  primary: ThemeColorSolidTone
  positive: ThemeColorSolidTone
  caution: ThemeColorSolidTone
  critical: ThemeColorSolidTone
}
