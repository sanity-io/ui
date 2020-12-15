import React, {cloneElement, useCallback, useState} from 'react'
import ReactIs from 'react-is'
import {isHTMLElement} from '../../helpers'
import {useClickOutside} from '../../hooks'
import {Popover} from '../../primitives'
import {ThemeColorSchemeKey} from '../../theme'
import {Placement} from '../../types'

export interface MenuButtonProps {
  boundaryElement?: HTMLElement
  button: React.ReactElement
  id: string
  menu?: React.ReactElement
  placement?: Placement
  popoverScheme?: ThemeColorSchemeKey
  popoverRadius?: number | number[]

  /**
   * @beta Do not use in production.
   */
  portal?: boolean
}

export function MenuButton({
  boundaryElement,
  button: buttonProp,
  id,
  menu: menuProp,
  placement,
  popoverScheme,
  portal,
  popoverRadius,
}: MenuButtonProps) {
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

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      const target = event.relatedTarget

      if (isHTMLElement(target) && !menuElement?.contains(target)) {
        setOpen(false)
      }
    },
    [menuElement]
  )

  const handleItemClick = useCallback(() => {
    setOpen(false)
    if (buttonElement) buttonElement.focus()
  }, [buttonElement])

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
    onBlurCapture: handleBlur,
  }

  // @todo: check if the `menu` property is a Menu component?
  const menu = menuProp ? cloneElement(menuProp, menuProps) : null

  const buttonProps = {
    id,
    onClick: handleButtonClick,
    onKeyDown: handleButtonKeyDown,
    'aria-haspopup': true,
    'aria-expanded': open,
    ref: setButtonElement,
    selected: open,
  }

  // @todo: check if the `button` property is a Button component?
  const button = ReactIs.isElement(buttonProp) ? cloneElement(buttonProp, buttonProps) : null

  return (
    <Popover
      boundaryElement={boundaryElement}
      content={menu}
      data-ui="MenuButton"
      open={open}
      placement={placement}
      portal={portal}
      radius={popoverRadius}
      scheme={popoverScheme}
    >
      {button || <></>}
    </Popover>
  )
}
