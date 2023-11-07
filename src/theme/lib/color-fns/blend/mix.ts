import {RGB, RGBA} from '../types'

function mixChannel(b: number, s: number, weight: number) {
  const diff = s - b

  // if (diff === 0) return b

  const delta = diff * weight

  // return b + delta

  return b + delta
}

/**
 * Apply the \`mix\` blend mode
 * @internal
 */
export function mix(b: RGB | RGBA, s: RGB | RGBA, weight: number): RGB {
  return {
    r: mixChannel(b.r, s.r, weight),
    g: mixChannel(b.g, s.g, weight),
    b: mixChannel(b.b, s.b, weight),
  }
}
