import {usePrefersReducedMotion} from '@sanity/ui'
import {motion, MotionValue, useTransform} from 'motion/react'

import {SLICE_COLORS, SLICE_COUNT, sliceDash, wheelRotation} from './colorWheel'

/**
 * The geometry of `ColorWheelIcon` from `@sanity/icons`: a ring between two
 * circles around the center of a 25×25 viewBox, cut into eight slices by the
 * spokes of its outline path
 */
const CENTER = 12.5
const OUTER_RADIUS = 8
const INNER_RADIUS = 3.5
const OUTLINE =
  'M9.43853 5.10896L11.1606 9.26642M13.8394 15.7336L15.5615 19.891M15.7336 11.1606L19.891 9.43853M9.26642 13.8394L5.10896 15.5615M5.3139 9.52342L9.23359 11.147M15.7664 13.853L19.6861 15.4766M13.853 9.23359L15.4766 5.3139M9.52342 19.6861L11.147 15.7664M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5ZM16 12.5C16 14.433 14.433 16 12.5 16C10.567 16 9 14.433 9 12.5C9 10.567 10.567 9 12.5 9C14.433 9 16 10.567 16 12.5Z'

/**
 * Each slice is a full circle along the middle of the ring, stroked as wide
 * as the ring, with only the slice's own eighth of it dashed in — so filling
 * and clearing the slice comes down to the offset and length of that dash.
 * Circles rather than paths, as the icon styles of `@sanity/ui` force
 * `vector-effect: non-scaling-stroke` on every path in an icon, which would
 * keep the ring from scaling with the icon.
 */
const RING_RADIUS = (OUTER_RADIUS + INNER_RADIUS) / 2
const RING_WIDTH = OUTER_RADIUS - INNER_RADIUS

const SLICE_ANGLE = 360 / SLICE_COUNT

/**
 * A circle's path starts at 3 o'clock; each slice's circle is turned so that
 * it starts at the slice's own leading edge instead — the 12 o'clock slice is
 * centered on 12, so its edge sits half a slice before it. The dash then
 * stays within the first eighth of the path: browsers measure a circle's
 * length only approximately, and a dash placed far along the path would land
 * visibly off its spokes.
 */
function sliceRotation(index: number): number {
  return index * SLICE_ANGLE - SLICE_ANGLE / 2 - 90
}

function Slice(props: {index: number; progress: MotionValue<number>}) {
  const {index, progress} = props
  const pathOffset = useTransform(progress, (value) => sliceDash(value, index).offset)
  const pathLength = useTransform(progress, (value) => sliceDash(value, index).length)

  return (
    <g transform={`rotate(${sliceRotation(index)} ${CENTER} ${CENTER})`}>
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        fill="none"
        r={RING_RADIUS}
        stroke={SLICE_COLORS[index]}
        strokeWidth={RING_WIDTH}
        style={{pathLength, pathOffset}}
      />
    </g>
  )
}

/**
 * The `ColorWheelIcon` of `@sanity/icons`, with an animation driven by
 * `progress` (0–1): the slices fill with color clockwise from 12 o'clock like
 * a swatch fanning out, the wheel spins once as the fill reaches 6 o'clock, and
 * the colors clear the same way round, carrying the spin's speed to a rest
 * (see `colorWheel.ts`). At rest — at either end — it looks exactly like the
 * icon it stands in for. With `prefers-reduced-motion: reduce` the wheel
 * keeps still; only the colors come and go.
 *
 * @internal
 */
export function AnimatedColorWheelIcon(props: {progress: MotionValue<number>}) {
  const {progress} = props
  const prefersReducedMotion = usePrefersReducedMotion()
  const rotate = useTransform(progress, (value) =>
    prefersReducedMotion ? 0 : wheelRotation(value),
  )

  return (
    <motion.svg
      data-sanity-icon="color-wheel"
      fill="none"
      height="1em"
      style={{rotate}}
      viewBox="0 0 25 25"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {SLICE_COLORS.map((color, index) => (
        <Slice index={index} key={color} progress={progress} />
      ))}
      <path d={OUTLINE} stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2} />
    </motion.svg>
  )
}
