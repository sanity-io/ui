import {ColorHueKey} from '@sanity/color'
import {ColorToken} from './token'

export interface ElementColorTokens {
  _hue: ColorHueKey
  bg: {
    1: [ColorToken, ColorToken] // enabled
    2: [ColorToken, ColorToken] // hovered
    3: [ColorToken, ColorToken] // pressed
    4: [ColorToken, ColorToken] // disabled
  }
  border: {
    1: [ColorToken, ColorToken] // enabled
    2: [ColorToken, ColorToken] // hovered
    3: [ColorToken, ColorToken] // pressed
    4: [ColorToken, ColorToken] // disabled
  }
  fg: {
    1: [ColorToken, ColorToken] // enabled
    2: [ColorToken, ColorToken] // hovered
    3: [ColorToken, ColorToken] // pressed
    4: [ColorToken, ColorToken] // disabled
  }
}
