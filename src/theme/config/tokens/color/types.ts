import {ColorHueKey} from '@sanity/color'
import {ThemeColorSyntax, ThemeColorButtonModeKey} from '../../../system'
import {
  ColorBlendModeTokenValue,
  ColorConfigCardTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigState,
  ColorConfigStateTone,
  ThemeColorTokenValue,
} from '../../system'

export interface ThemeColorAvatarHueTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
}

export interface ThemeColorAvatarTokens {
  '*'?: ThemeColorAvatarHueTokens
  gray?: ThemeColorAvatarHueTokens
  blue?: ThemeColorAvatarHueTokens
  purple?: ThemeColorAvatarHueTokens
  magenta?: ThemeColorAvatarHueTokens
  red?: ThemeColorAvatarHueTokens
  orange?: ThemeColorAvatarHueTokens
  yellow?: ThemeColorAvatarHueTokens
  green?: ThemeColorAvatarHueTokens
  cyan?: ThemeColorAvatarHueTokens
}

export interface ThemeColorBadgeTokens {
  // _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  dot?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
}

export interface ThemeColorBaseTokens extends ThemeColorStateTokens {
  focusRing?: ThemeColorTokenValue
  backdrop?: ThemeColorTokenValue
  shadow?: {
    outline?: ThemeColorTokenValue
    umbra?: ThemeColorTokenValue
    penumbra?: ThemeColorTokenValue
    ambient?: ThemeColorTokenValue
  }
}

export interface ThemeColorBadgeToneTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  dot?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
}

export interface ThemeColorBadgeTokens {
  '*'?: ThemeColorBadgeToneTokens
  default?: ThemeColorBadgeToneTokens
  primary?: ThemeColorBadgeToneTokens
  positive?: ThemeColorBadgeToneTokens
  caution?: ThemeColorBadgeToneTokens
  critical?: ThemeColorBadgeToneTokens
}

export interface ThemeColorStateTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  accent?: {
    fg?: ThemeColorTokenValue
  }
  avatar?: ThemeColorAvatarTokens
  badge?: ThemeColorBadgeTokens
  bg?: ThemeColorTokenValue
  border?: ThemeColorTokenValue
  code?: {
    bg?: ThemeColorTokenValue
    fg?: ThemeColorTokenValue
  }
  fg?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
  kbd?: {
    bg?: ThemeColorTokenValue
    fg?: ThemeColorTokenValue
    border?: ThemeColorTokenValue
  }
  link?: {
    fg?: ThemeColorTokenValue
  }
  muted?: {
    bg?: ThemeColorTokenValue
    fg?: ThemeColorTokenValue
  }
  skeleton?: {
    from?: ThemeColorTokenValue
    to?: ThemeColorTokenValue
  }
}

export type ThemeColorStatesTokens = Partial<Record<ColorConfigState, ThemeColorStateTokens>>

export interface ThemeColorButtonTokens
  extends Partial<Record<ColorConfigStateTone, ThemeColorStatesTokens>> {
  _hue?: ColorHueKey
}

export interface ThemeColorInputStateTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  border?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  muted?: {
    bg?: ThemeColorTokenValue
  }
  placeholder?: ThemeColorTokenValue
}

export interface ThemeColorInputTokens
  extends Partial<Record<ColorConfigInputState, ThemeColorInputStateTokens>> {
  _hue?: ColorHueKey
}

export interface ThemeColorTokens {
  base?: Partial<Record<ColorConfigCardTone, ThemeColorBaseTokens>>
  button?: Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>>
  input?: Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>>
  selectable?: Partial<Record<ColorConfigStateTone, {_hue?: ColorHueKey} & ThemeColorStatesTokens>>
  syntax?: Partial<Record<keyof ThemeColorSyntax, ThemeColorTokenValue>>
}
