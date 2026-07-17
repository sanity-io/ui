import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface PopoverProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /** Element that triggers the popover. Must be a single, focusable element. */
  children: React.ReactElement<Record<string, unknown>>
  /** Popover content */
  content: React.ReactNode
  /** Merge parent trigger props onto the child element instead of this wrapper */
  asTrigger?: boolean
  /** Shared id with Tooltip for combined tooltip + popover triggers */
  id?: string
  /** Trigger props forwarded from a parent wrapper via cloneElement */
  triggerProps?: Record<string, unknown>
}

export const popoverProps: Record<string, PropDef> = {
  content: {
    type: 'string',
  },
  asTrigger: {
    type: 'boolean',
  },
  ...placementProps,
}
