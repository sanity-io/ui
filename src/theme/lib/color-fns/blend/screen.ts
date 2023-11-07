import {RGB, RGBA} from '../types'

function screenChannel(b: number, s: number) {
  return b + s - b * s
}

/**
 * Apply the \`screen\` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 * @internal
 */
export function screen(b: RGB | RGBA, s: RGB | RGBA): RGB {
  return {
    r: screenChannel(b.r / 255, s.r / 255) * 255,
    g: screenChannel(b.g / 255, s.g / 255) * 255,
    b: screenChannel(b.b / 255, s.b / 255) * 255,
  }
}
