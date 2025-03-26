import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {Button} from '../../primitives'
import {ButtonTone} from '../../types'

/**
 * @public
 */
export interface TabProps {
  /**
   * The `id` of the correlating `TabPanel` component.
   */
  'aria-controls': string
  'id': string
  'icon'?: React.ElementType | React.ReactNode
  'focused'?: boolean
  'fontSize'?: number | number[]
  'label'?: React.ReactNode
  'padding'?: number | number[]
  'selected'?: boolean
  'tone'?: ButtonTone
}

const CustomButton = styled(Button)`
  max-width: 100%;
`

/**
 * @public
 */
export const Tab = forwardRef(function Tab(
  props: TabProps &
    Omit<
      React.HTMLProps<HTMLButtonElement>,
      'aria-controls' | 'as' | 'id' | 'label' | 'type' | 'width'
    >,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    icon,
    id,
    focused,
    fontSize = 1,
    label,
    onClick,
    onFocus,
    padding = 2,
    selected,
    ...restProps
  } = props
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
    (event: React.FocusEvent<HTMLButtonElement>) => {
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
    <CustomButton
      data-ui="Tab"
      {...restProps}
      aria-selected={selected ? 'true' : 'false'}
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
})
Tab.displayName = 'ForwardRef(Tab)'
