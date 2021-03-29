import React, {cloneElement, forwardRef, useCallback, useMemo, useState} from 'react'
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
   * Do not use in production.
   * @beta
   */
  portal?: boolean
  preventOverflow?: boolean
}

export const MenuButton = forwardRef(function MenuButton(
  props: MenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement | null>
) {
  const {
    boundaryElement,
    button: buttonProp,
    id,
    menu: menuProp,
    placement,
    popoverScheme,
    portal,
    popoverRadius,
    preventOverflow,
  } = props
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

  const setButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }

      setButtonElement(el)
    },
    [ref]
  )

  // @todo: check if the `button` property is a Button component?
  const button = useMemo(
    () =>
      ReactIs.isElement(buttonProp)
        ? cloneElement(buttonProp, {
            id,
            onClick: handleButtonClick,
            onKeyDown: handleButtonKeyDown,
            'aria-haspopup': true,
            'aria-expanded': open,
            ref: setButtonRef,
            selected: open,
          })
        : null,
    [buttonProp, handleButtonClick, handleButtonKeyDown, id, open, setButtonRef]
  )

  return (
    <Popover
      boundaryElement={boundaryElement}
      content={menu}
      data-ui="MenuButton"
      open={open}
      placement={placement}
      portal={portal}
      preventOverflow={preventOverflow}
      radius={popoverRadius}
      scheme={popoverScheme}
    >
      {button || <></>}
    </Popover>
  )
})
