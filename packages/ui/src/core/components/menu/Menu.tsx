import {menu, type PaddingStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'

import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Box} from '../../primitives/box/Box'
import {useLayer} from '../../primitives/layer/useLayer'
import {Stack} from '../../primitives/stack/Stack'
import type {ComponentType, Props} from '../../types'
import {MenuContext, type MenuContextValue} from './MenuContext'
import {useMenuController} from './useMenuController'

/**
 * The default HTML element type rendered by the {@link Menu} component.
 *
 * @public
 */
export const DEFAULT_MENU_ELEMENT = 'div'

/**
 * Own props for the {@link Menu} component.
 *
 * @remarks
 * Extends {@link PaddingStyleProps} to provide inner spacing control for the menu container.
 *
 * @public
 */
export type MenuOwnProps = PaddingStyleProps & {
  /**
   * Sets the gap between menu items.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   * The gap is applied to an internal {@link Stack} component that wraps the menu's children.
   *
   * @defaultValue 1
   */
  gap?: ResponsiveProp<Space>

  /**
   * Callback fired when the user clicks outside the menu while it is the top layer.
   *
   * @remarks
   * Only fires when the menu is the topmost layer in the layer stack.
   * Typically used to close the menu when focus leaves the menu area.
   */
  onClickOutside?: (event: MouseEvent) => void

  /**
   * Callback fired when the user presses the `Escape` key while the menu is the top layer.
   *
   * @remarks
   * Only fires when the menu is the topmost layer in the layer stack.
   * Typically used to close the menu and optionally restore focus to the
   * element that opened it.
   */
  onEscape?: () => void

  /**
   * Callback fired when any {@link MenuItem} within the menu is clicked.
   *
   * @remarks
   * Receives the mouse event from the clicked menu item. This is a
   * centralized handler that fires for all items in the menu.
   */
  onItemClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

  /**
   * Callback fired when the active (highlighted) menu item index changes.
   *
   * @remarks
   * Receives the zero-based index of the currently active menu item.
   * Useful for tracking which item is highlighted for keyboard navigation.
   */
  onItemSelect?: (index: number) => void

  /**
   * A reference to the element that triggered the menu to open.
   *
   * @remarks
   * Used to manage focus restoration when the menu is closed. When provided,
   * the menu controller uses this element as the "origin" for focus management.
   */
  originElement?: HTMLElement | null

  /**
   * A callback to register the menu's root DOM element with a parent menu context.
   *
   * @remarks
   * Used internally by nested menus (e.g. {@link MenuGroup}) to register their
   * root elements with the parent menu for click-outside detection and focus management.
   * Returns a cleanup function that unregisters the element.
   */
  registerElement?: (el: HTMLElement) => () => void

  /**
   * Controls which menu item receives focus when the menu mounts or updates.
   *
   * @defaultValue null
   */
  shouldFocus?: 'first' | 'last' | null

  /**
   * The `id` of the element that labels the menu.
   *
   * @remarks
   * Sets the `aria-labelledby` attribute on the menu's root element,
   * establishing an accessible label relationship. Typically references
   * the `id` of the button that opens the menu.
   */
  'aria-labelledby'?: string
}

/**
 * Accepted values for the `as` prop of the {@link Menu} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Menu`.
 *
 * @public
 */
export type MenuElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Menu} component.
 *
 * @remarks
 * Combines {@link MenuOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link MenuElementType}.
 *
 * @public
 */
export type MenuProps<E extends MenuElementType = MenuElementType> = Props<MenuOwnProps, E>

/**
 * A building block for application menus.
 *
 * @remarks
 * The `Menu` component renders an accessible menu container following WAI-ARIA
 * menu patterns. It manages keyboard navigation (arrow keys, Home, End),
 * active/highlighted item tracking, click-outside detection, and Escape key handling.
 *
 * Menu items are registered automatically via the {@link MenuContext} provided
 * to children. Use {@link MenuItem}, {@link MenuGroup}, and {@link MenuDivider}
 * as children of `Menu`.
 *
 * The menu integrates with the {@link Layer} system to detect whether it is the
 * topmost layer, ensuring that `onClickOutside` and `onEscape` only fire when
 * the menu has focus priority.
 *
 * @public
 */
export function Menu<E extends MenuElementType = typeof DEFAULT_MENU_ELEMENT>(
  props: MenuProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_MENU_ELEMENT,
    children,
    className,
    gap = 1,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemSelect,
    onKeyDown,
    originElement,
    padding = 1,
    ref: forwardedRef,
    registerElement,
    shouldFocus: _shouldFocus,
    ...rest
  } = props as MenuProps<typeof DEFAULT_MENU_ELEMENT>

  const shouldFocus = _shouldFocus ?? null

  const ref = useRef<HTMLDivElement | null>(null)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const {isTopLayer} = useLayer()

  const {
    activeElement,
    activeIndex,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleKeyDown,
    mount,
  } = useMenuController({
    onKeyDown,
    originElement,
    shouldFocus,
    rootElementRef: ref,
  })

  const unregisterElementRef = useRef<(() => void) | null>(null)
  const handleRefChange = useCallback(
    (el: HTMLDivElement | null) => {
      // Run cleanup of previously registered elements
      if (unregisterElementRef.current) {
        // The `registerElement` callback were originally used in a `useEffect`, so it returns a cleanup function that is a bit gnarly to handle in a ref callback.
        // Since we can't change the `registerElement` implementation itself without making breaking change,
        // that is explained in the code comments for createGlobalScopedContext.tsx,
        // we need to handle with a ref that holds on to the cleanup function last returned when the ref callback is called.
        unregisterElementRef.current()
        unregisterElementRef.current = null
      }

      ref.current = el

      // Register root element (for nested menus)
      if (ref.current && registerElement) {
        unregisterElementRef.current = registerElement(ref.current)
      }
    },
    [registerElement],
  )

  // Trigger `onItemSelect` when active index changes
  useEffect(() => {
    if (onItemSelect) onItemSelect(activeIndex)
  }, [activeIndex, onItemSelect])

  // Close menu when clicking outside
  useClickOutsideEvent(isTopLayer && onClickOutside, () => [ref.current])

  // Close menu when pressing Escape
  useGlobalKeyDown(
    useCallback(
      (event) => {
        if (!isTopLayer) return

        if (event.key === 'Escape') {
          event.stopPropagation()
          if (onEscape) onEscape()
        }
      },
      [isTopLayer, onEscape],
    ),
  )

  const value = useMemo(
    () =>
      ({
        version: 2,
        activeElement,
        mount,
        onClickOutside,
        onEscape,
        onItemClick,
        onItemMouseEnter: handleItemMouseEnter,
        onItemMouseLeave: handleItemMouseLeave,
        registerElement,
      }) satisfies MenuContextValue,
    [
      activeElement,
      mount,
      handleItemMouseEnter,
      handleItemMouseLeave,
      onClickOutside,
      onEscape,
      onItemClick,
      registerElement,
    ],
  )

  return (
    <MenuContext value={value}>
      <Box
        data-ui="Menu"
        {...rest}
        as={as}
        className={menu({className})}
        onKeyDown={handleKeyDown}
        overflow="auto"
        outline="none"
        padding={padding}
        ref={handleRefChange}
        role="menu"
        tabIndex={-1}
      >
        <Stack gap={gap}>{children}</Stack>
      </Box>
    </MenuContext>
  )
}
