import {Transition, Variant} from 'framer-motion'

/**
 * @internal
 */
export const EMPTY_ARRAY: never[] = []

/**
 * @internal
 */
export const EMPTY_RECORD: Record<string, never> = {}

/**
 * Shared `framer-motion` variants used by `Popover` and `Tooltip` components.
 * @internal
 */
export const POPOVER_MOTION_PROPS: {
  animate: Variant
  initial: Variant
  exit: Variant
  transition: Transition
} = {
  initial: {opacity: 0.5, scale: 0.97},
  animate: {opacity: 1, scale: 1},
  exit: {opacity: 0, scale: 0.97},
  transition: {duration: 0.4, type: 'spring'},
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
