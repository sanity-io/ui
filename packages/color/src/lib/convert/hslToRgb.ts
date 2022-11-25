import {HSL, RGB} from '../../types'

/** @internal */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl[0]
  const s = hsl[1] / 100
  const l = hsl[2] / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  return [255 * f(0), 255 * f(8), 255 * f(4)]
}
