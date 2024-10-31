import {_switch, composeClassNames} from '@sanity/ui/css'
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {Box} from '../box'

/**
 * @public
 */
export interface SwitchProps {
  indeterminate?: boolean
}

/**
 * The `Switch` component allows the user to toggle a setting on and off.
 *
 * Extends all properties of an `<input type="checkbox" />` element, except type.
 *
 * @public
 */
export const Switch = forwardRef(function Switch(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const {checked, className, disabled, indeterminate, readOnly, style, ...restProps} = props
  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate])

  return (
    <Box
      className={composeClassNames(className, _switch())}
      data-ui="Switch"
      display="inline-block"
      position="relative"
      style={style}
    >
      <input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...restProps}
        checked={indeterminate !== true && checked}
        className="switch-input"
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <span aria-hidden className="switch-presentation" data-name="representation">
        <span className="switch-track" />
        <span
          className="switch-thumb"
          data-checked={checked ? '' : undefined}
          data-indeterminate={indeterminate ? '' : undefined}
        />
      </span>
    </Box>
  )
})
Switch.displayName = 'ForwardRef(Switch)'
