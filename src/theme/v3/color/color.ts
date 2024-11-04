import {Hue} from '../../palette'
import {ThemeColorCardToneKey, ThemeColorSchemeKey, ThemeColorStateToneKey} from '../../v2'

export interface ThemeColorElement {
  _hue: Hue
  bg: {
    0: string
    4: string
  }
  border: {
    0: string
    4: string
  }
  fg: {
    0: string
    4: string
  }
}

export type ThemeColorVariant = Record<ThemeColorStateToneKey, ThemeColorElement>

export type ThemeColorVariantKey = 'tinted' | 'solid'

// export type ThemeColorCard_v3 = Record<ThemeColorVariantKey, ThemeColorVariant>

export interface ThemeColorCard_v3 {
  _hue: Hue
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  variant: Record<ThemeColorVariantKey, ThemeColorVariant>
}

export interface ThemeColorScheme_v3 {
  card: Record<ThemeColorCardToneKey, ThemeColorCard_v3>
}

// color[scheme].card[cardTone][colorVariant][elementTone][property][level]
export type ThemeColor_v3 = Record<ThemeColorSchemeKey, ThemeColorScheme_v3>
