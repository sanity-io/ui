import {_composeClassNames, menu, type PaddingStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'

import {useClickOutsideEvent, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import type {ComponentType, Props} from '../../types'
import {useLayer} from '../../utils'
import {MenuContext, type MenuContextValue} from './menuContext'
import {useMenuController} from './useMenuController'

/** @public */
export const DEFAULT_MENU_ELEMENT = 'div'

/** @public */
export type MenuOwnProps = PaddingStyleProps & {
  /**
   * @deprecated Use `shouldFocus="first"` instead.
   */
  'focusFirst'?: boolean
  /**
   * @deprecated Use `shouldFocus="last"` instead.
   */
  'focusLast'?: boolean
  'gap'?: ResponsiveProp<Space>
  'onClickOutside'?: (event: MouseEvent) => void
  'onEscape'?: () => void
  'onItemClick'?: () => void
  'onItemSelect'?: (index: number) => void
  'originElement'?: HTMLElement | null
  'registerElement'?: (el: HTMLElement) => () => void
  'shouldFocus'?: 'first' | 'last' | null
  /** @deprecated Use `gap` property instead. */
  'space'?: ResponsiveProp<Space>
  'aria-labelledby'?: string
  // 'onBlurCapture'?: (event: FocusEvent) => void
}

/** @public */
export type MenuElementType = 'div' | 'span' | ComponentType

/** @public */
export type MenuProps<E extends MenuElementType = MenuElementType> = Props<MenuOwnProps, E>

/**
 * The `Menu` component is a building block for application menus.
 *
 * @public
 */
export function Menu<E extends MenuElementType = typeof DEFAULT_MENU_ELEMENT>(props: MenuProps<E>) {
  const {
    as = DEFAULT_MENU_ELEMENT,
    children,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusFirst,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusLast,
    gap,
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
    space = 1,
    ...rest
  } = props as MenuProps<typeof DEFAULT_MENU_ELEMENT>

  const shouldFocus =
    _shouldFocus ?? ((props.focusFirst && 'first') || (props.focusLast && 'last') || null)

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

  const value: MenuContextValue = useMemo(
    () => ({
      version: 0.0,
      activeElement,
      activeIndex,
      mount,
      onClickOutside,
      onEscape,
      onItemClick,
      onItemMouseEnter: handleItemMouseEnter,
      onItemMouseLeave: handleItemMouseLeave,
      registerElement,

      // deprecated
      onMouseEnter: handleItemMouseEnter,
      onMouseLeave: handleItemMouseLeave,
    }),
    [
      activeElement,
      activeIndex,
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
    <MenuContext.Provider value={value}>
      <Box
        data-ui="Menu"
        {...rest}
        as={as}
        className={_composeClassNames(className, menu())}
        onKeyDown={handleKeyDown}
        overflow="auto"
        outline="none"
        padding={padding}
        ref={handleRefChange}
        role="menu"
        tabIndex={-1}
      >
        <Stack gap={gap ?? space}>{children}</Stack>
      </Box>
    </MenuContext.Provider>
  )
}

Menu.displayName = 'Menu'
