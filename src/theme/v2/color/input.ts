import {ThemeColorBlendModeKey, ThemeColorInputModeKey, ThemeColorInputStateKey} from './_system'

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
export type ThemeColorInputMode_v2 = Record<ThemeColorInputStateKey, ThemeColorInputState_v2>

/**
 * @public
 */
export type ThemeColorInput_v2 = Record<ThemeColorInputModeKey, ThemeColorInputMode_v2>
