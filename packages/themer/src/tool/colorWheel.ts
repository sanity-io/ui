import {blue, cyan, green, magenta, orange, purple, red, yellow} from '@sanity/color'

/**
 * The spokes of the color wheel icon (`ColorWheelIcon` from `@sanity/icons`)
 * cut its ring into this many slices, one of them centered on 12 o'clock
 */
export const SLICE_COUNT = 8

/**
 * The colors the slices fill with, clockwise from 12 o'clock: the palette's
 * hues in rainbow order, like a real color swatch
 */
export const SLICE_COLORS: readonly string[] = [
  red[500].hex,
  orange[500].hex,
  yellow[400].hex,
  green[500].hex,
  cyan[500].hex,
  blue[500].hex,
  purple[500].hex,
  magenta[500].hex,
]

/**
 * The animation plays in three acts of this length, in seconds: the top half
 * of the slices fill, the wheel spins up while the bottom half fill, and the
 * colors clear again as the spin's speed carries over into the clearing
 */
const ACT_DURATION = 0.55

/** How long the whole animation takes, in seconds */
export const ANIMATION_DURATION = ACT_DURATION * 3

/**
 * How far the wheel has turned at `progress` (0–1), in degrees.
 *
 * It stands still while the top half fills. As the fill reaches 6 o'clock it
 * starts spinning — one full turn with a cubic ease-in, from rest to top speed
 * as the bottom half fills up — and it stands still again the moment it is
 * back upright: the clearing sweep of {@link sliceDash} takes off at the speed
 * the spin reached, as if the wheel kept turning and eased out over a second
 * turn, so the two read as one movement.
 */
export function wheelRotation(progress: number): number {
  const spin = progress * 3 - 1

  if (spin <= 0 || spin >= 1) return 0

  return 360 * spin ** 3
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * The filled part of slice `index` (clockwise from 12 o'clock) at `progress`
 * (0–1), as a stretch of the ring's circumference: where it starts, measured
 * clockwise from the slice's own leading edge, and how long it is — both as
 * fractions of the circumference, ready for motion's `pathOffset` and
 * `pathLength` on a ring whose path starts at that edge. Neither ever exceeds
 * a slice's eighth of the ring.
 *
 * The fill sweeps clockwise at a steady pace over the first two acts, half of
 * the slices in each, and the third act clears the slices the same way round,
 * with a cubic ease-out that starts at the speed the spin of
 * {@link wheelRotation} ends with.
 */
export function sliceDash(progress: number, index: number): {offset: number; length: number} {
  const act = progress * 3
  const filled = clamp01((act * SLICE_COUNT) / 2 - index)
  const clearing = act - 2
  const cleared = clearing <= 0 ? 0 : clamp01((1 - (1 - clearing) ** 3) * SLICE_COUNT - index)

  return {offset: cleared / SLICE_COUNT, length: (filled - cleared) / SLICE_COUNT}
}
