import {ThemeColorBlendModeKey} from '../../color/_system'

/**
 * @public
 * @deprecated Use `ThemeColorInputState_v2` instead.
 */
export interface ThemeColorInputState {
  _blend?: ThemeColorBlendModeKey
  bg: string
  bg2: string
  border: string
  fg: string
  placeholder: string
}

/**
 * @public
 * @deprecated Use `ThemeColorInputMode_v2` instead.
 */
export interface ThemeColorInputStates {
  // oxlint-disable-next-line no-deprecated
  enabled: ThemeColorInputState
  // oxlint-disable-next-line no-deprecated
  disabled: ThemeColorInputState
  // oxlint-disable-next-line no-deprecated
  hovered: ThemeColorInputState
  // oxlint-disable-next-line no-deprecated
  readOnly: ThemeColorInputState
}

/**
 * @public
 * @deprecated Use `ThemeColorInput_v2` instead.
 */
export interface ThemeColorInput {
  // oxlint-disable-next-line no-deprecated
  default: ThemeColorInputStates
  // oxlint-disable-next-line no-deprecated
  invalid: ThemeColorInputStates
}
