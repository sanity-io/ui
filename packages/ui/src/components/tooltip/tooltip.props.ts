import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipProps
  extends Omit<React.ComponentProps<'div'>, 'children'>, PlacementProps {
  /** Element that triggers the tooltip. Must be a single, focusable element. */
  children: React.ReactElement<Record<string, unknown>>
  /** Tooltip text */
  text: React.ReactNode
  /** Disabled state */
  disabled?: boolean
}

export const tooltipProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  disabled: {
    type: 'boolean',
  },
  ...placementProps,
}
