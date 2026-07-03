import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorSelectableTone_v2` instead.
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
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorSolid {
  default: ThemeColorSolidTone
  transparent: ThemeColorSolidTone
  primary: ThemeColorSolidTone
  positive: ThemeColorSolidTone
  caution: ThemeColorSolidTone
  critical: ThemeColorSolidTone
}
