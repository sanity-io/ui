import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface PopoverProps<T extends React.ElementType> extends PlacementProps {
  /** Element to render */
  as?: T
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
  as: {
    type: 'string',
  },
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
