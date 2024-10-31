import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import {checkbox, checkboxInput, composeClassNames} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks'
import {Props} from '../../types'

/**
 * @public
 */
export interface CheckboxProps {
  indeterminate?: boolean
  customValidity?: string
}

/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * @public
 */
export const Checkbox = forwardRef(function Checkbox(
  props: Props<CheckboxProps, 'input'>,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const {
    checked,
    className,
    disabled,
    indeterminate,
    customValidity,
    readOnly,
    style,
    ...restProps
  } = props

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

  useCustomValidity(ref, customValidity)

  return (
    <span className={composeClassNames(className, checkbox())} data-ui="Checkbox" style={style}>
      <input
        {...restProps}
        checked={checked}
        className={composeClassNames(className, checkboxInput())}
        data-disabled={disabled ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        data-error={customValidity ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={ref}
      />
      <span>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </span>
  )
})

Checkbox.displayName = 'ForwardRef(Checkbox)'
