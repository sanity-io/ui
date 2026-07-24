import {ColorHueKey, ColorTintKey, HSL} from '@sanity/color'

export interface ColorToolSwatch {
  key: ColorTintKey
  hsl: HSL
}

export interface ColorHueNode {
  hue: ColorHueKey
  swatches: ColorToolSwatch[]
}

interface ColorToolSwatchUpdateMsg {
  type: 'swatch/update'
  hue: ColorHueKey
  tint: ColorTintKey
  hsl: HSL
}

export type ColorToolMsg = ColorToolSwatchUpdateMsg
