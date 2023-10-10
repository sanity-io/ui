import {RGB} from '../../types'
import {clamp} from '../clamp'

function darkenChannel(backdrop: number, source: number) {
  return Math.min(backdrop, source)
}

/**
 * Apply the `darken` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingdarken
 *
 * @internal
 */
export function darken(b: RGB, s: RGB): RGB {
  return [
    Math.round(clamp(darkenChannel(b[0] / 255, s[0] / 255) * 255)),
    Math.round(clamp(darkenChannel(b[1] / 255, s[1] / 255) * 255)),
    Math.round(clamp(darkenChannel(b[2] / 255, s[2] / 255) * 255)),
  ]
}
