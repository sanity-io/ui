import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'
import {type TriggerProps} from '../trigger/trigger.props'

/** @public */
export interface TooltipProps
  extends Omit<React.ComponentProps<'div'>, 'children'>, PlacementProps {
  /** Element that triggers the tooltip. Must be a single, focusable element. */
  children: React.ReactElement<Record<string, unknown>>
  /** Tooltip text */
  text: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Merge parent trigger props onto the child element instead of this wrapper */
  asTrigger?: boolean
  /** Shared id with Popover for combined tooltip + popover triggers */
  id?: string
  /** Trigger props forwarded from a parent wrapper via cloneElement */
  triggerProps?: TriggerProps
}

export const tooltipProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  disabled: {
    type: 'boolean',
  },
  asTrigger: {
    type: 'boolean',
  },
  ...placementProps,
}
