import {ColorHueKey} from '@sanity/color'
import {ThemeColorSyntax} from '../../../../lib/theme'
import {ColorButtonMode, ColorHueValue} from '../../../system'
import {
  ColorBlendModeTokenValue,
  ColorConfigBaseTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigState,
  ColorConfigStateTone,
  ColorTokenValue,
} from '../../system'

export interface BaseColorTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueValue
  bg?: ColorTokenValue
  fg?: ColorTokenValue
  border?: ColorTokenValue
  focusRing?: ColorTokenValue
  shadow?: {
    outline?: ColorTokenValue
    umbra?: ColorTokenValue
    penumbra?: ColorTokenValue
    ambient?: ColorTokenValue
  }
  skeleton?: {
    from?: ColorTokenValue
    to?: ColorTokenValue
  }
}

export interface StateColorTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueValue
  bg?: ColorTokenValue
  bg2?: ColorTokenValue
  fg?: ColorTokenValue
  border?: ColorTokenValue
  muted?: {
    fg?: ColorTokenValue
  }
  accent?: {
    fg?: ColorTokenValue
  }
  link?: {
    fg?: ColorTokenValue
  }
  code?: {
    bg?: ColorTokenValue
    fg?: ColorTokenValue
  }
  skeleton?: {
    from?: ColorTokenValue
    to?: ColorTokenValue
  }
}

export type ButtonModeColorTokens = Partial<Record<ColorConfigState, StateColorTokens>>

export interface ButtonColorTokens
  extends Partial<Record<ColorConfigStateTone, ButtonModeColorTokens>> {
  _hue?: ColorHueValue
}

export interface InputStateColorTokens {
  _blend?: ColorBlendModeTokenValue
  _hue?: ColorHueValue
  bg?: ColorTokenValue
  bg2?: ColorTokenValue
  fg?: ColorTokenValue
  border?: ColorTokenValue
  placeholder?: ColorTokenValue
}

export interface InputColorTokens
  extends Partial<Record<ColorConfigInputState, InputStateColorTokens>> {
  _hue?: ColorHueValue
}

export interface ColorTokens {
  base?: Partial<Record<ColorConfigBaseTone, BaseColorTokens>>
  button?: Partial<Record<ColorButtonMode, ButtonColorTokens>>
  card?: Partial<Record<ColorConfigState, StateColorTokens>>
  input?: Partial<Record<ColorConfigInputMode, InputColorTokens>>
  spot?: Partial<Record<ColorHueKey, ColorTokenValue>>
  syntax?: Partial<Record<keyof ThemeColorSyntax, ColorTokenValue>>
}
