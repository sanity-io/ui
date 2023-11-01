import {ColorTint as ColorPaletteValue} from '@sanity/color'

import {COLOR_BASE_TONES, COLOR_BLEND_MODES, COLOR_STATE_TONES} from '../constants'
import {ColorButtonMode, ColorHueValue, ColorState, ColorTintValue} from '../types'

export type ColorBlendModeValue = (typeof COLOR_BLEND_MODES)[number]

export type ColorTokenValue = [ColorConfigValue, ColorConfigValue]

export type ColorBlendModeTokenValue = [ColorBlendModeValue, ColorBlendModeValue]

export const COLOR_CONFIG_BASE_TONES = ['*', ...COLOR_BASE_TONES] as const
export type ColorConfigBaseTone = (typeof COLOR_CONFIG_BASE_TONES)[number]

export const COLOR_CONFIG_STATE_TONES = ['*', ...COLOR_STATE_TONES] as const
export type ColorConfigStateTone = (typeof COLOR_CONFIG_STATE_TONES)[number]

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

export type ButtonModeColorTokens = Partial<Record<'*' | ColorState, StateColorTokens>>

export interface ButtonColorTokens extends Partial<Record<ColorButtonMode, ButtonModeColorTokens>> {
  _hue?: ColorHueValue
}

export interface ColorTokens extends Partial<Record<ColorConfigBaseTone, BaseColorTokens>> {
  button?: Partial<Record<ColorConfigStateTone, ButtonColorTokens>>
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
