import {ColorHueKey, ColorTintKey, HSL} from '../../types'

export interface ColorToolSwatch {
  key: ColorTintKey
  hsl: HSL
}

export interface ColorHueNode {
  hue: ColorHueKey
  swatches: ColorToolSwatch[]
}

export interface ColorToolSwatchUpdateMsg {
  type: 'swatch/update'
  hue: ColorHueKey
  tint: ColorTintKey
  hsl: HSL
}

export type ColorToolMsg = ColorToolSwatchUpdateMsg
