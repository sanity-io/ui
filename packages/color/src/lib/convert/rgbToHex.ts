import {RGB} from '../../types'

/** @internal */
export function rgbToHex([r, g, b]: RGB): string {
  const _r = Math.round(r)
  const _g = Math.round(g)
  const _b = Math.round(b)

  return '#' + ((1 << 24) + (_r << 16) + (_g << 8) + _b).toString(16).slice(1)
}
