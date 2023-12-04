import {parseColor} from './parse'
import {RGB, RGBA} from './types'

/** @internal */
export function getContrastRatio(bg: string, fg: string): number {
  const rgb1 = parseColor(bg) // bg: RGB | RGBA, fg: RGB | RGBA
  const rgb2 = parseColor(fg)

  // convert the two colors from sRGB to linear-light RGB
  const c1 = rgb_lrgb(rgb1)
  const c2 = rgb_lrgb(rgb2)

  // compute the relative luminances
  const l1 = lrgb_luminance(c1)
  const l2 = lrgb_luminance(c2)

  // compute the contrast ratio
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function rgb_lrgb({r, g, b}: RGB | RGBA): [number, number, number] {
  return [rgb_lrgb1(r / 255), rgb_lrgb1(g / 255), rgb_lrgb1(b / 255)]
}

function rgb_lrgb1(v: number) {
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

function lrgb_luminance([r, g, b]: [number, number, number]) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
