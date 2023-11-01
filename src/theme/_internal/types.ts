import {ThemeColorBase, ThemeColorButton} from '../lib/theme'
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

// todo: replace with `ThemeColor`
export interface TMP_BaseColorTheme {
  _blend: ColorBlendModeValue
  dark: boolean
  base: ThemeColorBase
  button: ThemeColorButton
  // card: ThemeColorCard
  // input: ThemeColorInput
  // selectable?: ThemeColorSelectable
  // spot: ThemeColorSpot
  // syntax: ThemeColorSyntax
  // solid: ThemeColorSolid
  // muted: ThemeColorMuted
}

export type TMP_ColorTheme = Record<ColorBaseTone, TMP_BaseColorTheme>

export interface TMP_Theme {
  color: {
    light: TMP_ColorTheme
    dark: TMP_ColorTheme
  }
}
