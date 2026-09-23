import {Hue, HueMidPoint, Hues} from '../generator/types'

/** The six hues in the order the hosted Themer's sidebar listed them */
export const HUE_KEYS = [
  'default',
  'primary',
  'transparent',
  'positive',
  'caution',
  'critical',
] as const satisfies readonly (keyof Hues)[]

/** The tints a hue's `mid` color can be placed at, in ramp order */
export const MID_POINTS: readonly HueMidPoint[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
]

export function isMidPoint(value: number): value is HueMidPoint {
  return MID_POINTS.some((midPoint) => midPoint === value)
}

/**
 * Snaps a mid-point range value (50–950, step 1) to the nearest tint, the way
 * the hosted Themer did.
 */
export function roundMidPoint(value: number): HueMidPoint {
  if (value < 75) return 50
  if (value > 925) return 950

  const rounded = Math.round(value / 100) * 100

  // Every multiple of 100 between 100 and 900 is a mid point, so this only
  // guards against NaN
  return isMidPoint(rounded) ? rounded : 500
}

/** The next tint up or down the ramp, staying put at either end */
export function stepMidPoint(midPoint: HueMidPoint, direction: -1 | 1): HueMidPoint {
  const index = MID_POINTS.indexOf(midPoint)
  const next = MID_POINTS[index + direction]

  return next ?? midPoint
}

function sameHue(a: Hue, b: Hue): boolean {
  return (
    a.midPoint === b.midPoint &&
    a.mid.toLowerCase() === b.mid.toLowerCase() &&
    a.lightest.toLowerCase() === b.lightest.toLowerCase() &&
    a.darkest.toLowerCase() === b.darkest.toLowerCase()
  )
}

/** Whether two sets of hues generate the same theme */
export function sameHues(a: Hues, b: Hues): boolean {
  return HUE_KEYS.every((key) => sameHue(a[key], b[key]))
}

/**
 * `<input type="color">` only takes `#rrggbb`, while the generator also
 * accepts `#rgb` (the default preset's `lightest` is `#fff`).
 */
export function expandHex(color: string): string {
  if (color.length !== 4) return color

  const [, r, g, b] = color

  return `#${r}${r}${g}${g}${b}${b}`
}
