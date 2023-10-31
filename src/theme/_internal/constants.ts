export const COLOR_HUES = [
  'gray',
  'cyan',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
] as const

export const COLOR_TINTS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const

export const COLOR_BASE_TONES = [
  'transparent',
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

export const COLOR_STATE_TONES = [
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

export const COLOR_STATES = ['enabled', 'hovered', 'pressed', 'selected', 'disabled'] as const

export const COLOR_BUTTON_MODES = ['default', 'ghost', 'bleed'] as const

export const COLOR_BLEND_MODES = ['multiply', 'screen'] as const
