import {RGB, RGBA} from '../types'

function multiplyChannel(b: number, s: number) {
  return b * s
}

/**
 * Apply the \`multiply\` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingmultiply
 * @internal
 */
export function multiply(b: RGB | RGBA, s: RGB | RGBA): RGB {
  return {
    r: multiplyChannel(b.r / 255, s.r / 255) * 255,
    g: multiplyChannel(b.g / 255, s.g / 255) * 255,
    b: multiplyChannel(b.b / 255, s.b / 255) * 255,
  }
}
