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
  enabled: ThemeColorInputState
  disabled: ThemeColorInputState
  hovered: ThemeColorInputState
  readOnly: ThemeColorInputState
}

/**
 * @public
 * @deprecated Use `ThemeColorInput_v2` instead.
 */
export interface ThemeColorInput {
  default: ThemeColorInputStates
  invalid: ThemeColorInputStates
}
