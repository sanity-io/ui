import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface PopoverProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /** Anchor name for positioning */
  anchorName?: React.ReactNode
  /** Focusable trigger element */
  children: React.ReactElement<Record<string, unknown>>
  /** Popover content */
  content?: React.ReactNode
  /** Render tooltip in portal */
  portal?: boolean
}

export const popoverProps: Record<string, PropDef> = {
  anchorName: {
    type: 'string',
  },
  content: {
    type: 'string',
  },
  portal: {
    type: 'boolean',
  },
  ...placementProps,
}
