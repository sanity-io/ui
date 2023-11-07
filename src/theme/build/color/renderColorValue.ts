import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {ColorThemePalette, parseTokenValue} from '../../config'
import {rgba} from '../../lib/color-fns'
import {ColorBlendModeValue} from '../../system'
import {mixThemeColor} from './mixThemeColor'

export interface RenderColorValueOptions {
  bg?: string
  blendMode: ColorBlendModeValue
  colorPalette: ColorThemePalette
}

export function renderColorValue(str: string, options: RenderColorValueOptions): string {
  const {bg, blendMode, colorPalette} = options

  const node = parseTokenValue(str)

  if (!node || node.type !== 'color') {
    throw new Error(`Invalid color token value: ${str}`)
  }

  let hex = ''

  if (node.key === 'black') {
    hex = renderColorHex(colorPalette.black)
  }

  if (node.key === 'white') {
    hex = renderColorHex(colorPalette.white)
  }

  if (node.hue && node.tint) {
    hex = renderColorHex(colorPalette[node.hue][node.tint])
  }

  if (!hex) {
    throw new Error(`Invalid color token value: ${str}`)
  }

  const hexBeforeMix = hex

  try {
    hex = mixThemeColor(hex, {
      blendMode,
      bg,
      black: renderColorHex(colorPalette.black),
      // opacity: node.opacity,
      white: renderColorHex(colorPalette.white),
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('could not blend', hex)
  }

  if (hex === '#aN') {
    // eslint-disable-next-line no-console
    console.warn(`invalid color token value: ${str}`)
    hex = hexBeforeMix
  }

  if (node.opacity !== undefined) {
    hex = rgba(hex, node.opacity)
  }

  return hex
}

function renderColorHex(color: string | ColorPaletteValue) {
  return typeof color === 'string' ? color : color.hex
}
