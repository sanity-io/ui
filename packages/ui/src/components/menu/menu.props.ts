import type {ListButtonItemProps} from '../list/list.props'
import type {PopoverProps} from '../popover/popover.props'

/** @beta */
export interface MenuProps extends Omit<PopoverProps, 'content'> {
  /** Menu content */
  menu?: React.ReactNode
}

/** @beta */
export interface MenuContentProps extends React.ComponentProps<'div'> {}

/** @beta */
export interface MenuButtonProps extends ListButtonItemProps {}

/** @beta */
export interface MenuSubmenuProps extends MenuProps {}
