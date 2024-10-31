import {type HUES, type TINTS} from './constants'

export type Hue = (typeof HUES)[number]
export type Tint = (typeof TINTS)[number]

export type PaletteConfig = {
  chroma: {
    min: number
    max: number
  }
  luminosity: {
    min: number
    max: number
  }
  hues: Record<Hue, {h: number; c: number}>
}
