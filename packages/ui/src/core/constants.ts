import type {Transition, Variant} from 'motion/react'

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
 * Shared `motion` variants used by `Popover` and `Tooltip` components.
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

/**
 * @internal
 * @deprecated No longer used.
 */
export const FLOATING_STATIC_SIDES: Record<string, 'bottom' | 'left' | 'top' | 'right'> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
