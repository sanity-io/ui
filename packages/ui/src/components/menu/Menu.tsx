import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import clsx from 'clsx'
import {type KeyboardEvent, type MouseEvent, type PointerEvent} from 'react'

import {handleFocusKeyDown} from '../../utils/handleFocusKeyDown'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {Icon} from '../icon/Icon'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {
  type MenuButtonProps,
  type MenuContentProps,
  type MenuProps,
  type MenuSubmenuProps,
} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuButtonClassName = suffixClassName('sui-MenuButton')
const menuSubmenuClassName = suffixClassName('sui-MenuSubmenu')

const handleOpenKeyDown = (
  e: KeyboardEvent<HTMLButtonElement>,
  orientation: 'horizontal' | 'vertical' = 'vertical',
) => {
  if (e.altKey || e.ctrlKey || e.metaKey) {
    return
  }

  const menu = e.currentTarget.popoverTargetElement as HTMLElement
  const items = Array.from(menu!.querySelectorAll<HTMLElement>('[role="menuitem"]'))

  if (!(menu instanceof HTMLElement) || menu.matches(':popover-open')) {
    return
  }

  if (
    e.key === 'Enter' ||
    e.key === ' ' ||
    (orientation === 'horizontal' && e.key === 'ArrowRight') ||
    (orientation === 'vertical' && e.key === 'ArrowDown')
  ) {
    e.preventDefault()
    menu?.showPopover({source: e.currentTarget})
    items[0]?.focus()
  }

  if (orientation === 'vertical' && e.key === 'ArrowUp') {
    e.preventDefault()
    menu?.showPopover({source: e.currentTarget})
    items[items.length - 1]?.focus()
  }
}

const handleCloseKeyDown = (
  e: KeyboardEvent<HTMLElement>,
  orientation: 'horizontal' | 'vertical' = 'vertical',
) => {
  const menu = e.currentTarget

  if (!(menu instanceof HTMLElement) || !menu.matches(':popover-open')) {
    return
  }

  if (orientation === 'horizontal' && e.key === 'ArrowLeft') {
    e.preventDefault()
    const trigger = document.querySelector(`[popovertarget=${e.currentTarget.id}]`) as HTMLElement
    trigger?.focus()
    menu?.hidePopover()
  }

  if (e.key === 'Tab') {
    e.preventDefault()

    document.querySelectorAll('[popover]:popover-open').forEach((menu) => {
      ;(menu as HTMLElement).hidePopover()
    })
  }
}

const handlePointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
  const menu = e.currentTarget.popoverTargetElement

  if (!(menu instanceof HTMLElement) || menu.matches(':popover-open')) {
    return
  }

  menu.showPopover({source: e.currentTarget})
}

const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  const menu = e.currentTarget.popoverTargetElement
  const items = Array.from(menu!.querySelectorAll<HTMLElement>('[role="menuitem"]'))
  items[0]?.focus()
  // need to remove focus on hover
}

function MenuRoot({menu, children, className, ...props}: MenuProps) {
  return (
    <Popover
      data-ui="Menu"
      content={menu}
      className={clsx(menuClassName, className)}
      fullBleed
      triggerProps={{
        onKeyDown: handleOpenKeyDown,
      }}
      onKeyDown={(e) => {
        handleFocusKeyDown(e, '[role="menuitem"]', 'vertical')
        handleCloseKeyDown(e)
      }}
      {...props}
    >
      {children}
    </Popover>
  )
}

function MenuContent(props: MenuContentProps) {
  return (
    <Flex data-ui="MenuContent" role="menu" flexDirection="column" padding={1} gap={1} {...props} />
  )
}

function MenuButton({className, ...props}: MenuButtonProps) {
  return (
    <List.ButtonItem
      data-ui="MenuButton"
      role="menuitem"
      className={clsx(menuButtonClassName, 'sui-text-body1 sui-weight-medium', className)}
      tabIndex={-1}
      density="compact"
      {...props}
    />
  )
}

function MenuSubmenu({
  menu,
  children,
  className,
  placement = 'right-start',
  ...props
}: MenuSubmenuProps) {
  return (
    <Popover
      data-ui="MenuSubmenu"
      content={menu}
      portal
      fullBleed
      className={clsx(menuSubmenuClassName, className)}
      placement={placement}
      triggerProps={{
        onPointerEnter: handlePointerEnter,
        onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
          handleOpenKeyDown(e, 'horizontal')
        },
        onClick: handleClick,
        end: <Icon icon={ChevronRightIcon} size={1} marginRight={-1} />,
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
        handleFocusKeyDown(e, '[role="menuitem"]')
        handleCloseKeyDown(e, 'horizontal')
      }}
      {...props}
    >
      {children}
    </Popover>
  )
}

/** @beta */
export const Menu = Object.assign(MenuRoot, {
  Content: MenuContent,
  Button: MenuButton,
  Submenu: MenuSubmenu,
})

export type {MenuProps, MenuContentProps, MenuButtonProps, MenuSubmenuProps}
