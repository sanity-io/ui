import type {Transition, Variant} from 'framer-motion'

/**
 * @internal
 */
export const EMPTY_ARRAY: never[] = []

/**
 * @internal
 */
export const EMPTY_RECORD: Record<string, never> = {}

/**
 * @internal
 */
export const POPOVER_MOTION_CONTENT_OPACITY_PROPERTY = '--motion-content-opacity' as string

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
  /**
   * These variants makes use of special timing, by using a negative opacity as a starting position,
   * as well as double opacity as the end position.
   * The purpose of this is to make the tooltip/popover container appear before the content, and when exiting
   * we want the content to disappear faster than the container.
   */
  initial: {
    opacity: 0.5,
    // the nagative opacity here, as well as the double opacity further down, are to make the content appear after the backgdrop, and when exiting the content should disappear first.
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: -1,
    scale: 0.97,
    willChange: 'transform',
  },
  animate: {
    opacity: 2,
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: -1,
    scale: 0.97,
  },
  transition: {
    duration: 0.4,
    type: 'spring',
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
