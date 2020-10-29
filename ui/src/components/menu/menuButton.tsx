import {Placement} from '@popperjs/core'
import React, {cloneElement, useCallback, useState} from 'react'
import {Popover} from '../../atoms'
import {useClickOutside} from '../../hooks'

export interface MenuButtonProps {
  button: React.ReactElement
  id: string
  menu?: React.ReactElement
  placement?: Placement
}

export function MenuButton({button: buttonProp, id, menu: menuProp, placement}: MenuButtonProps) {
  const [open, setOpen] = useState(false)
  const [focusLast, setFocusLast] = useState(false)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [menuElement, setMenuElement] = useState<HTMLDivElement | null>(null)

  const handleButtonClick = useCallback(() => {
    setOpen((val) => !val)
    setFocusLast(false)
  }, [])

  const handleButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setFocusLast(false)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setFocusLast(true)
      return
    }
  }, [])

  const handleMenuClickOutside = useCallback(() => setOpen(false), [])

  const handleMenuEscape = useCallback(() => {
    setOpen(false)
    if (buttonElement) buttonElement.focus()
  }, [buttonElement])

  const handleItemClick = useCallback(() => {
    setOpen(false)
  }, [])

  useClickOutside(
    useCallback(() => setOpen(false), []),
    [buttonElement, menuElement]
  )

  const menuProps = {
    'aria-labelledby': id,
    focusLast,
    onClickOutside: handleMenuClickOutside,
    onEscape: handleMenuEscape,
    onItemClick: handleItemClick,
    ref: setMenuElement,
  }

  // @todo: check if the `menu` property is a Menu component?
  const menu = menuProp ? cloneElement(menuProp, menuProps) : null

  const buttonProps = {
    id,
    onClick: handleButtonClick,
    onKeyDown: handleButtonKeyDown,
    ref: setButtonElement,
    selected: open,
  }

  // @todo: check if the `button` property is a Button component?
  const button = buttonProp ? cloneElement(buttonProp, buttonProps) : null

  return (
    <Popover content={menu} data-ui="MenuButton" open={open} placement={placement} radius={2}>
      {button || <></>}
    </Popover>
  )
}
