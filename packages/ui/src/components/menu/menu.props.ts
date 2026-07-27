import {placementProps, type PlacementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'
import type {PopoverProps} from '../popover/popover.props'

/** @public */
export interface MenuProps extends Omit<PopoverProps<'nav'>, 'as' | 'content'> {
  /** Menu content */
  menu?: React.ReactNode
}

export const menuProps: Record<string, PropDef> = {
  menu: {
    type: 'string',
  },
}

/** @public */
export interface MenuSubmenuProps extends Omit<PopoverProps<'ul'>, 'as' | 'content'> {
  /** Menu content */
  menu?: React.ReactNode
}

export const menuSubmenuProps: Record<string, PropDef> = {
  menu: {
    type: 'string',
  },
}

// /** @public */
// export interface MenuSubmenuProps extends React.ComponentProps<'li'>, PlacementProps {
//   /** Focusable trigger element */
//   trigger: React.ReactElement<Record<string, unknown>>
// }

// export const menuSubmenuProps: Record<string, PropDef> = {
//   trigger: {
//     type: 'string',
//   },
//   ...placementProps,
// }
