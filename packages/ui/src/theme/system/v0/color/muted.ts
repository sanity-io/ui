import {ThemeColorGenericState} from './_generic'

/**
 * @public
 * @deprecated Use `ThemeColorSelectableTone_v2` instead.
 */
export interface ThemeColorMutedTone {
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
export interface ThemeColorMuted {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorMutedTone
  // oxlint-disable-next-line no-deprecated
  transparent: ThemeColorMutedTone
  // oxlint-disable-next-line no-deprecated
  primary: ThemeColorMutedTone
  // oxlint-disable-next-line no-deprecated
  positive: ThemeColorMutedTone
  // oxlint-disable-next-line no-deprecated
  caution: ThemeColorMutedTone
  // oxlint-disable-next-line no-deprecated
  critical: ThemeColorMutedTone
}
