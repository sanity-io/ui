import type {ContainerWidth} from '@sanity/ui/theme'

/**
 * @beta
 */
export type PopoverMargins = [number, number, number, number]

/** @public */
export type PopoverUpdateCallback = () => void

/** @public */
export type PopoverWidth = Exclude<ContainerWidth, 'auto'>
