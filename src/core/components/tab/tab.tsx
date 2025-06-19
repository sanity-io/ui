import type {ResponsiveProp} from '@sanity/ui/css'
import type {FontTextSize, Space, ThemeColorStateToneKey} from '@sanity/ui/theme'
import {
  type ElementType,
  type FocusEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import {Button} from '../../primitives/button/button'
import type {ComponentType, Props} from '../../types/props'

/** @public */
export const DEFAULT_TAB_ELEMENT = 'button'

/** @public */
export type TabOwnProps = {
  /**
   * The `id` of the corresponding `TabPanel` component.
   */
  'aria-controls': string
  'id': string
  'icon'?: ElementType | ReactNode
  'focused'?: boolean
  'fontSize'?: ResponsiveProp<FontTextSize>
  'label'?: ReactNode
  'padding'?: ResponsiveProp<Space>
  'selected'?: boolean
  'tone'?: ThemeColorStateToneKey
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
    icon,
    id,
    focused,
    fontSize = 1,
    label,
    onClick,
    onFocus,
    padding = 2,
    ref: forwardedRef,
    selected,
    ...rest
  } = props as TabProps<typeof DEFAULT_TAB_ELEMENT>

  const ref = useRef<HTMLButtonElement | null>(null)
  const focusedRef = useRef(false)

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => ref.current,
  )

  const handleBlur = useCallback(() => {
    focusedRef.current = false
  }, [])

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      focusedRef.current = true
      if (onFocus) onFocus(event)
    },
    [onFocus],
  )

  useEffect(() => {
    if (focused && !focusedRef.current) {
      if (ref.current) ref.current.focus()
      focusedRef.current = true
    }
  }, [focused])

  return (
    <Button
      data-ui="Tab"
      {...rest}
      aria-selected={selected ? 'true' : 'false'}
      as={as}
      fontSize={fontSize}
      icon={icon}
      id={id}
      mode="bleed"
      onClick={onClick}
      onBlur={handleBlur}
      onFocus={handleFocus}
      padding={padding}
      ref={ref}
      role="tab"
      selected={selected}
      tabIndex={selected ? 0 : -1}
      text={label}
      type="button"
    />
  )
}
