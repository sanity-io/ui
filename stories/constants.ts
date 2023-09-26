import {icons} from '@sanity/icons'

export const ALIGN_CONTROLS = {
  controls: {
    type: 'check',
  },
  options: ['left', 'center', 'right', 'initial'],
}

export const BUTTON_MODE_CONTROLS = {
  controls: {
    type: 'select',
  },
  options: ['default', 'ghost', 'bleed'],
}

export const BUTTON_TONE_CONTROLS = {
  controls: {
    type: 'select',
  },
  options: ['default', 'primary', 'positive', 'caution', 'critical'],
}

export const ICON_CONTROLS = {
  control: {
    type: 'select',
  },
  mapping: {
    '(none)': '',
    ...icons,
  },
  options: ['(none)', ...Object.keys(icons)],
}

export const FONT_SIZE_CONTROLS = {
  control: {
    type: 'number',
    min: 0,
    max: 4,
  },
  options: [0, 1, 2, 3, 4],
}

export const FONT_WEIGHT_CONTROLS = {
  control: {
    type: 'select',
  },
  options: ['regular', 'medium', 'semibold', 'bold'],
}

export const OVERFLOW_CONTROLS = {
  control: {
    type: 'radio',
  },
  options: ['visible', 'hidden', 'auto'],
}

export const RADIUS_CONTROLS = {
  control: {
    type: 'number',
    min: 0,
    max: 6,
  },
  options: [0, 1, 2, 3, 4, 5, 6],
}

export const SHADOW_CONTROLS = {
  control: {
    type: 'number',
    min: 0,
    max: 5,
  },
  options: [0, 1, 2, 3, 4, 5],
}

export const SPACE_CONTROLS = {
  control: {
    type: 'number',
    min: 0,
    max: 9,
  },
  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
}

export const WIDTH_CONTROLS = {
  control: {
    type: 'select',
  },
  options: ['auto', 0, 1, 2, 3, 4, 5],
}
