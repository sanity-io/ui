import {COLOR_TINTS} from './constants'
import {hslToRgb} from './lib/convert/hslToRgb'
import {rgbToHex} from './lib/convert/rgbToHex'
import {ColorTintConfig, ColorHueConfig, ColorHueKey, ColorTints} from './types'

/** @internal */
export function buildTints(options: {
  hueKey: ColorHueKey
  black: ColorTintConfig
  color: ColorHueConfig
}): ColorTints {
  const {hueKey, color} = options

  return COLOR_TINTS.reduce<Partial<ColorTints>>((acc, tintKey) => {
    const tint = Number(tintKey)
    const rgb = hslToRgb(color.tints[tintKey].hsl)
    const hex = rgbToHex([Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])])

    acc[tintKey] = {
      title: `${hueKey.slice(0, 1).toUpperCase()}${hueKey.slice(1)} ${tint}`,
      hex,
    }

    return acc
  }, {}) as ColorTints
}
