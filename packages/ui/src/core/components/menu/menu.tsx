import {clsx} from 'clsx/lite'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'

import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Box} from '../../primitives/box/box'
import {Stack} from '../../primitives/stack/stack'
import {ResponsivePaddingProps} from '../../primitives/types'
import {useLayer} from '../../utils/layer/useLayer'
import {MenuContext, MenuContextValue} from './menuContext'
import {useMenuController} from './useMenuController'

import {menu} from './menu.css'

/**
 * @public
 */
export interface MenuProps extends ResponsivePaddingProps {
  /**
   * @deprecated Use `shouldFocus="first"` instead.
   */
  'focusFirst'?: never
  /**
   * @deprecated Use `shouldFocus="last"` instead.
   */
  'focusLast'?: never
  'onClickOutside'?: (event: MouseEvent) => void
  'onEscape'?: () => void
  'onItemClick'?: () => void
  'onItemSelect'?: (index: number) => void
  'originElement'?: HTMLElement | null
  'registerElement'?: (el: HTMLElement) => () => void
  'shouldFocus'?: 'first' | 'last' | null
  'gap'?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  'space'?: never
  'aria-labelledby'?: string
  'onBlurCapture'?: (event: FocusEvent) => void
}

/**
 * The `Menu` component is a building block for application menus.
 *
 * @public
 */
export function Menu(
  props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'role' | 'tabIndex'>,
) {
  const {
    children,
    className,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemSelect,
    onKeyDown,
    originElement,
    padding = 1,
    ref: forwardedRef,
    registerElement,
    shouldFocus = null,
    gap = 1,
    ...restProps
  } = props

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
  } = useMenuController({onKeyDown, originElement, shouldFocus, rootElementRef: ref})

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
    <MenuContext.Provider value={value}>
      <Box
        className={clsx(menu, className)}
        data-ui="Menu"
        {...restProps}
        onKeyDown={handleKeyDown}
        padding={padding}
        ref={handleRefChange}
        role="menu"
        tabIndex={-1}
      >
        <Stack gap={gap}>{children}</Stack>
      </Box>
    </MenuContext.Provider>
  )
}
