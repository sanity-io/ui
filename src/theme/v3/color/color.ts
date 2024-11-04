import {ThemeColorCardToneKey, ThemeColorSchemeKey, ThemeColorStateToneKey} from '../../v2'

export interface ThemeColorElement_v3 {
  bg: {
    1: string
    2: string
    3: string
    4: string
  }
  border: {
    1: string
    2: string
    3: string
    4: string
  }
  fg: {
    1: string
    2: string
    3: string
    4: string
  }
}

export interface ThemeColorCard_v3 extends ThemeColorElement_v3 {
  focusRing: string
  tinted: Record<ThemeColorStateToneKey, ThemeColorElement_v3>
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  solid: Record<ThemeColorStateToneKey, ThemeColorElement_v3>
}

export type ThemeColorScheme_v3 = Record<ThemeColorCardToneKey, ThemeColorCard_v3>

export type ThemeColor_v3 = Record<ThemeColorSchemeKey, ThemeColorScheme_v3>
