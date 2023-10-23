import {ColorTint, ColorTintKey, ColorTints, black, white} from '@sanity/color'
import {mix} from 'polished'
import {ThemeColorSchemes} from '../types'

function getColorHex(mid: string, tint: string, $midPoint: number): string {
  const config = {
    title: 'primary',
    darkest: black.hex,
    mid: mid,
    lightest: white.hex,
    midPoint: $midPoint,
  }

  const tintNum = Number(tint)
  const midPoint = config.midPoint || 500
  const darkSize = 1000 - midPoint
  const lightPosition = tintNum / midPoint
  const darkPosition = (tintNum - midPoint) / darkSize

  if (tintNum === midPoint) {
    return config.mid.toLowerCase()
  }

  // light side of scale: x < midPoint
  if (tintNum < midPoint) {
    return mix(lightPosition, config.mid, config.lightest)
  }

  // dark side of scale: x > midPoint
  return mix(darkPosition, config.darkest, config.mid)
}

const COLOR_TINTS: ColorTintKey[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
]

export function createLegacyTints({
  hex,
  tone,
  midPoint,
}: {
  hex: string
  tone: string
  midPoint: number
}): ColorTints {
  const colorTints: ColorTints = COLOR_TINTS.reduce((acc: {[key: string]: ColorTint}, tint) => {
    acc[tint] = {
      title: `${tone} ${tint}`,
      hex: getColorHex(hex, tint, midPoint),
    }

    return acc
  }, {}) as ColorTints

  return colorTints
}

// TODO: Restore the type definition of the theme, including legacy colors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function createTonesWithLegacyColor(color: any): ThemeColorSchemes['tones'] {
  if (color.tones) return color.tones as ThemeColorSchemes['tones']
  // We need to iterate in the light theme
  // We know that in color.light.default.button.default[tone].enabled.bg we have the hex that is use in the midpoint 500
  // Iterate on all the tones, and return the new tones object

  const tones: ThemeColorSchemes['tones'] = {
    default: createLegacyTints({
      hex: color.light.default.button.default.default.enabled.bg,
      tone: 'default',
      midPoint: 500,
    }),
    // Transparent uses the same color as default
    transparent: createLegacyTints({
      hex: color.light.default.button.default.default.enabled.bg,
      tone: 'transparent',
      midPoint: 500,
    }),
    primary: createLegacyTints({
      hex: color.light.default.button.default.primary.enabled.bg,
      tone: 'primary',
      midPoint: 500,
    }),
    positive: createLegacyTints({
      hex: color.light.default.button.default.positive.enabled.bg,
      tone: 'positive',
      midPoint: 500,
    }),
    caution: createLegacyTints({
      hex: color.light.default.button.default.caution.enabled.bg,
      tone: 'caution',
      midPoint: 500,
    }),
    critical: createLegacyTints({
      hex: color.light.default.button.default.critical.enabled.bg,
      tone: 'critical',
      midPoint: 500,
    }),
  }

  return tones
}
