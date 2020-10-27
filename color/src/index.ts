import * as hues from './colorPalette'
import {black as blackHex, white as whiteHex} from './config'
import {ColorPalette} from './types'

export * from './constants'
export * from './types'

export const color: ColorPalette = {
  ...hues,
  black: {title: 'Black', hex: blackHex},
  white: {title: 'White', hex: whiteHex},
}
