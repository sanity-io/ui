import {ColorHueKey, ColorTintKey} from '@sanity/color'
import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorBlendModeKey,
} from '../system'

/** @public */
export const COLOR_CONFIG_STATE_KEYS = [
  '_hue',
  'bg',
  'fg',
  'border',
  'focusRing',
  'muted/fg',
  'accent/fg',
  'link/fg',
  'code/bg',
  'code/fg',
  'skeleton/from',
  'skeleton/to',
  'status/dot',
  'status/icon',
] as const

/** @public */
export type ColorConfigStateKey = (typeof COLOR_CONFIG_STATE_KEYS)[number]

/** @public */
export const COLOR_CONFIG_CARD_KEYS = [
  ...COLOR_CONFIG_STATE_KEYS,
  '_hue',
  'bg',
  'fg',
  'border',
  'focusRing',
  'shadow/outline',
  'shadow/umbra',
  'shadow/penumbra',
  'shadow/ambient',
] as const

/** @public */
export type ColorConfigCardKey = (typeof COLOR_CONFIG_CARD_KEYS)[number]

/** @public */
export const COLOR_CONFIG_BLEND_KEYS = ['_blend'] as const

/** @public */
export type ColorConfigBlendKey = (typeof COLOR_CONFIG_BLEND_KEYS)[number]

/** @public */
export type ColorConfigOpacityValue = `0` | `0.${number}` | `1`

/** @public */
export type ColorConfigValue =
  | `black`
  | `white`
  | `black/${ColorConfigOpacityValue}`
  | `white/${ColorConfigOpacityValue}`
  | `${ColorHueKey}`
  | `${ColorHueKey} ${number}%`
  | `${ColorHueKey}/${ColorTintKey}`
  | `${ColorHueKey}/${ColorTintKey} ${number}%`
  | `${ColorHueKey}/${ColorTintKey}/${ColorConfigOpacityValue}`
  | `${ColorTintKey}`
  | `${ColorTintKey} ${number}%`
  | `${ColorTintKey}/${ColorConfigOpacityValue}`

/** @public */
export type ThemeColorTokenValue = [ColorConfigValue, ColorConfigValue]

/** @public */
export type ColorBlendModeTokenValue = [ThemeColorBlendModeKey, ThemeColorBlendModeKey]

/** @public */
export const COLOR_CONFIG_AVATAR_COLORS = ['*', ...THEME_COLOR_AVATAR_COLORS] as const

/** @public */
export type ColorConfigAvatarColor = (typeof COLOR_CONFIG_AVATAR_COLORS)[number]

/** @public */
export const COLOR_CONFIG_CARD_TONES = ['*', ...THEME_COLOR_CARD_TONES] as const

/** @public */
export type ColorConfigCardTone = (typeof COLOR_CONFIG_CARD_TONES)[number]

/** @public */
export const COLOR_CONFIG_STATE_TONES = ['*', ...THEME_COLOR_STATE_TONES] as const

/** @public */
export type ColorConfigStateTone = (typeof COLOR_CONFIG_STATE_TONES)[number]

/** @public */
export const COLOR_CONFIG_STATES = ['*', ...THEME_COLOR_STATES] as const

/** @public */
export type ColorConfigState = (typeof COLOR_CONFIG_STATES)[number]

/** @public */
export const COLOR_CONFIG_INPUT_MODES = ['*', ...THEME_COLOR_INPUT_MODES] as const

/** @public */
export type ColorConfigInputMode = (typeof COLOR_CONFIG_INPUT_MODES)[number]

/** @public */
export const COLOR_CONFIG_INPUT_STATES = ['*', ...THEME_COLOR_INPUT_STATES] as const

/** @public */
export type ColorConfigInputState = (typeof COLOR_CONFIG_INPUT_STATES)[number]
