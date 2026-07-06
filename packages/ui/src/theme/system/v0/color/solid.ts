import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorSelectableTone_v2` instead.
 */
export interface ThemeColorSolidTone {
  // oxlint-disable-next-line no-deprecated
  enabled: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  disabled: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  hovered: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  pressed: ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  selected: ThemeColorGenericState
}

/**
 * @public
 * @deprecated Use `ThemeColorSelectable_v2` instead.
 */
export interface ThemeColorSolid {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorSolidTone
  // oxlint-disable-next-line no-deprecated
  transparent: ThemeColorSolidTone
  // oxlint-disable-next-line no-deprecated
  primary: ThemeColorSolidTone
  // oxlint-disable-next-line no-deprecated
  positive: ThemeColorSolidTone
  // oxlint-disable-next-line no-deprecated
  caution: ThemeColorSolidTone
  // oxlint-disable-next-line no-deprecated
  critical: ThemeColorSolidTone
}
