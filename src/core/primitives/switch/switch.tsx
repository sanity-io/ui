import {
  _switch,
  _switchElement,
  _switchPresentation,
  _switchThumb,
  _switchTrack,
  composeClassNames,
} from '@sanity/ui/css'
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
      data-checked={checked ? '' : undefined}
      data-indeterminate={indeterminate ? '' : undefined}
      data-ui="Switch"
      display="inline-block"
      position="relative"
      style={style}
    >
      <input
        {...restProps}
        checked={indeterminate !== true && checked}
        className={_switchElement()}
        data-disabled={disabled ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <span aria-hidden className={_switchPresentation()}>
        <span className={_switchTrack()} />
        <span className={_switchThumb()} />
      </span>
    </Box>
  )
})

Switch.displayName = 'ForwardRef(Switch)'
