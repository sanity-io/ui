import {RGB, multiply, parseColor, rgbToHex, screen} from '../../lib/color-fns'
import {range} from '../../lib/utils'

export function mix(
  value: string,
  options: {
    bg?: string
    blendMode: 'multiply' | 'screen'
    black: string
    scheme: 'light' | 'dark'
    white: string
  },
): string {
  const {
    blendMode,
    // scheme
  } = options
  // const dark = scheme === 'dark'

  const color = parseColor(value)
  const black = parseColor(options.black)
  const white = parseColor(options.white)

  const bg = options.bg ? parseColor(options.bg) : blendMode === 'multiply' ? white : black

  const _range: {r: [number, number]; g: [number, number]; b: [number, number]} = {
    // r: dark ? [bg.r, white.r] : [black.r, bg.r],
    // g: dark ? [bg.g, white.g] : [black.g, bg.g],
    // b: dark ? [bg.b, white.b] : [black.b, bg.b],
    r: [black.r, white.r],
    g: [black.g, white.g],
    b: [black.b, white.b],
  }

  const convertedBgColor: RGB = {
    r: range(..._range.r, 0, 255, bg.r),
    g: range(..._range.g, 0, 255, bg.g),
    b: range(..._range.b, 0, 255, bg.b),
  }

  const convertedColor: RGB = {
    r: range(..._range.r, 0, 255, color.r),
    g: range(..._range.g, 0, 255, color.g),
    b: range(..._range.b, 0, 255, color.b),
  }

  const resultColor =
    blendMode === 'multiply'
      ? multiply(convertedBgColor, convertedColor)
      : screen(convertedBgColor, convertedColor)

  const v: RGB = {
    r: range(0, 255, ..._range.r, resultColor.r),
    g: range(0, 255, ..._range.g, resultColor.g),
    b: range(0, 255, ..._range.b, resultColor.b),
  }

  return rgbToHex(v)
}
