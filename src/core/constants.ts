import type {Transition, Variant} from 'motion/react'

export const EMPTY_ARRAY: never[] = []

export const EMPTY_RECORD: Record<string, never> = {}

const POPOVER_MOTION_DURATION = 0.2

/**
 * Shared `framer-motion` variants used by `Popover` and `Tooltip` components.
 */
export const POPOVER_MOTION_PROPS: {
  card: {
    initial: Variant
    hidden: Variant
    visible: Variant
    scaleIn: Variant
    scaleOut: Variant
  }
  children: {
    hidden: Variant
    visible: Variant
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
        when: 'beforeChildren',
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
  children: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  transition: {
    type: 'spring',
    visualDuration: POPOVER_MOTION_DURATION,
    bounce: 0.25,
  },
}

export const Z_OFFSETS = {
  dialog: 600,
  popover: 400,
  tooltip: 200,
}
