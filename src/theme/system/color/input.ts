import {ThemeColorBlendModeKey} from './_system'

/**
 * @public
 */
export interface ThemeColorInputState_v2 {
  _blend?: ThemeColorBlendModeKey
  bg: string
  border: string
  fg: string
  muted: {
    bg: string
  }
  placeholder: string
}

/**
 * @public
 */
export interface ThemeColorInputStates_v2 {
  enabled: ThemeColorInputState_v2
  disabled: ThemeColorInputState_v2
  hovered: ThemeColorInputState_v2
  readOnly: ThemeColorInputState_v2
}

/**
 * @public
 */
export interface ThemeColorInput_v2 {
  default: ThemeColorInputStates_v2
  invalid: ThemeColorInputStates_v2
}
