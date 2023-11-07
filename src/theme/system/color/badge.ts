import {ThemeColorBlendModeKey} from './_system'

export interface ThemeColorBadge {
  default: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string}
  primary: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string}
  positive: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string}
  caution: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string}
  critical: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string}
}
