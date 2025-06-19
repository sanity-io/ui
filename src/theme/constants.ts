/** @public */
export const HUES = [
  'gray',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
] as const

/** @public */
export const TINTS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

/** @public */
export const AVATAR_SIZE = [0, 1, 2, 3] as const

/** @public */
export const CONTAINER_SCALE = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const CONTAINER: [...typeof CONTAINER_SCALE, 'auto'] = [...CONTAINER_SCALE, 'auto']

/** @public */
export const RADIUS = [0, 1, 2, 3, 4, 5, 6] as const

/** @public */
export const SPACE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const

/** @public */
export const FONT_CODE_SIZE = [0, 1, 2, 3, 4] as const

/** @public */
export const FONT_HEADING_SIZE = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const FONT_LABEL_SIZE = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const FONT_TEXT_SIZE = [0, 1, 2, 3, 4] as const

/** @public */
export const SHADOW = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const COLOR_SCHEMES = ['light', 'dark'] as const

/** @public */
export const COLOR_VARIANTS = ['tinted', 'solid'] as const

/** @public */
export const AVATAR_COLORS = [
  'gray',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
] as const

/** @public */
export const CARD_TONES = [
  'transparent',
  'default',
  'neutral',
  'primary', // todo: deprecate
  'suggest',
  'positive',
  'caution',
  'critical',
] as const

/** @public */
export const ELEMENT_TONES = [
  'default',
  'neutral',
  'primary', // todo: deprecate
  'suggest',
  'positive',
  'caution',
  'critical',
] as const

/** @public */
export const BUTTON_MODES = ['default', 'ghost', 'bleed'] as const
