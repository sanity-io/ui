import {ColorBlendModeValue} from './config'
import {
  COLOR_BASE_TONES,
  COLOR_BUTTON_MODES,
  COLOR_HUES,
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

export interface TMP_StateColorTheme {
  _blend: ColorBlendModeValue
  bg: string
  fg: string
}

export type TMP_ButtonStatesColorTheme = Record<ColorState, TMP_StateColorTheme>

export type TMP_ButtonModesColorTheme = Record<ColorButtonMode, TMP_ButtonStatesColorTheme>

export type TMP_ButtonColorTheme = Record<ColorStateTone, TMP_ButtonModesColorTheme>

export interface TMP_BaseColorTheme {
  _blend: ColorBlendModeValue
  base: {
    bg: string
    fg: string
    border: string
  }
  button: TMP_ButtonColorTheme
}

export type TMP_ColorTheme = Record<ColorBaseTone, TMP_BaseColorTheme>

export interface TMP_Theme {
  color: {
    light: TMP_ColorTheme
    dark: TMP_ColorTheme
  }
}
