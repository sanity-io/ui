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

/** @public */
export interface ThemeColorAvatarHueTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
}

/** @public */
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

/** @public */
export interface ThemeColorBadgeTokens {
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  dot?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
}

/** @public */
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

/** @public */
export interface ThemeColorBadgeToneTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  dot?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
}

/** @public */
export interface ThemeColorBadgeTokens {
  '*'?: ThemeColorBadgeToneTokens
  default?: ThemeColorBadgeToneTokens
  primary?: ThemeColorBadgeToneTokens
  positive?: ThemeColorBadgeToneTokens
  caution?: ThemeColorBadgeToneTokens
  critical?: ThemeColorBadgeToneTokens
}

/** @public */
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

/** @public */
export type ThemeColorStatesTokens = Partial<Record<ColorConfigState, ThemeColorStateTokens>>

/** @public */
export interface ThemeColorButtonTokens
  extends Partial<Record<ColorConfigStateTone, ThemeColorStatesTokens>> {
  _hue?: ColorHueKey
}

/** @public */
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

/** @public */
export interface ThemeColorInputTokens
  extends Partial<Record<ColorConfigInputState, ThemeColorInputStateTokens>> {
  _hue?: ColorHueKey
}

/** @public */
export interface ThemeColorTokens {
  base?: Partial<Record<ColorConfigCardTone, ThemeColorBaseTokens>>
  button?: Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>>
  input?: Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>>
  selectable?: Partial<Record<ColorConfigStateTone, {_hue?: ColorHueKey} & ThemeColorStatesTokens>>
  syntax?: Partial<Record<keyof ThemeColorSyntax, ThemeColorTokenValue>>
}
