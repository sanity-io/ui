import {hslToRgb} from './lib/convert/hslToRgb'
import {rgbToHex} from './lib/convert/rgbToHex'
import {
  ColorTint,
  ColorTintConfig,
  ColorHueConfig,
  ColorHueKey,
  ColorTintKey,
  ColorTints,
} from './types'

/** @internal */
export function buildTints(options: {
  hueKey: ColorHueKey
  black: ColorTintConfig
  color: ColorHueConfig
}): ColorTints {
  const {hueKey, color} = options

  const buildTint = (tintKey: ColorTintKey): ColorTint => {
    const tint = Number(tintKey)
    const rgb = hslToRgb(color.tints[tintKey].hsl)
    const hex = rgbToHex([Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])])

    return {
      title: `${hueKey.slice(0, 1).toUpperCase()}${hueKey.slice(1)} ${tint}`,
      hex,
    }
  }

  return {
    '50': buildTint('50'),
    '100': buildTint('100'),
    '200': buildTint('200'),
    '300': buildTint('300'),
    '400': buildTint('400'),
    '500': buildTint('500'),
    '600': buildTint('600'),
    '700': buildTint('700'),
    '800': buildTint('800'),
    '900': buildTint('900'),
    '950': buildTint('950'),
  } satisfies ColorTints
}
