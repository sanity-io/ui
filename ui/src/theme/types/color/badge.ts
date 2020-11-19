export interface ThemeBadgeColorMode {
  bg: string
  fg: string
  border: string
}

export interface ThemeColorBadgeTone {
  modes: {
    default: ThemeBadgeColorMode
    outline: ThemeBadgeColorMode
  }
}

export interface ThemeColorBadge {
  tones: {
    default: ThemeColorBadgeTone
    brand: ThemeColorBadgeTone
    positive: ThemeColorBadgeTone
    caution: ThemeColorBadgeTone
    critical: ThemeColorBadgeTone
  }
}
