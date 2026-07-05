import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {useCustomValidity} from '../../hooks'
import {checkboxBaseStyles, inputElementStyles} from './styles'

/**
 * @public
 */
export interface CheckboxProps {
  indeterminate?: boolean
  customValidity?: string
}

const StyledCheckbox = styled.div(checkboxBaseStyles)
const Input = styled.input(inputElementStyles)

/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * @public
 */
export const Checkbox = forwardRef(function Checkbox(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & CheckboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
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
    <StyledCheckbox className={className} data-ui="Checkbox" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        data-error={customValidity ? '' : undefined}
        {...restProps}
        checked={checked}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={ref}
      />
      <span>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </StyledCheckbox>
  )
})
Checkbox.displayName = 'ForwardRef(Checkbox)'
