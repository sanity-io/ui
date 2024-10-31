import type {ContainerWidth} from '@sanity/ui/theme'

/** @beta */
export type PopoverUpdateCallback = () => void

/** @public */
export type PopoverWidth = Exclude<ContainerWidth, 'auto'>
