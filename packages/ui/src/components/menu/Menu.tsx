import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import clsx from 'clsx'
import {type ComponentPropsWithRef, type PointerEvent} from 'react'

import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {type MenuProps, type MenuSubmenuProps} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuSubmenuClassName = suffixClassName('sui-MenuSubmenu')
// const menuContentClassName = suffixClassName('sui-MenuContent')

function MenuRoot({
  menu,
  children,
  className,
  style,
  ...props
}: MenuProps & Omit<ComponentPropsWithRef<'nav'>, keyof MenuProps>) {
  return (
    <Popover
      as="nav"
      data-ui="Menu"
      content={<List gap={1}>{menu}</List>}
      {...props}
      className={clsx(menuClassName, className)}
      style={{padding: 'var(--space-1)', ...style}}
    >
      {children}
    </Popover>
  )
}

const MenuItem: typeof List.ButtonItem = (props) => (
  <List.Item
    data-ui="MenuItem"
    density="compact"
    className="sui-text-body1 sui-weight-medium"
    {...props}
  />
)

const MenuButtonItem: typeof List.ButtonItem = (props) => (
  <List.ButtonItem
    data-ui="MenuButtonItem"
    density="compact"
    className="sui-text-body1 sui-weight-medium"
    {...props}
  />
)

const MenuSubmenuButtonItem: typeof List.ButtonItem = (props) => (
  <List.ButtonItem
    data-ui="MenuButtonItem"
    density="compact"
    className="sui-text-body1 sui-weight-medium"
    end={<Icon icon={ChevronRightIcon} size={1} marginRight={-1} />}
    {...props}
  />
)

function MenuSubmenu({
  menu,
  children,
  className,
  style,
  ...props
}: MenuSubmenuProps & Omit<ComponentPropsWithRef<'ul'>, keyof MenuSubmenuProps>) {
  return (
    <Popover
      as={List}
      data-ui="MenuSubmenu"
      content={menu}
      placement="right-start"
      portal
      {...props}
      className={clsx(menuSubmenuClassName, className)}
      style={{padding: 'var(--space-1)', ...style}}
      triggerProps={{
        onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
          const popover = event.currentTarget.popoverTargetElement

          if (!(popover instanceof HTMLElement) || popover.matches(':popover-open')) {
            return
          }

          popover.showPopover({source: event.currentTarget})
        },
      }}
    >
      {children}
    </Popover>
  )
}

/** @beta */
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  ButtonItem: MenuButtonItem,
  Submenu: MenuSubmenu,
  SubmenuButtonItem: MenuSubmenuButtonItem,
})
