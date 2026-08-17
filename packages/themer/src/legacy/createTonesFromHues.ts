import {COLOR_TINTS, ColorTints} from '@sanity/color'

import {mix} from '../lib/mix'
import {Hue, Hues} from './types'

/**
 * Generates the tint ramp for each of the six hues, exactly like the hosted
 * Themer service did.
 */
export function createTonesFromHues(hues: Hues): {
  default: ColorTints
  primary: ColorTints
  transparent: ColorTints
  positive: ColorTints
  caution: ColorTints
  critical: ColorTints
} {
  return {
    default: createTintsFromHue(hues.default, 'Default'),
    primary: createTintsFromHue(hues.primary, 'Primary'),
    transparent: createTintsFromHue(hues.transparent, 'Transparent'),
    positive: createTintsFromHue(hues.positive, 'Positive'),
    caution: createTintsFromHue(hues.caution, 'Caution'),
    critical: createTintsFromHue(hues.critical, 'Critical'),
  }
}

function createTintsFromHue(hue: Hue, title: string): ColorTints {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the reduce assigns every COLOR_TINTS key, so the Partial is complete
  return COLOR_TINTS.reduce<Partial<ColorTints>>((tints, tint) => {
    tints[tint] = {
      title: `${title} ${tint}`,
      hex: getColorHex(hue, tint),
    }

    return tints
  }, {}) as ColorTints
}

function getColorHex(hue: Hue, tint: string): string {
  const tintNum = Number(tint)
  const midPoint = hue.midPoint
  const darkSize = 1000 - midPoint
  const lightPosition = tintNum / midPoint
  const darkPosition = (tintNum - midPoint) / darkSize

  if (tintNum === midPoint) {
    return hue.mid.toLowerCase()
  }

  // light side of scale: x < midPoint
  if (tintNum < midPoint) {
    return mix(lightPosition, hue.mid, hue.lightest)
  }

  // dark side of scale: x > midPoint
  return mix(darkPosition, hue.darkest, hue.mid)
}
