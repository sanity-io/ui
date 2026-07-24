import clsx from 'clsx'
import {
  cloneElement,
  useEffect,
  useId,
  useState,
  type ComponentPropsWithRef,
  type ElementType,
} from 'react'
import {createPortal} from 'react-dom'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {type MenuProps, menuProps, menuSubmenuProps, type MenuSubmenuProps} from './menu.props'

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
      placement="bottom-start"
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

function MenuSubmenu({placement = 'right-start', ...props}: MenuSubmenuProps) {
  const {
    children,
    className,
    style,
    id: idProp,
    trigger: triggerProp,
    ...rest
  } = getProps({placement, ...props}, menuSubmenuProps)
  const reactId = useId()
  const id = idProp || reactId
  const submenuId = `submenu-${id}`
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const trigger = cloneElement(triggerProp, {
    interestFor: submenuId,
    style: {
      ...(typeof triggerProp.props.style === 'object' ? triggerProp.props.style : {}),
      anchorName: `--anchor-${id}`,
    },
  })

  const submenu = (
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
  )

  return (
    <>
      {trigger}
      {mounted ? createPortal(submenu, document.body) : null}
    </>
  )
}

/** @public */
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  ButtonItem: MenuButtonItem,
  Submenu: MenuSubmenu,
})
