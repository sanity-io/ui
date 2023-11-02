import {
  COLOR_BASE_TONES,
  COLOR_BUTTON_MODES,
  COLOR_HUES,
  COLOR_INPUT_MODES,
  COLOR_INPUT_STATES,
  COLOR_STATE_TONES,
  COLOR_STATES,
  COLOR_TINTS,
} from './constants'

export type ColorHueValue = (typeof COLOR_HUES)[number]

export type ColorTintValue = (typeof COLOR_TINTS)[number]

export type ColorBaseTone = (typeof COLOR_BASE_TONES)[number]

export type ColorButtonMode = (typeof COLOR_BUTTON_MODES)[number]

export type ColorState = (typeof COLOR_STATES)[number]

export type ColorStateTone = (typeof COLOR_STATE_TONES)[number]

export type ColorInputMode = (typeof COLOR_INPUT_MODES)[number]

export type ColorInputState = (typeof COLOR_INPUT_STATES)[number]
