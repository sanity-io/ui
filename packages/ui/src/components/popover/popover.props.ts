import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface PopoverProps<T extends React.ElementType> extends PlacementProps {
  /** Element to render */
  as?: T
  /** Focusable trigger element */
  children: React.ReactElement<Record<string, unknown>>
  /** Popover content */
  content: React.ReactNode
}

export const popoverProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  content: {
    type: 'string',
  },
  ...placementProps,
}
