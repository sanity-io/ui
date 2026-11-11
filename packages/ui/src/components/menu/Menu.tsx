import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import clsx from 'clsx'
import {type ComponentPropsWithRef, type KeyboardEvent, type PointerEvent} from 'react'

import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {Icon} from '../icon/Icon'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {type MenuProps, type MenuSubmenuProps} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuSubmenuClassName = suffixClassName('sui-MenuSubmenu')
// const menuContentClassName = suffixClassName('sui-MenuContent')

function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
  const menu = e.currentTarget
  const focusedItem = e.target
  const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
  const focusedTabIndex = items.indexOf(focusedItem as HTMLElement)

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const previousTab = items[(focusedTabIndex - 1 + items.length) % items.length]
    previousTab?.focus()
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const nextTab = items[(focusedTabIndex + 1) % items.length]
    nextTab?.focus()
  }
  if (e.key === 'Home') {
    e.preventDefault()
    items[0]?.focus()
  }
  if (e.key === 'End') {
    e.preventDefault()
    items[items.length - 1]?.focus()
  }
}

function MenuRoot({menu, children, className, style, ...props}: MenuProps) {
  const triggerProps = {
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const menu = document.getElementById(e.currentTarget.getAttribute('popovertarget') || '')
        const items = menu
          ? Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
          : []
        const focusedItem = e.key === 'ArrowDown' ? items[0] : items[items.length - 1]
        menu?.showPopover()
        focusedItem?.focus()
      }
    },
  }

  return (
    <Popover
      data-ui="Menu"
      role="menu"
      content={
        <Flex flexDirection="column" padding={1} gap={1} onKeyDown={handleKeyDown}>
          {menu}
        </Flex>
      }
      className={clsx(menuClassName, className)}
      style={style}
      fullBleed
      triggerProps={triggerProps}
      {...props}
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
    role="menuitem"
    {...props}
  />
)

const MenuSubmenuButtonItem: typeof List.ButtonItem = (props) => (
  <List.ButtonItem
    data-ui="MenuButtonItem"
    density="compact"
    className="sui-text-body1 sui-weight-medium sui-gap3"
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
