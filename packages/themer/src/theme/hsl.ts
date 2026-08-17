/**
 * Color math for the palette generator, kept at full float precision: unlike
 * the HSL helpers in `@sanity/ui/theme`, nothing is rounded between the two
 * conversions, so `hslToHex(hexToHsl(hex))` returns `hex` unchanged for every
 * color. `buildTheme` relies on that to reproduce the stock `@sanity/color`
 * palette byte-for-byte when it is called with the stock anchor colors.
 */

/**
 * A color in HSL space: `h` in degrees within `[0, 360)`, `s` and `l` as
 * fractions within `[0, 1]`.
 *
 * @internal
 */
export interface Hsl {
  h: number
  s: number
  l: number
}

/** @internal */
export function hexToHsl(hex: string): Hsl {
  const [r, g, b] = parseHex(hex)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  const l = (max + min) / 2

  if (delta === 0) {
    return {h: 0, s: 0, l}
  }

  const s = delta / (1 - Math.abs(2 * l - 1))

  let h: number

  if (max === r) {
    h = ((g - b) / delta) % 6
  } else if (max === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  return {h: normalizeHue(h * 60), s, l}
}

/** @internal */
export function hslToHex(hsl: Hsl): string {
  const h = normalizeHue(hsl.h)
  const s = clamp01(hsl.s)
  const l = clamp01(hsl.l)

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

  return `#${channelToHex(r + m)}${channelToHex(g + m)}${channelToHex(b + m)}`
}

/**
 * Rotates `from` towards `to` along the shortest arc of the hue circle.
 *
 * @internal
 */
export function mixHue(from: number, to: number, amount: number): number {
  const delta = ((((to - from) % 360) + 540) % 360) - 180

  return normalizeHue(from + delta * amount)
}

/**
 * The WCAG relative luminance of a hex color, between 0 (black) and 1 (white).
 *
 * @internal
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex)

  return 0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b)
}

function linearChannel(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

/** Parses `#abc` and `#aabbcc` hex colors into channel fractions of 1 */
function parseHex(hex: string): [number, number, number] {
  const expanded =
    hex.length === 4 ? `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex.slice(1)

  return [
    parseInt(expanded.slice(0, 2), 16) / 255,
    parseInt(expanded.slice(2, 4), 16) / 255,
    parseInt(expanded.slice(4, 6), 16) / 255,
  ]
}

function channelToHex(value: number): string {
  return Math.round(clamp01(value) * 255)
    .toString(16)
    .padStart(2, '0')
}

function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}
