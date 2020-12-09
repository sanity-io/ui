import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import {Button} from '../../atoms'
import {useForwardedRef} from '../../hooks'

interface TabProps {
  /**
   * The `id` of the correlating `TabPanel` component.
   */
  'aria-controls': string
  id: string
  icon?: React.ComponentType | React.ReactNode
  focused?: boolean
  label?: React.ReactNode
  selected?: boolean
}

export const Tab = forwardRef(
  (
    props: TabProps &
      Omit<React.HTMLProps<HTMLButtonElement>, 'aria-controls' | 'as' | 'id' | 'type'>,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const {icon, id, focused, label, onClick, onFocus, selected, ...restProps} = props
    const elementRef = useRef<HTMLButtonElement | null>(null)
    const focusedRef = useRef(false)

    const handleBlur = useCallback(() => {
      focusedRef.current = false
    }, [])

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        focusedRef.current = true
        if (onFocus) onFocus(event)
      },
      [onFocus]
    )

    const ref = useForwardedRef(forwardedRef)

    useEffect(() => {
      if (focused && !focusedRef.current) {
        if (elementRef.current) elementRef.current.focus()
        focusedRef.current = true
      }
    }, [focused])

    const setRef = (el: HTMLButtonElement | null) => {
      elementRef.current = el
      ref.current = el
    }

    return (
      <Button
        data-ui="Tab"
        {...restProps}
        aria-selected={selected ? 'true' : 'false'}
        icon={icon}
        id={id}
        mode="bleed"
        onClick={onClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        padding={2}
        ref={setRef}
        role="tab"
        selected={selected}
        tabIndex={selected ? 0 : -1}
        text={label}
        type="button"
      />
    )
  }
)

Tab.displayName = 'Tab'
