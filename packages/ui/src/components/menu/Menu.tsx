import clsx from 'clsx'
import {cloneElement, useId, type ComponentPropsWithRef, type ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {type MenuProps, menuProps} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuSubmenuClassName = suffixClassName('sui-Menu')
// const menuContentClassName = suffixClassName('sui-MenuContent')

function MenuRoot<T extends ElementType = 'div'>(
  props: MenuProps<T> & Omit<ComponentPropsWithRef<T>, keyof MenuProps<T>>,
) {
  const {children, className, style, trigger, ...rest} = getProps(props, menuProps)

  return (
    <Popover
      as="nav"
      className={clsx(menuClassName, className)}
      style={style}
      data-ui="Menu"
      content={<List gap={1}>{children}</List>}
      {...rest}
    >
      {trigger}
    </Popover>
  )
}

const MenuItem: typeof List.ButtonItem = (props) => (
  <List.Item
    data-ui="MenuItem"
    density="compact"
    className="sui-px3 sui-text-body1 sui-weight-medium"
    {...props}
  />
)

const MenuButtonItem: typeof List.ButtonItem = (props) => (
  <List.ButtonItem
    data-ui="MenuButtonItem"
    density="compact"
    className="sui-px3 sui-text-body1 sui-weight-medium"
    {...props}
  />
)

function MenuSubmenu<T extends ElementType = 'div'>(
  props: MenuProps<T> & Omit<ComponentPropsWithRef<T>, keyof MenuProps<T>>,
) {
  const {
    children,
    className,
    style,
    id: idProp,
    trigger: triggerProp,
    ...rest
  } = getProps(props, menuProps)
  const reactId = useId()
  const id = idProp || reactId
  const submenuId = `submenu-${id}`

  const trigger = cloneElement(triggerProp, {
    interestFor: submenuId,
    style: {anchorName: `--anchor-${id}`},
  })

  return (
    <>
      {trigger}

      <ul
        className={clsx(
          menuSubmenuClassName,
          'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
          className,
        )}
        style={{
          ...style,
          positionAnchor: `--anchor-${id}`,
        }}
        data-ui="MenuSubmenu"
        id={submenuId}
        popover="hint"
        {...rest}
      >
        {children}
      </ul>
    </>
  )
}

/** @public */
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  ButtonItem: MenuButtonItem,
  Submenu: MenuSubmenu,
})
