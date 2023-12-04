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
export interface ThemeColorBadge_v2 {
  default: ThemeColorBadgeTone_v2
  primary: ThemeColorBadgeTone_v2
  positive: ThemeColorBadgeTone_v2
  caution: ThemeColorBadgeTone_v2
  critical: ThemeColorBadgeTone_v2
}
