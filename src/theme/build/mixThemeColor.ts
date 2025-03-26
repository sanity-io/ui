import {multiply, parseColor, RGB, rgbToHex, screen} from './lib/color-fns'
import {clamp, range} from './lib/utils'

const RGB_RANGE: [number, number] = [0, 255]

export function mixThemeColor(
  value: string,
  options: {
    bg?: string
    blendMode: 'multiply' | 'screen'
    black: string
    white: string
  },
): string {
  const {blendMode} = options

  const color = parseColor(value)
  const black = parseColor(options.black)
  const white = parseColor(options.white)

  const bg = options.bg ? parseColor(options.bg) : blendMode === 'multiply' ? white : black

  const paletteRange: {r: [number, number]; g: [number, number]; b: [number, number]} = {
    r: [black.r, white.r],
    g: [black.g, white.g],
    b: [black.b, white.b],
  }

  const convertedBgColor: RGB = {
    r: clamp(range(...paletteRange.r, ...RGB_RANGE, bg.r), ...RGB_RANGE),
    g: clamp(range(...paletteRange.g, ...RGB_RANGE, bg.g), ...RGB_RANGE),
    b: clamp(range(...paletteRange.b, ...RGB_RANGE, bg.b), ...RGB_RANGE),
  }

  const convertedColor: RGB = {
    r: clamp(range(...paletteRange.r, ...RGB_RANGE, color.r), ...RGB_RANGE),
    g: clamp(range(...paletteRange.g, ...RGB_RANGE, color.g), ...RGB_RANGE),
    b: clamp(range(...paletteRange.b, ...RGB_RANGE, color.b), ...RGB_RANGE),
  }

  const resultColor =
    blendMode === 'multiply'
      ? multiply(convertedBgColor, convertedColor)
      : screen(convertedBgColor, convertedColor)

  const v: RGB = {
    r: clamp(range(...RGB_RANGE, ...paletteRange.r, resultColor.r), ...paletteRange.r),
    g: clamp(range(...RGB_RANGE, ...paletteRange.g, resultColor.g), ...paletteRange.g),
    b: clamp(range(...RGB_RANGE, ...paletteRange.b, resultColor.b), ...paletteRange.b),
  }

  return rgbToHex(v)
}
