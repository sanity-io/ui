import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {ThemeColorPalette, parseTokenValue} from '../config'
import {ThemeColorBlendModeKey} from '../system'
import {hexToRgb, mix, rgbToHex, rgba} from './lib/color-fns'
import {mixThemeColor} from './mixThemeColor'

export interface RenderColorValueOptions {
  bg?: string
  blendMode: ThemeColorBlendModeKey
  colorPalette: ThemeColorPalette
}

export function renderColorValue(str: string, options: RenderColorValueOptions): string {
  const {bg, blendMode, colorPalette} = options

  if (bg === 'white') {
    throw new Error('Cannot blend with white background')
  }

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

  const mixOptions = {
    blendMode,
    bg,
    black: renderColorHex(colorPalette.black),
    // opacity: node.opacity,
    white: renderColorHex(colorPalette.white),
  }

  try {
    hex = mixThemeColor(hex, mixOptions)

    if (bg && node.mix !== undefined) {
      const from = hexToRgb(bg)
      const to = hexToRgb(hex)

      hex = rgbToHex(mix(from, to, node.mix))
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('could not blend', hex, mixOptions)
    throw err
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
