import {ColorHueKey} from '@sanity/color'
import {ThemeColorSyntax, ThemeColorButtonModeKey} from '../../../system'
import {
  ColorBlendModeTokenValue,
  ColorConfigAvatarColor,
  ColorConfigBaseTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigState,
  ColorConfigStateTone,
  ThemeColorTokenValue,
} from '../../system'

export interface ThemeColorAvatarTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
}

export interface ThemeColorBadgeTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
}

export interface ThemeColorBaseTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  border?: ThemeColorTokenValue
  focusRing?: ThemeColorTokenValue
  shadow?: {
    outline?: ThemeColorTokenValue
    umbra?: ThemeColorTokenValue
    penumbra?: ThemeColorTokenValue
    ambient?: ThemeColorTokenValue
  }
  skeleton?: {
    from?: ThemeColorTokenValue
    to?: ThemeColorTokenValue
  }
}

export interface ThemeColorStateTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueKey
  bg?: ThemeColorTokenValue
  bg2?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  icon?: ThemeColorTokenValue
  border?: ThemeColorTokenValue
  muted?: {
    fg?: ThemeColorTokenValue
  }
  accent?: {
    fg?: ThemeColorTokenValue
  }
  link?: {
    fg?: ThemeColorTokenValue
  }
  code?: {
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
  bg2?: ThemeColorTokenValue
  fg?: ThemeColorTokenValue
  border?: ThemeColorTokenValue
  placeholder?: ThemeColorTokenValue
}

export interface ThemeColorInputTokens
  extends Partial<Record<ColorConfigInputState, ThemeColorInputStateTokens>> {
  _hue?: ColorHueKey
}

export interface ThemeColorTokens {
  avatar?: Partial<Record<ColorConfigAvatarColor, ThemeColorAvatarTokens>>
  badge?: Partial<Record<ColorConfigStateTone, ThemeColorBadgeTokens>>
  base?: Partial<Record<ColorConfigBaseTone, ThemeColorBaseTokens>>
  button?: Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>>
  card?: Partial<Record<ColorConfigState, ThemeColorStateTokens>>
  input?: Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>>
  kbd?: {
    _blend?: ColorBlendModeTokenValue
    bg?: ThemeColorTokenValue
    fg?: ThemeColorTokenValue
    border?: ThemeColorTokenValue
  }
  selectable?: Partial<Record<ColorConfigStateTone, {_hue?: ColorHueKey} & ThemeColorStatesTokens>>
  spot?: Partial<Record<ColorHueKey, ThemeColorTokenValue>>
  syntax?: Partial<Record<keyof ThemeColorSyntax, ThemeColorTokenValue>>
}
