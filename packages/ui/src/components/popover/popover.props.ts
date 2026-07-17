import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface PopoverProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /** Focusable trigger element */
  children: React.ReactElement<Record<string, unknown>>
  /** Popover content */
  content: React.ReactNode
  /** Shared id with Tooltip for combined tooltip + popover triggers */
  id?: string
}

export const popoverProps: Record<string, PropDef> = {
  content: {
    type: 'string',
  },
  ...placementProps,
}
