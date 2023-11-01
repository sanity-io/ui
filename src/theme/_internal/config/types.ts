import {ColorHueKey, ColorTint as ColorPaletteValue} from '@sanity/color'

import {ThemeColorSyntax} from '../../lib/theme'
import {
  COLOR_BASE_TONES,
  COLOR_BLEND_MODES,
  COLOR_INPUT_MODES,
  COLOR_INPUT_STATES,
  COLOR_STATES,
  COLOR_STATE_TONES,
} from '../constants'
import {ColorButtonMode, ColorHueValue, ColorTintValue} from '../types'

export type ColorBlendModeValue = (typeof COLOR_BLEND_MODES)[number]

export type ColorTokenValue = [ColorConfigValue, ColorConfigValue]

export type ColorBlendModeTokenValue = [ColorBlendModeValue, ColorBlendModeValue]

export const COLOR_CONFIG_BASE_TONES = ['*', ...COLOR_BASE_TONES] as const
export type ColorConfigBaseTone = (typeof COLOR_CONFIG_BASE_TONES)[number]

export const COLOR_CONFIG_STATE_TONES = ['*', ...COLOR_STATE_TONES] as const
export type ColorConfigStateTone = (typeof COLOR_CONFIG_STATE_TONES)[number]

export const COLOR_CONFIG_STATES = ['*', ...COLOR_STATES] as const
export type ColorConfigState = (typeof COLOR_CONFIG_STATES)[number]

export const COLOR_CONFIG_INPUT_MODES = ['*', ...COLOR_INPUT_MODES] as const
export type ColorConfigInputMode = (typeof COLOR_CONFIG_INPUT_MODES)[number]

export const COLOR_CONFIG_INPUT_STATES = ['*', ...COLOR_INPUT_STATES] as const
export type ColorConfigInputState = (typeof COLOR_CONFIG_INPUT_STATES)[number]

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

export interface ButtonColorTokens extends Partial<Record<ColorButtonMode, ButtonModeColorTokens>> {
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
  button?: Partial<Record<ColorConfigStateTone, ButtonColorTokens>>
  card?: Partial<Record<ColorConfigState, StateColorTokens>>
  input?: Partial<Record<ColorConfigInputMode, InputColorTokens>>
  spot?: Partial<Record<ColorHueKey, ColorTokenValue>>
  syntax?: Partial<Record<keyof ThemeColorSyntax, ColorTokenValue>>
}

export type TMP_ColorPalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<ColorHueValue, Record<ColorTintValue, string | ColorPaletteValue>>

export interface ColorThemeConfig {
  // eslint-disable-next-line
  palette?: TMP_ColorPalette
  tokens?: ColorTokens
}

export interface ThemeConfig {
  color?: ColorThemeConfig
}

export const COLOR_CONFIG_BASE_KEYS = [
  '_hue',
  'bg',
  'fg',
  'border',
  'focusRing',
  'muted/fg',
  'link/fg',
  'code/bg',
  'code/fg',
  'shadow/outline',
  'shadow/umbra',
  'shadow/penumbra',
  'shadow/ambient',
  'skeleton/from',
  'skeleton/to',
] as const
export type ColorConfigBaseKey = (typeof COLOR_CONFIG_BASE_KEYS)[number]

export const COLOR_CONFIG_STATE_KEYS = [
  '_hue',
  'bg',
  'fg',
  'border',
  'focusRing',
  'muted/fg',
  'link/fg',
  'code/bg',
  'code/fg',
  'skeleton/from',
  'skeleton/to',
] as const
export type ColorConfigStateKey = (typeof COLOR_CONFIG_STATE_KEYS)[number]

export const COLOR_CONFIG_BLEND_KEYS = ['_blend'] as const
export type ColorConfigBlendKey = (typeof COLOR_CONFIG_BLEND_KEYS)[number]

export type ColorConfigOpacityValue = `0` | `0.${number}` | `1`

export type ColorConfigValue =
  | `black`
  | `white`
  | `black/${ColorConfigOpacityValue}`
  | `white/${ColorConfigOpacityValue}`
  | `${ColorHueValue}`
  | `${ColorHueValue}/${ColorTintValue}`
  | `${ColorHueValue}/${ColorTintValue}/${ColorConfigOpacityValue}`
  | `${ColorTintValue}`
  | `${ColorTintValue}/${ColorConfigOpacityValue}`
  | ColorBlendModeValue
