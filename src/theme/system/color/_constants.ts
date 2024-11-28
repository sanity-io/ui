import {COLOR_HUES} from '@sanity/color'

/** @public */
export const THEME_COLOR_SCHEMES = ['light', 'dark'] as const

/** @public */
export const THEME_COLOR_BLEND_MODES = ['multiply', 'screen'] as const

/** @public */
export const THEME_COLOR_CARD_TONES = [
  'transparent',
  'default',
  'neutral',
  'primary', // deprecated
  'suggest',
  'positive',
  'caution',
  'critical',
] as const

/** @public */
export const THEME_COLOR_STATE_TONES = [
  'default',
  'neutral',
  'primary', // deprecated
  'suggest',
  'positive',
  'caution',
  'critical',
] as const

/** @public */
export const THEME_COLOR_STATES = ['enabled', 'hovered', 'pressed', 'selected', 'disabled'] as const

/** @public */
export const THEME_COLOR_BUTTON_MODES = ['default', 'ghost', 'bleed'] as const

/** @public */
export const THEME_COLOR_INPUT_MODES = ['default', 'invalid'] as const

/** @public */
export const THEME_COLOR_INPUT_STATES = ['enabled', 'hovered', 'readOnly', 'disabled'] as const

/** @public */
export const THEME_COLOR_AVATAR_COLORS = COLOR_HUES
