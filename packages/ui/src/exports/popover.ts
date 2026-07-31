'use client'

// The `@sanity/ui/popover` entry point. `Popover` is positioned with
// `@floating-ui/react-dom` and animated with `motion`, so it lives on its own
// subpath to keep those dependencies out of the root entry point.
export {Popover, type PopoverProps} from '../core/primitives/popover/popover'
export type {PopoverUpdateCallback, PopoverWidth} from '../core/primitives/popover/types'
export type {PopoverMargins} from '../core/types/popover'
