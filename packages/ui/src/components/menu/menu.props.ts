import type {ElementType} from 'react'

import type {ListItemButtonProps} from '../list/list.props'
import type {PopoverProps} from '../popover/popover.props'

/** @beta */
export interface MenuProps extends Omit<PopoverProps, 'content'> {
  /** Menu content */
  menu?: React.ReactNode
}

/** @beta */
export type MenuContentProps = Omit<React.ComponentProps<'div'>, 'role'> &
  (
    | {'aria-labelledby': string; 'aria-label'?: never}
    | {'aria-label': string; 'aria-labelledby'?: never}
  )

/** @beta */
export type MenuButtonProps<T extends ElementType = 'button'> = ListItemButtonProps<T>

/** @beta */
export interface MenuSubmenuProps extends MenuProps {}
