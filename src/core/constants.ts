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
 * @internal
 */
export const POPOVER_MOTION_CONTENT_OPACITY_PROPERTY = '--motion-content-opacity'

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
  initial: {
    opacity: 0.5,
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: 0,
    scale: 0.97,
    willChange: 'transform',
  },
  animate: {
    opacity: [null, 1, 1],
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: [null, null, 1],
    scale: 1,
  },
  exit: {
    // @ts-expect-error -- passing null a second time is valid: https://github.com/framer/motion/blob/b9ce4c42914c3916ea523609c5b032dfc72718bb/packages/framer-motion/src/animation/utils/keyframes.ts#L34C22-L34C22
    opacity: [null, null, 0],
    [POPOVER_MOTION_CONTENT_OPACITY_PROPERTY as string]: [null, 0, 0],
    scale: 0.97,
  },
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
