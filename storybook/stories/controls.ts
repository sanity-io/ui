import {icons} from '@sanity/icons'
import {
  AVATAR_SIZE,
  BUTTON_MODES,
  CONTAINER,
  ELEMENT_TONES,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  RADIUS,
  SHADOW,
  SPACE,
} from '@sanity/ui/theme'

export const TEXT_ALIGN_CONTROLS = {
  control: {type: 'radio'},
  options: ['left', 'center', 'right', 'initial'],
} as const

export const AVATAR_SIZE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...AVATAR_SIZE)},
  options: [...AVATAR_SIZE],
} as const

export const BUTTON_MODE_CONTROLS = {
  control: {type: 'select'},
  options: [...BUTTON_MODES],
} as const

export const BUTTON_WIDTH_CONTROLS = {
  control: {type: 'select'},
  options: ['(none)', 'fill'],
  mapping: {
    '(none)': '',
    'fill': 'fill',
  },
} as const

export const CONTAINER_WIDTH_CONTROLS = {
  control: {type: 'select'},
  options: [...CONTAINER],
} as const

export const FLEX_DIRECTION_CONTROLS = {
  control: {type: 'radio'},
  options: ['row', 'column', 'row-reverse', 'column-reverse'],
} as const

export const FLEX_ALIGN_CONTROLS = {
  control: {type: 'radio'},
  options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
} as const

export const FONT_CODE_SIZE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...FONT_CODE_SIZE)},
  options: [...FONT_CODE_SIZE],
} as const

export const FONT_HEADING_SIZE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...FONT_HEADING_SIZE)},
  options: [...FONT_HEADING_SIZE],
} as const

export const FONT_LABEL_SIZE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...FONT_LABEL_SIZE)},
  options: [...FONT_LABEL_SIZE],
} as const

export const FONT_TEXT_SIZE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...FONT_TEXT_SIZE)},
  options: [...FONT_TEXT_SIZE],
} as const

export const HEIGHT_CONTROLS = {
  control: {type: 'radio'},
  options: ['fill', 'stretch'],
} as const

export const POSITION_CONTROLS = {
  control: {type: 'radio'},
  options: ['fixed', 'absolute'],
} as const

export const ICON_CONTROLS = {
  control: {type: 'select'},
  mapping: {
    '(none)': '',
    ...icons,
  },
  options: ['(none)', ...Object.keys(icons)],
} as const

export const OVERFLOW_CONTROLS = {
  control: {type: 'radio'},
  options: ['visible', 'hidden', 'auto'],
} as const

export const RADIUS_CONTROLS = {
  control: {type: 'select'},
  options: [...RADIUS],
} as const

export const SHADOW_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...SHADOW)},
  options: [...SHADOW],
} as const

export const SPACE_CONTROLS = {
  control: {type: 'number', min: 0, max: Math.max(...SPACE)},
  options: [...SPACE],
} as const

export const ELEMENT_TONES_CONTROLS = {
  control: {type: 'select'},
  options: [...ELEMENT_TONES],
} as const

export const TEXT_OVERFLOW_CONTROLS = {
  control: 'radio',
  mapping: {
    '(none)': '',
    'ellipsis': 'ellipsis',
  },
  options: ['(none)', 'ellipsis'],
} as const
