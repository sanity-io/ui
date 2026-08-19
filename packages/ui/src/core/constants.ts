import type {TargetAndTransition, Transition, Variant} from 'motion/react'

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
 * Shared `framer-motion` variants used by `Popover` and `Tooltip` components.
 * @internal
 */
export const POPOVER_MOTION_PROPS: {
  card: {
    initial: Variant
    hidden: Variant
    visible: Variant
    scaleIn: Variant
    scaleOut: Variant
  }
  content: {
    hidden: TargetAndTransition
    visible: TargetAndTransition
  }
  transition: Transition
} = {
  card: {
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
  /**
   * Crossfade targets for the popover content wrapper. These are plain
   * animation targets (not variants): the content fade is driven directly by
   * the `open` prop rather than by variant/exit propagation from the card,
   * so that any open/close/open sequence converges to the correct opacity.
   * On enter, the content starts fading in halfway through the card fade
   * (which lasts `POPOVER_MOTION_DURATION / 2`); on exit, it fades out
   * together with the card.
   */
  content: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        visualDuration: POPOVER_MOTION_DURATION,
        bounce: 0.25,
        delay: POPOVER_MOTION_DURATION / 4,
      },
    },
  },
  transition: {
    type: 'spring',
    visualDuration: POPOVER_MOTION_DURATION,
    bounce: 0.25,
  },
}
