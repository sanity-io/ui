import {ColorHueKey} from '@sanity/color'

export interface ColorTokenContext {
  hue: ColorHueKey
  scheme: 'light' | 'dark'
}
