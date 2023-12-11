import {ThemeColorButtonModeKey, ThemeColorStateKey, ThemeColorStateToneKey} from './_system'
import {ThemeColorState_v2} from './state'

/**
 * @public
 */
export type ThemeColorButtonTone_v2 = Record<ThemeColorStateKey, ThemeColorState_v2>

/**
 * @public
 */
export type ThemeColorButtonMode_v2 = Record<ThemeColorStateToneKey, ThemeColorButtonTone_v2>

/**
 * @public
 */
export type ThemeColorButton_v2 = Record<ThemeColorButtonModeKey, ThemeColorButtonMode_v2>
