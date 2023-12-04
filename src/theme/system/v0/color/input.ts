import {ThemeColorBlendModeKey} from '../../color/_system'

/**
 * @public
 * @deprecated
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
 * @deprecated
 */
export interface ThemeColorInputStates {
  enabled: ThemeColorInputState
  disabled: ThemeColorInputState
  hovered: ThemeColorInputState
  readOnly: ThemeColorInputState
}

/**
 * @public
 * @deprecated
 */
export interface ThemeColorInput {
  default: ThemeColorInputStates
  invalid: ThemeColorInputStates
}
