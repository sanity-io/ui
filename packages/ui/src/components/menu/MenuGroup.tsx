import {ChevronRightIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import type {RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {Box} from '@sanity/ui/primitives/box'
import {Flex} from '@sanity/ui/primitives/flex'
import {Popover, type PopoverProps} from '@sanity/ui/primitives/popover'
import {Selectable} from '@sanity/ui/primitives/selectable'
import {Text} from '@sanity/ui/primitives/text'
import type {ElementTone, FontTextSize, Space} from '@sanity/ui/theme'
import {
  type ElementType,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

import {DEFAULT_MENU_ELEMENT, Menu, type MenuProps} from './Menu'
import {useMenu} from './useMenu'

/**
 * The default HTML element type rendered by the {@link MenuGroup} component.
 *
 * @public
 */
export const DEFAULT_MENU_GROUP_ELEMENT = 'button'

/**
 * Own props for the {@link MenuGroup} component.
 *
 * @remarks
 * Extends {@link RadiusStyleProps} to provide border radius styling.
 *
 * @public
 */
export type MenuGroupOwnProps = RadiusStyleProps & {
  /**
   * When `true`, disables the menu group, preventing user interaction.
   */
  disabled?: boolean

  /**
   * Sets the font size of the menu group's text and icon content.
   * Supports responsive values.
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * The gap between the icon, text, and arrow elements within the menu group.
   * Supports responsive values.
   */
  gap?: ResponsiveProp<Space>

  /**
   * An icon to render on the leading (left) side of the menu group.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is).
   */
  icon?: ElementType | ReactNode

  /**
   * Props to pass to the child {@link Menu} rendered inside the submenu popover.
   *
   * @remarks
   * Props related to menu lifecycle (`onClickOutside`, `onEscape`, `onItemClick`,
   * etc.) are managed internally and cannot be overridden.
   */
  menu?: Omit<
    MenuProps<typeof DEFAULT_MENU_ELEMENT>,
    | 'onClickOutside'
    | 'onEscape'
    | 'onItemClick'
    | 'onKeyDown'
    | 'onMouseEnter'
    | 'registerElement'
    | 'shouldFocus'
    | 'onBlurCapture'
  >

  /**
   * The padding inside the menu group button. Supports responsive values.
   */
  padding?: ResponsiveProp<Space>

  /**
   * Props to pass to the {@link Popover} that contains the submenu.
   *
   * @remarks
   * The `content` and `open` props are managed internally and cannot be overridden.
   */
  popover?: Omit<PopoverProps, 'content' | 'open'>

  /**
   * The text label to display inside the menu group.
   */
  text?: ReactNode

  /**
   * The semantic color tone of the menu group.
   */
  tone?: ElementTone
}

/**
 * Accepted values for the `as` prop of the {@link MenuGroup} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `MenuGroup`.
 *
 * @public
 */
export type MenuGroupElementType = 'button' | ComponentType

/**
 * Props for the {@link MenuGroup} component.
 *
 * @remarks
 * Combines {@link MenuGroupOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<button>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link MenuGroupElementType}.
 *
 * @public
 */
export type MenuGroupProps<E extends MenuGroupElementType = MenuGroupElementType> = Props<
  MenuGroupOwnProps,
  E
>

/**
 * The `MenuGroup` component renders a menu item that opens a submenu
 * when hovered or activated via keyboard.
 *
 * @remarks
 * `MenuGroup` acts as a container for nested {@link Menu} content. It renders
 * a selectable button with an icon, text label, and trailing chevron arrow.
 * When the user hovers over or navigates into the group, a {@link Popover}
 * containing the child menu items appears alongside it.
 *
 * @public
 */
export function MenuGroup<E extends MenuGroupElementType = typeof DEFAULT_MENU_GROUP_ELEMENT>(
  props: MenuGroupProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_MENU_GROUP_ELEMENT,
    children,
    fontSize = 1,
    gap = 3,
    icon: IconComponent,
    menu: menuProps,
    onClick,
    padding = 3,
    popover,
    radius = 3,
    text,
    tone = 'default',
    ...rest
  } = props as MenuGroupProps<typeof DEFAULT_MENU_GROUP_ELEMENT>

  const {
    activeElement,
    mount,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemMouseEnter,
    registerElement,
  } = useMenu()

  const [rootElement, setRootElement] = useState<HTMLButtonElement | HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const [withinMenu, setWithinMenu] = useState(false)

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setWithinMenu(false)
      onItemMouseEnter?.(event)
      setOpen(true)
    },
    [onItemMouseEnter],
  )

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.stopPropagation()

        setOpen(false)

        requestAnimationFrame(() => {
          rootElement?.focus()
        })
      }
    },
    [rootElement],
  )

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)

      setShouldFocus('first')
      setOpen(true)
    },
    [onClick],
  )

  const handleChildItemClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setOpen(false)
      onItemClick?.(e)
    },
    [onItemClick],
  )

  const handleMenuMouseEnter = useCallback(() => setWithinMenu(true), [])

  // Register the menu item element
  useEffect(() => mount(rootElement), [mount, rootElement])

  // Close child menu when a sibling item becomes active
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!active) setOpen(false)
  }, [active])

  // Update state when child menu is no longer open
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setWithinMenu(false)
  }, [open])

  // Reset the shouldFocus state after it has been used
  useEffect(() => {
    if (!shouldFocus) return
    // The useMenuController effect that handles `shouldFocus` schedules a request animation frame where it's processed.
    // By doing the same here, we ensure that the reset is processed after the focus change.
    const rafId = requestAnimationFrame(() => setShouldFocus(null))

    return () => cancelAnimationFrame(rafId)
  }, [shouldFocus])

  const childMenu = (
    <Menu
      {...menuProps}
      registerElement={registerElement}
      shouldFocus={shouldFocus}
      onClickOutside={onClickOutside}
      onEscape={onEscape}
      onItemClick={handleChildItemClick}
      onKeyDown={handleMenuKeyDown}
      onMouseEnter={handleMenuMouseEnter}
    >
      {children}
    </Menu>
  )

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    const target = event.currentTarget

    if (document.activeElement !== target) {
      return
    }

    if (event.key === 'ArrowRight') {
      setShouldFocus('first')
      setOpen(true)
      setWithinMenu(true)

      return
    }
  }, [])

  return (
    <Popover
      __unstable_shift={-4}
      data-ui="MenuGroup__popover"
      {...popover}
      content={childMenu}
      open={open}
    >
      <Selectable
        data-ui="MenuGroup"
        {...rest}
        ref={setRootElement}
        aria-pressed={as === 'button' ? withinMenu : undefined}
        as={as}
        radius={radius}
        selected={withinMenu}
        tabIndex={-1}
        tone={tone}
        type={as === 'button' ? 'button' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
      >
        <Flex gap={gap} padding={padding}>
          {IconComponent && (
            <Text size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          )}

          <Box flex={1}>
            <Text size={fontSize} textOverflow="ellipsis" weight="medium">
              {text}
            </Text>
          </Box>

          <Text size={fontSize}>
            <ChevronRightIcon />
          </Text>
        </Flex>
      </Selectable>
    </Popover>
  )
}
