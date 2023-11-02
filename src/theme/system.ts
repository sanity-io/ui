/** @internal */
export const COLOR_BLEND_MODES = ['multiply', 'screen'] as const

/** @internal */
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

/** @internal */
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

/** @internal */
export const COLOR_BASE_TONES = [
  'transparent',
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

/** @internal */
export const COLOR_STATE_TONES = [
  'default',
  'primary', // todo: rename to `accent`
  'positive',
  'caution',
  'critical',
] as const

/** @internal */
export const COLOR_STATES = ['enabled', 'hovered', 'pressed', 'selected', 'disabled'] as const

/** @internal */
export const COLOR_BUTTON_MODES = ['default', 'ghost', 'bleed'] as const

/** @internal */
export const COLOR_INPUT_MODES = ['default', 'invalid'] as const

/** @internal */
export const COLOR_INPUT_STATES = ['enabled', 'hovered', 'readOnly', 'disabled'] as const

/** @internal */
export type ColorBlendModeValue = (typeof COLOR_BLEND_MODES)[number]

/** @internal */
export type ColorHueValue = (typeof COLOR_HUES)[number]

/** @internal */
export type ColorTintValue = (typeof COLOR_TINTS)[number]

/** @internal */
export type ColorBaseTone = (typeof COLOR_BASE_TONES)[number]

/** @internal */
export type ColorButtonMode = (typeof COLOR_BUTTON_MODES)[number]

/** @internal */
export type ColorState = (typeof COLOR_STATES)[number]

/** @internal */
export type ColorStateTone = (typeof COLOR_STATE_TONES)[number]

/** @internal */
export type ColorInputMode = (typeof COLOR_INPUT_MODES)[number]

/** @internal */
export type ColorInputState = (typeof COLOR_INPUT_STATES)[number]
