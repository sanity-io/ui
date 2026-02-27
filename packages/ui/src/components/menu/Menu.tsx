import type {ComponentType, Props} from '@sanity/ui/core'
import {menu, type PaddingStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import {useClickOutsideEvent, useGlobalKeyDown} from '@sanity/ui/hooks'
import {Box} from '@sanity/ui/primitives/box'
import {useLayer} from '@sanity/ui/primitives/layer'
import {Stack} from '@sanity/ui/primitives/stack'
import type {Space} from '@sanity/ui/theme'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'

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
 * Extends {@link PaddingStyleProps} to provide padding utilities for the menu container.
 *
 * @public
 */
export type MenuOwnProps = PaddingStyleProps & {
  /**
   * The gap between menu items. Supports responsive values.
   */
  'gap'?: ResponsiveProp<Space>

  /**
   * A callback that fires when a click occurs outside the menu.
   */
  'onClickOutside'?: (event: MouseEvent) => void

  /**
   * A callback that fires when the Escape key is pressed while the menu
   * is the top layer.
   */
  'onEscape'?: () => void

  /**
   * A callback that fires when any menu item is clicked.
   */
  'onItemClick'?: (event: React.MouseEvent<HTMLButtonElement>) => void

  /**
   * A callback that fires when the active (highlighted) menu item changes.
   */
  'onItemSelect'?: (index: number) => void

  /**
   * The element that triggered the menu to open, used to manage focus
   * restoration.
   */
  'originElement'?: HTMLElement | null

  /**
   * A callback for registering the menu's root element with a parent
   * menu context, enabling nested menu support.
   */
  'registerElement'?: (el: HTMLElement) => () => void

  /**
   * Controls which item receives focus when the menu opens.
   */
  'shouldFocus'?: 'first' | 'last' | null

  /**
   * The `id` of the element that labels the menu, used for accessibility.
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
 * The `Menu` component is a building block for application menus, providing
 * keyboard navigation, focus management, and item selection.
 *
 * @remarks
 * `Menu` renders a scrollable container with `role="menu"` and manages
 * keyboard navigation (arrow keys, Home, End) across its {@link MenuItem}
 * and {@link MenuGroup} children. It supports nested menus via the
 * `registerElement` prop and integrates with the {@link Layer} stacking
 * context for click-outside and Escape key handling.
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
        ref={handleRefChange}
        as={as}
        className={menu({className})}
        outline="none"
        overflow="auto"
        padding={padding}
        role="menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <Stack gap={gap}>{children}</Stack>
      </Box>
    </MenuContext>
  )
}
