import clsx from 'clsx'
import {cloneElement, useId} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {type MenuProps, menuProps, menuSubmenuProps, type MenuSubmenuProps} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuSubmenuClassName = suffixClassName('sui-MenuSubmenu')
// const menuContentClassName = suffixClassName('sui-MenuContent')

function MenuRoot(props: MenuProps) {
  const {children, className, style, menu, ...rest} = getProps(props, menuProps)

  return (
    <Popover
      as="nav"
      className={clsx(menuClassName, className)}
      style={style}
      data-ui="Menu"
      content={<List gap={1}>{menu}</List>}
      {...rest}
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

function MenuSubmenu(props: MenuSubmenuProps) {
  const {children, className, style, id: idProp, menu, ...rest} = getProps(props, menuSubmenuProps)
  const reactId = useId()
  const id = idProp || reactId

  const trigger = cloneElement(children, {
    interestfor: id,
  })

  return (
    <Popover
      as={List}
      className={clsx(menuSubmenuClassName, 'sui-m0', className)}
      style={style}
      data-ui="MenuSubmenu"
      content={menu}
      id={id}
      placement="right-start"
      portal
      popover="hint"
      {...rest}
    >
      {trigger}
    </Popover>
  )
}

/** @public */
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  ButtonItem: MenuButtonItem,
  Submenu: MenuSubmenu,
})
