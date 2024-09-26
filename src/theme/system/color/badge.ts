import {ThemeColorStateToneKey} from './_system'

/**
 * @public
 */
export interface ThemeColorBadgeTone_v2 {
  bg: string
  fg: string
  dot: string
  icon: string
}

/**
 * @public
 */
export type ThemeColorBadge_v2 = Record<ThemeColorStateToneKey, ThemeColorBadgeTone_v2>
