import {forwardRef, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {useCustomValidity} from '../../hooks'
import {inputElementStyle, radioBaseStyle} from './styles'

/**
 * @public
 */
export interface RadioProps {
  customValidity?: string
}

const StyledRadio = styled.div(radioBaseStyle)
const Input = styled.input(inputElementStyle)

/**
 * The `Radio` component allows the user to select one option from a set.
 *
 * @public
 */
export const Radio = forwardRef(function Radio(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const {className, disabled, style, customValidity, readOnly, ...restProps} = props
  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <StyledRadio className={className} data-ui="Radio" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        data-error={customValidity ? '' : undefined}
        {...restProps}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        ref={ref}
        type="radio"
      />
      <span />
    </StyledRadio>
  )
})
Radio.displayName = 'ForwardRef(Radio)'
