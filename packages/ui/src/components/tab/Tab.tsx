import type {ComponentType, Props} from '@sanity/ui/core'
import {Button, type ButtonOwnProps} from '@sanity/ui/primitives/button'
import {use, useCallback, useEffect, useImperativeHandle, useRef} from 'react'

import {TabContext} from './TabListContext'

/** @public */
export const DEFAULT_TAB_ELEMENT = 'button'

/** @public */
export interface TabOwnProps extends ButtonOwnProps {
  /**
   * The `id` of the corresponding `TabPanel` component.
   */
  'aria-controls': string
  'id': string
  'focused'?: boolean
  'label'?: React.ReactNode
  'onActivate'?: () => void
}

/** @public */
export type TabElementType = 'button' | ComponentType

/** @public */
export type TabProps<E extends TabElementType = TabElementType> = Props<TabOwnProps, E>

/** @public */
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
