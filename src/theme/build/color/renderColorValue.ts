import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {ColorThemePalette, parseTokenValue} from '../../config'
import {rgba} from '../../lib/color-fns'
import {ColorBlendModeValue} from '../../system'
import {mix} from './mix'

export interface RenderColorValueOptions {
  colorPalette: ColorThemePalette
  baseBg?: string
  blendMode: ColorBlendModeValue
  scheme: 'light' | 'dark'
}

export function renderColorValue(str: string, options: RenderColorValueOptions): string {
  const {colorPalette, baseBg: bg, blendMode, scheme} = options

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
    hex = mix(hex, {
      blendMode,
      bg,
      black: renderColorHex(colorPalette.black),
      scheme,
      white: renderColorHex(colorPalette.white),
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('could not blend', hex)
  }

  if (hex === '#aN') {
    // throw new Error(`Invalid color token value: ${str}`)
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
