import {ThemeColorStateKey, ThemeColorStateToneKey} from './_system'
import {ThemeColorState_v2} from './state'

/**
 * @public
 */
export type ThemeColorSelectableTone_v2 = Record<ThemeColorStateKey, ThemeColorState_v2>

/**
 * @public
 */
export type ThemeColorSelectable_v2 = Record<ThemeColorStateToneKey, ThemeColorSelectableTone_v2>
