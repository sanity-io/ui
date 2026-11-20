import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import clsx from 'clsx'
import {type ElementType, type KeyboardEvent, type MouseEvent, type PointerEvent} from 'react'

import {handleKeyDownFocus} from '../../utils/handleKeyDownFocus'
import {suffixClassName} from '../../utils/suffixClassName'
import {Divider} from '../divider/Divider'
import {Flex} from '../flex/Flex'
import {Icon} from '../icon/Icon'
import {List} from '../list/List'
import {Popover} from '../popover/Popover'
import {
  type MenuButtonProps,
  type MenuContentProps,
  type MenuDividerProps,
  type MenuProps,
  type MenuSubmenuProps,
} from './menu.props'

const menuClassName = suffixClassName('sui-Menu')
const menuButtonClassName = suffixClassName('sui-MenuButton')
const menuSubmenuClassName = suffixClassName('sui-MenuSubmenu')

function getTrigger(menu: HTMLElement) {
  for (const el of document.querySelectorAll<HTMLButtonElement>('[popovertarget]')) {
    if (el.popoverTargetElement === menu) return el
  }

  return null
}

const handleKeyDownOpen = (
  e: KeyboardEvent<HTMLButtonElement>,
  orientation: 'horizontal' | 'vertical' = 'vertical',
) => {
  if (e.altKey || e.ctrlKey || e.metaKey) {
    return
  }

  const menu = e.currentTarget.popoverTargetElement

  if (!(menu instanceof HTMLElement) || menu.matches(':popover-open')) {
    return
  }

  if (
    e.key === 'Enter' ||
    e.key === ' ' ||
    (orientation === 'horizontal' && e.key === 'ArrowRight') ||
    (orientation === 'vertical' && e.key === 'ArrowDown') ||
    (orientation === 'vertical' && e.key === 'ArrowUp')
  ) {
    e.preventDefault()
    menu.showPopover({source: e.currentTarget})

    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    const focusIndex = e.key === 'ArrowUp' ? items.length - 1 : 0
    items[focusIndex]?.focus()
  }
}

const handleKeyDownClose = (
  e: KeyboardEvent<HTMLDivElement>,
  orientation: 'horizontal' | 'vertical' = 'vertical',
) => {
  const menu = e.currentTarget

  if (!menu.matches(':popover-open')) {
    return
  }

  if (orientation === 'horizontal' && e.key === 'ArrowLeft') {
    e.preventDefault()
    getTrigger(menu)?.focus()
    menu.hidePopover()
  }

  if (e.key === 'Tab') {
    for (
      let popover: HTMLElement | null = menu;
      popover?.matches(':popover-open');
      popover = getTrigger(popover)?.closest<HTMLElement>('[popover]:popover-open') || null
    ) {
      popover.hidePopover()
    }
  }
}

const handlePointerEnterOpen = (e: PointerEvent<HTMLButtonElement>) => {
  const menu = e.currentTarget.popoverTargetElement

  if (!(menu instanceof HTMLElement) || menu.matches(':popover-open')) {
    return
  }

  menu.showPopover({source: e.currentTarget})
}

function handlePointerEnterClose(e: PointerEvent<HTMLButtonElement>) {
  const menu = e.currentTarget.closest('[role="menu"]')

  if (!(menu instanceof HTMLElement)) {
    return
  }

  for (const trigger of menu.querySelectorAll<HTMLButtonElement>('[popovertarget]')) {
    if (trigger === e.currentTarget) {
      continue
    }

    const popover = trigger.popoverTargetElement

    if (popover instanceof HTMLElement && popover.matches(':popover-open')) {
      popover.hidePopover()
    }
  }
}

function handlePointerEnterFocus(e: PointerEvent<HTMLButtonElement>) {
  const menu = e.currentTarget.closest('[role="menu"]')

  if (!(menu instanceof HTMLElement)) {
    return
  }

  const active = document.activeElement

  if (active !== menu && active instanceof HTMLElement && menu.contains(active)) {
    menu.focus({focusVisible: false})
  }
}

const handleClickFocus = (e: MouseEvent<HTMLButtonElement>) => {
  const menu = e.currentTarget.popoverTargetElement

  if (!(menu instanceof HTMLElement)) {
    return
  }

  if (!menu.matches(':popover-open')) {
    e.preventDefault()
    menu.showPopover({source: e.currentTarget})
  }

  const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
  items[0]?.focus()
}

function MenuRoot({menu, children, className, ...props}: MenuProps) {
  return (
    <Popover
      className={clsx(menuClassName, className)}
      data-ui="Menu"
      content={menu}
      fullBleed
      triggerProps={{
        'aria-haspopup': 'menu',
        'onKeyDown': handleKeyDownOpen,
      }}
      onKeyDown={(e) => {
        handleKeyDownFocus(e, '[role="menuitem"]', 'vertical')
        handleKeyDownClose(e)
      }}
      {...props}
    >
      {children}
    </Popover>
  )
}

function MenuContent(props: MenuContentProps) {
  return (
    <Flex
      data-ui="MenuContent"
      role="menu"
      aria-orientation="vertical"
      flexDirection="column"
      padding={1}
      gap={1}
      tabIndex={-1}
      {...props}
    />
  )
}

function MenuButton<T extends ElementType = 'button'>(props: MenuButtonProps<T>) {
  return (
    <List.ItemButton<T>
      className={clsx(menuButtonClassName, 'sui-text-body1 sui-weight-medium', props['className'])}
      data-ui="MenuButton"
      role="menuitem"
      tabIndex={-1}
      {...props}
      onPointerEnter={(e: PointerEvent<HTMLButtonElement>) => {
        handlePointerEnterClose(e)
        handlePointerEnterFocus(e)
        props['onPointerEnter']?.(e)
      }}
    />
  )
}

function MenuSubmenu({
  menu,
  children,
  className,
  placement = 'right-start',
  onKeyDown,
  ...props
}: MenuSubmenuProps) {
  return (
    <Popover
      className={clsx(menuSubmenuClassName, className)}
      data-ui="MenuSubmenu"
      content={menu}
      portal
      fullBleed
      placement={placement}
      triggerProps={{
        'popoverTargetAction': 'show',
        'aria-haspopup': 'menu',
        'onPointerEnter': handlePointerEnterOpen,
        'onKeyDown': (e: KeyboardEvent<HTMLButtonElement>) => {
          handleKeyDownOpen(e, 'horizontal')
        },
        'onClick': handleClickFocus,
        'end': <Icon icon={ChevronRightIcon} size={1} marginRight={-1} />,
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
        handleKeyDownFocus(e, '[role="menuitem"]')
        handleKeyDownClose(e, 'horizontal')
        onKeyDown?.(e)
      }}
      {...props}
    >
      {children}
    </Popover>
  )
}

function MenuDivider(props: MenuDividerProps) {
  return <Divider {...props} />
}

/** @beta */
export const Menu = Object.assign(MenuRoot, {
  Content: MenuContent,
  Button: MenuButton,
  Submenu: MenuSubmenu,
  Divider: MenuDivider,
})

export type {MenuProps, MenuContentProps, MenuButtonProps, MenuSubmenuProps, MenuDividerProps}
