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
 * The animation plays in acts of this length, in seconds. In the first act
 * the top half of the slices pop in, one at a time like the segments of a
 * classic spinner; in the second the wheel spins up while the bottom half pop
 * in; in the third the colors pop out again as the spin's speed carries over
 * into the clearing.
 */
const ACT_DURATION = 0.55

/**
 * The clearing would take a whole act to come to rest, but its last slice
 * pops out as the clearing reaches that slice's leading edge — with nothing
 * left to show, the animation ends there
 */
const CLEARING_ACTS = 1 - Math.cbrt(1 / SLICE_COUNT)

const TOTAL_ACTS = 2 + CLEARING_ACTS

/** How long the whole animation takes, in seconds */
export const ANIMATION_DURATION = ACT_DURATION * TOTAL_ACTS

function actAt(progress: number): number {
  return progress * TOTAL_ACTS
}

/**
 * How far the wheel has turned at `progress` (0–1), in degrees.
 *
 * It stands still while the top half of the slices pop in. As the 6 o'clock
 * slice pops in it starts spinning — one full turn with a cubic ease-in, from
 * rest to top speed as the bottom half pop in — and it stands still again the
 * moment it is back upright: the clearing of {@link isSliceFilled} takes off
 * at the speed the spin reached, as if the wheel kept turning and eased out
 * over a second turn, so the two read as one movement.
 */
export function wheelRotation(progress: number): number {
  const spin = actAt(progress) - 1

  if (spin <= 0 || spin >= 1) return 0

  return 360 * spin ** 3
}

/**
 * Whether slice `index` (clockwise from 12 o'clock) shows its color at
 * `progress` (0–1). A slice pops in whole as the fill reaches its leading
 * edge, and pops out whole as the clearing does — stepped, never partial.
 *
 * The fill goes clockwise at a steady pace over the first two acts, half of
 * the slices in each. The clearing follows in the third act, the same way
 * round, on a cubic ease-out that starts at the speed the spin of
 * {@link wheelRotation} ends with: the slices at first pop out as quickly as
 * they were passing by, then ever more slowly.
 */
export function isSliceFilled(progress: number, index: number): boolean {
  const act = actAt(progress)
  const filling = (act * SLICE_COUNT) / 2

  if (filling <= index) return false

  const clearing = act - 2

  if (clearing <= 0) return true

  return (1 - (1 - clearing) ** 3) * SLICE_COUNT < index
}
