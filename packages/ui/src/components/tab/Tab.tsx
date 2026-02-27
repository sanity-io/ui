import type {ComponentType, Props} from '@sanity/ui/core'
import {Button, type ButtonOwnProps} from '@sanity/ui/primitives/button'
import {use, useCallback, useEffect, useImperativeHandle, useRef} from 'react'

import {TabContext} from './TabListContext'

/**
 * The default HTML element type rendered by the {@link Tab} component.
 *
 * @public
 */
export const DEFAULT_TAB_ELEMENT = 'button'

/**
 * Own props for the {@link Tab} component.
 *
 * @remarks
 * Extends {@link ButtonOwnProps} to inherit all button styling and
 * interactive props, and adds tab-specific behavior for use within
 * a {@link TabList}.
 *
 * @public
 */
export interface TabOwnProps extends ButtonOwnProps {
  /**
   * The `id` of the corresponding {@link TabPanel} component that
   * this tab controls.
   */
  'aria-controls': string

  /**
   * A unique identifier for the tab, used for accessibility attributes
   * and coordination with the {@link TabList} context.
   */
  'id': string

  /**
   * When `true`, indicates the tab is visually focused via keyboard navigation.
   */
  'focused'?: boolean

  /**
   * The text label to display inside the tab button.
   */
  'label'?: React.ReactNode

  /**
   * A callback that fires when this tab becomes the active tab.
   */
  'onActivate'?: () => void
}

/**
 * Accepted values for the `as` prop of the {@link Tab} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Tab`.
 *
 * @public
 */
export type TabElementType = 'button' | ComponentType

/**
 * Props for the {@link Tab} component.
 *
 * @remarks
 * Combines {@link TabOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<button>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabElementType}.
 *
 * @public
 */
export type TabProps<E extends TabElementType = TabElementType> = Props<TabOwnProps, E>

/**
 * The `Tab` component represents a single tab control within a {@link TabList},
 * following the WAI-ARIA tabs pattern.
 *
 * @remarks
 * `Tab` renders a {@link Button} with `role="tab"` and manages its own
 * active, selected, and focused states in coordination with the parent
 * {@link TabList} context. It supports keyboard navigation (ArrowLeft,
 * ArrowRight, Home, End) when used inside a `TabList`.
 *
 * @public
 */
export function Tab<E extends TabElementType = typeof DEFAULT_TAB_ELEMENT>(
  props: TabProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_ELEMENT,
    id,
    fontSize = 1,
    label,
    onActivate,
    onBlur,
    onClick,
    onFocus,
    padding = 2,
    ref: forwardedRef,
    selected: selectedProp,
    ...rest
  } = props as TabProps<typeof DEFAULT_TAB_ELEMENT>

  const {focusTab, focusedId, activateTab, registerTab, activeId} = use(TabContext) ?? {}
  const focused = Boolean(id && focusedId === id)
  const active = Boolean(id && activeId === id)
  const activeRef = useRef(active)
  const selected = selectedProp ?? active

  const ref = useRef<HTMLButtonElement | null>(null)
  const focusedRef = useRef(false)

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => ref.current,
  )

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event)
      activateTab?.(id)
    },
    [onClick, activateTab, id],
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      focusedRef.current = false
      if (onBlur) onBlur(event)
      focusTab?.(undefined)
    },
    [onBlur, focusTab],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      focusedRef.current = true
      if (onFocus) onFocus(event)
      focusTab?.(id)
    },
    [onFocus, focusTab, id],
  )

  // register the tab with the list
  useEffect(() => {
    const element = ref.current

    if (registerTab && element) {
      return registerTab(id, element, selectedProp)
    }

    return undefined
  }, [registerTab, id, selected, selectedProp])

  // focus the tab when using keyboard navigation
  useEffect(() => {
    if (focused) {
      ref.current?.focus()
    }
  }, [focused])

  useEffect(() => {
    const wasActive = activeRef.current

    activeRef.current = active

    if (!wasActive && active) onActivate?.()
  }, [active, selectedProp, onActivate])

  return (
    <Button
      data-ui="Tab"
      {...rest}
      ref={ref}
      aria-selected={selected ? 'true' : 'false'}
      as={as}
      flex="none"
      fontSize={fontSize}
      // icon={icon}
      id={id}
      maxWidth="fill"
      mode="bleed"
      padding={padding}
      role="tab"
      selected={selected}
      tabIndex={selected ? 0 : -1}
      text={label}
      type="button"
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
    />
  )
}
