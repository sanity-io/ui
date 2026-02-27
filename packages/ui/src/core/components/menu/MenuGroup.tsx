import {ChevronRightIcon} from '@sanity/icons'
import type {RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
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

import {Box} from '../../primitives/box/Box'
import {Flex} from '../../primitives/flex/Flex'
import {Popover, type PopoverProps} from '../../primitives/popover/Popover'
import {Selectable} from '../../primitives/selectable/Selectable'
import {Text} from '../../primitives/text/Text'
import type {ComponentType, Props} from '../../types'
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
 * Extends {@link RadiusStyleProps} to provide border radius control alongside
 * menu-group-specific properties for rendering a submenu trigger within a
 * {@link Menu}.
 *
 * @public
 */
export type MenuGroupOwnProps = RadiusStyleProps & {
  /**
   * When `true`, disables the menu group trigger, preventing user interaction
   * and applying a disabled visual state.
   */
  disabled?: boolean

  /**
   * Sets the font size of the menu group's text and icon content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 1
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * Sets the gap between the icon, text, and chevron elements inside the
   * menu group trigger.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 3
   */
  gap?: ResponsiveProp<Space>

  /**
   * An icon to render on the leading (left) side of the menu group trigger.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is).
   */
  icon?: ElementType | ReactNode

  /**
   * Props forwarded to the child {@link Menu} rendered inside the submenu
   * popover.
   *
   * @remarks
   * Accepts all {@link MenuProps} except `onClickOutside`, `onEscape`,
   * `onItemClick`, `onKeyDown`, `onMouseEnter`, `registerElement`,
   * `shouldFocus`, and `onBlurCapture`, which are managed internally by the
   * `MenuGroup` component.
   *
   * Use this to configure the child menu's `gap`, `padding`, or other layout
   * props.
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
   * Sets the inner padding of the menu group trigger element.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 3
   */
  padding?: ResponsiveProp<Space>

  /**
   * Props forwarded to the underlying {@link Popover} component that wraps
   * the child submenu.
   *
   * @remarks
   * Accepts all {@link PopoverProps} except `content` and `open`, which are
   * managed internally. Use this to control popover placement, portal
   * behavior, boundary elements, and other positioning options.
   */
  popover?: Omit<PopoverProps<'div'>, 'content' | 'open'>

  /**
   * The text label displayed inside the menu group trigger.
   *
   * @remarks
   * Rendered inside a {@link Text} component with `textOverflow="ellipsis"`
   * and `weight="medium"`.
   */
  text?: ReactNode

  /**
   * Sets the color tone of the menu group trigger, which determines the
   * color scheme applied to its hover, focus, and active states.
   *
   * @defaultValue `"default"`
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
 * A submenu trigger item within a {@link Menu} that opens a nested child
 * menu in a {@link Popover} on hover or click.
 *
 * @remarks
 * The `MenuGroup` component renders a {@link Selectable} element styled as a
 * menu item with a trailing chevron icon. When the user hovers over or clicks
 * the item, a child {@link Menu} is displayed in a {@link Popover} adjacent
 * to the trigger.
 *
 * The component integrates with the parent menu's context for keyboard
 * navigation, focus management, and click-outside handling. ArrowRight opens
 * the submenu and focuses its first item; ArrowLeft closes the submenu and
 * returns focus to the trigger.
 *
 * The `children` prop is rendered inside the child menu, allowing nested
 * {@link MenuItem}, {@link MenuDivider}, and further {@link MenuGroup} elements.
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
    radius = 2,
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
      onClickOutside={onClickOutside}
      onEscape={onEscape}
      onItemClick={handleChildItemClick}
      onKeyDown={handleMenuKeyDown}
      onMouseEnter={handleMenuMouseEnter}
      registerElement={registerElement}
      shouldFocus={shouldFocus}
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
    <Popover {...popover} content={childMenu} data-ui="MenuGroup__popover" open={open}>
      <Selectable
        // data-as={as}
        data-ui="MenuGroup"
        // forwardedAs={as}
        {...rest}
        aria-pressed={as === 'button' ? withinMenu : undefined}
        as={as}
        // data-pressed={as !== 'button' ? withinMenu : undefined}
        // data-selected={!withinMenu && active ? '' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        radius={radius}
        ref={setRootElement}
        selected={withinMenu}
        tabIndex={-1}
        tone={tone}
        type={as === 'button' ? 'button' : undefined}
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
