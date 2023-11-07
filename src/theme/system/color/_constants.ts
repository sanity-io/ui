import {COLOR_HUES} from '@sanity/color'

/** @internal */
export const THEME_COLOR_BLEND_MODES = ['multiply', 'screen'] as const

/** @internal */
export const THEME_COLOR_BASE_TONES = [
  'transparent',
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

/** @internal */
export const THEME_COLOR_STATE_TONES = [
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

/** @internal */
export const THEME_COLOR_STATES = ['enabled', 'hovered', 'pressed', 'selected', 'disabled'] as const

/** @internal */
export const THEME_COLOR_BUTTON_MODES = ['default', 'ghost', 'bleed'] as const

/** @internal */
export const THEME_COLOR_INPUT_MODES = ['default', 'invalid'] as const

/** @internal */
export const THEME_COLOR_INPUT_STATES = ['enabled', 'hovered', 'readOnly', 'disabled'] as const

/** @internal */
export const THEME_COLOR_AVATAR_COLORS = COLOR_HUES
