import {HSL, RGB} from './types'

/**
 * @internal
 */
export function hexToRgb(hex: string) {
  if (hex.length === 4) {
    const hexR = hex.slice(1, 2)
    const hexG = hex.slice(2, 3)
    const hexB = hex.slice(3, 4)

    return {
      r: parseInt(hexR + hexR, 16),
      g: parseInt(hexG + hexG, 16),
      b: parseInt(hexB + hexB, 16),
    }
  }

  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

/**
 * @internal
 */
export function rgbToHex({r, g, b}: RGB): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * @internal
 */
export function hslToRgb(hsl: HSL): RGB {
  // Must be fractions of 1
  const s = hsl.s / 100
  const l = hsl.l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (0 <= hsl.h && hsl.h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= hsl.h && hsl.h < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}
