import type {MotionProps} from 'motion/react'

/**
 * @internal
 */
export const EMPTY_ARRAY: never[] = []

/**
 * @internal
 */
export const EMPTY_RECORD: Record<string, never> = {}

const POPOVER_MOTION_DURATION = 0.2

/**
 * The `motion` props shared by the `Popover` and `Tooltip` cards.
 *
 * Spread as a whole, and only while animating. `motion` treats any component
 * with `variants` as a variant node and hands it the variant labels of the
 * nearest animating ancestor, so a card that keeps its `variants` while
 * dropping `initial`/`animate` mounts on an ancestor popover's `hidden`
 * variant. It only leaves that variant if the ancestor changes label again,
 * which a card mounting after the ancestor's enter animation never sees.
 *
 * @internal
 */
export const POPOVER_MOTION_PROPS = {
  variants: {
    initial: {
      scale: 0.97,
      willChange: 'transform',
    },
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: POPOVER_MOTION_DURATION / 2,
      },
    },
    scaleIn: {
      scale: 1,
    },
    scaleOut: {
      scale: 0.97,
    },
  },
  transition: {
    type: 'spring',
    visualDuration: POPOVER_MOTION_DURATION,
    bounce: 0.25,
  },
  initial: ['hidden', 'initial'],
  animate: ['visible', 'scaleIn'],
  exit: ['hidden', 'scaleOut'],
} satisfies MotionProps
