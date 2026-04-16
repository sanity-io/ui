import Color from 'colorjs.io'

import type {_DTCGColorValue} from '../dtcg/types'

const CHANNEL_PRECISION = 3

/**
 * Mix two colors using colorjs.io
 * @param color1 First color (_DTCGColorValue or token reference string)
 * @param color2 Second color (_DTCGColorValue or token reference string)
 * @param ratio Mix ratio from 0 to 1 (0 = 100% color1, 1 = 100% color2)
 * @param space Color space for mixing ('srgb' or 'oklab')
 * @param palette Palette to resolve token references
 * @returns Mixed color as _DTCGColorValue
 * @internal
 */
export function mixColors(
  space: 'srgb' | 'oklab' = 'srgb',
  from: _DTCGColorValue,
  to: _DTCGColorValue,
  ratio: number,
): _DTCGColorValue {
  const c1 = new Color(from.colorSpace, from.components, from.alpha ?? 1)
  const c2 = new Color(to.colorSpace, to.components, to.alpha ?? 1)

  // Use colorjs.io mix API
  const mixed = c1.mix(c2, ratio, {space})

  // Convert back to DTCG format (always output as sRGB)
  const srgb = mixed.to('srgb')

  return {
    colorSpace: 'srgb',
    components: [
      _roundChannel(srgb.coords[0] ?? 0),
      _roundChannel(srgb.coords[1] ?? 0),
      _roundChannel(srgb.coords[2] ?? 0),
    ],
    alpha: _roundChannel(mixed.alpha ?? 1),
    hex: mixed.toString({format: 'hex'}),
  }
}

function _roundChannel(value: number): number {
  return _round(value, CHANNEL_PRECISION)
}

function _round(value: number, precision: number): number {
  const factor = 10 ** precision

  const n = Math.round((value + Number.EPSILON) * factor) / factor

  return Object.is(n, -0) ? 0 : n
}
