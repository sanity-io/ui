'use client'

// The `@sanity/ui/tooltip` entry point. `Tooltip` is positioned with
// `@floating-ui/react-dom` and animated with `motion`, so it lives (together
// with the tooltip delay group API) on its own subpath to keep those
// dependencies out of the root entry point.
export {Tooltip, type TooltipProps} from '../core/primitives/tooltip/tooltip'
export {TooltipDelayGroupContext} from '../core/primitives/tooltip/tooltipDelayGroup/tooltipDelayGroupContext'
export {
  TooltipDelayGroupProvider,
  type TooltipDelayGroupProviderProps,
} from '../core/primitives/tooltip/tooltipDelayGroup/tooltipDelayGroupProvider'
export type {TooltipDelayGroupContextValue} from '../core/primitives/tooltip/tooltipDelayGroup/types'
export {useTooltipDelayGroup} from '../core/primitives/tooltip/tooltipDelayGroup/useTooltipDelayGroup'
