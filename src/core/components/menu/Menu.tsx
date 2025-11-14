import {SearchIcon} from '@sanity/icons'
import {menu, type PaddingStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import React, {
  type ChangeEvent,
  isValidElement,
  type ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Box} from '../../primitives/box/Box'
import {useLayer} from '../../primitives/layer/useLayer'
import {Stack} from '../../primitives/stack/Stack'
import {Text} from '../../primitives/text/Text'
import {TextInput} from '../../primitives/textInput/TextInput'
import type {ComponentType, Props} from '../../types'
import {fuzzyFilter} from './fuzzySearch'
import {MenuContext, type MenuContextValue} from './MenuContext'
import type {MenuItemProps} from './MenuItem'
import {useMenuController} from './useMenuController'

/** @public */
export const DEFAULT_MENU_ELEMENT = 'div'

/** @public */
export type MenuOwnProps = PaddingStyleProps & {
  'gap'?: ResponsiveProp<Space>
  'onClickOutside'?: (event: MouseEvent) => void
  'onEscape'?: () => void
  'onItemClick'?: (event: React.MouseEvent<HTMLButtonElement>) => void
  'onItemSelect'?: (index: number) => void
  'originElement'?: HTMLElement | null
  'registerElement'?: (el: HTMLElement) => () => void
  'searchable'?: boolean
  'searchPlaceholder'?: string
  'shouldFocus'?: 'first' | 'last' | null
  'aria-labelledby'?: string
}

/** @public */
export type MenuElementType = 'div' | 'span' | ComponentType

/** @public */
export type MenuProps<E extends MenuElementType = MenuElementType> = Props<MenuOwnProps, E>

/**
 * Extract text content from menu item for search filtering
 */
function getMenuItemText(child: ReactElement): string {
  if (!isValidElement(child)) return ''

  const props = child.props as MenuItemProps<'button'> & {text?: unknown}

  // Handle text prop (string or ReactNode)
  if (typeof props.text === 'string') return props.text
  if (typeof props.text === 'number') return String(props.text)

  // Fallback to children if text is not a simple string
  if (typeof props.children === 'string') return props.children
  if (typeof props.children === 'number') return String(props.children)

  return ''
}

/**
 * Filter menu children based on search query
 */
function filterMenuChildren(
  children: React.ReactNode,
  query: string,
): {filtered: React.ReactNode; hasResults: boolean} {
  if (!query || query.trim().length === 0) {
    return {filtered: children, hasResults: true}
  }

  const childArray = React.Children.toArray(children) as ReactElement[]
  const filtered = fuzzyFilter(childArray, query, (child) => {
    // Handle MenuDivider and other non-item components
    if (!child.props || typeof child.props !== 'object') return ''
    return getMenuItemText(child)
  })

  return {
    filtered: filtered.length > 0 ? filtered : null,
    hasResults: filtered.length > 0,
  }
}

/**
 * The `Menu` component is a building block for application menus.
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
    searchable = false,
    searchPlaceholder = 'Search...',
    shouldFocus: _shouldFocus,
    ...rest
  } = props as MenuProps<typeof DEFAULT_MENU_ELEMENT>

  const shouldFocus = _shouldFocus ?? null

  const ref = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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
    shouldFocus: searchable ? null : shouldFocus,
    rootElementRef: ref,
    searchInputRef: searchable ? searchInputRef : undefined,
  })

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [])

  const handleSearchClear = useCallback(() => {
    setSearchQuery('')
  }, [])

  // Auto-focus search input when menu opens if searchable
  useEffect(() => {
    if (searchable && shouldFocus !== null && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
    }
  }, [searchable, shouldFocus])

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

  // Filter children if searchable
  const {filtered: filteredChildren, hasResults} = useMemo(
    () => (searchable ? filterMenuChildren(children, searchQuery) : {filtered: children, hasResults: true}),
    [searchable, children, searchQuery],
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
        <Stack gap={gap}>
          {searchable && (
            <Box paddingX={1} role="search">
              <TextInput
                aria-label="Filter menu items"
                border
                clearButton={searchQuery.length > 0}
                fontSize={1}
                icon={SearchIcon}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                padding={2}
                placeholder={searchPlaceholder}
                radius={2}
                ref={searchInputRef}
                value={searchQuery}
              />
            </Box>
          )}
          {searchable && !hasResults && (
            <Box paddingX={2} paddingY={3}>
              <Text muted size={1}>
                No results found
              </Text>
            </Box>
          )}
          {hasResults && filteredChildren}
        </Stack>
      </Box>
    </MenuContext>
  )
}
