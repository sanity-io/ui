import {ColorHueKey, ColorTintKey} from '@sanity/color'
import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_BASE_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorBlendModeKey,
} from '../system'

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
  | `${ColorHueKey}`
  | `${ColorHueKey}/${ColorTintKey}`
  | `${ColorHueKey}/${ColorTintKey}/${ColorConfigOpacityValue}`
  | `${ColorTintKey}`
  | `${ColorTintKey}/${ColorConfigOpacityValue}`
  | ThemeColorBlendModeKey

export type ThemeColorTokenValue = [ColorConfigValue, ColorConfigValue]

export type ColorBlendModeTokenValue = [ThemeColorBlendModeKey, ThemeColorBlendModeKey]

export const COLOR_CONFIG_AVATAR_COLORS = ['*', ...THEME_COLOR_AVATAR_COLORS] as const
export type ColorConfigAvatarColor = (typeof COLOR_CONFIG_AVATAR_COLORS)[number]

export const COLOR_CONFIG_BASE_TONES = ['*', ...THEME_COLOR_BASE_TONES] as const
export type ColorConfigBaseTone = (typeof COLOR_CONFIG_BASE_TONES)[number]

export const COLOR_CONFIG_STATE_TONES = ['*', ...THEME_COLOR_STATE_TONES] as const
export type ColorConfigStateTone = (typeof COLOR_CONFIG_STATE_TONES)[number]

export const COLOR_CONFIG_STATES = ['*', ...THEME_COLOR_STATES] as const
export type ColorConfigState = (typeof COLOR_CONFIG_STATES)[number]

export const COLOR_CONFIG_INPUT_MODES = ['*', ...THEME_COLOR_INPUT_MODES] as const
export type ColorConfigInputMode = (typeof COLOR_CONFIG_INPUT_MODES)[number]

export const COLOR_CONFIG_INPUT_STATES = ['*', ...THEME_COLOR_INPUT_STATES] as const
export type ColorConfigInputState = (typeof COLOR_CONFIG_INPUT_STATES)[number]
