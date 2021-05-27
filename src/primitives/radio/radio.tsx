import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {radioBaseStyle, inputElementStyle} from './styles'

/**
 * @public
 */
export interface RadioProps {
  customValidity?: string
}

const Root = styled.div(radioBaseStyle)
const Input = styled.input(inputElementStyle)

/**
 * @public
 */
export const Radio = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const {className, disabled, style, customValidity, readOnly, ...restProps} = props
    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root className={className} data-ui="Radio" style={style}>
        <Input
          data-read-only={!disabled && readOnly ? '' : undefined}
          {...restProps}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          ref={ref}
          type="radio"
        />
        <span />
      </Root>
    )
  }
)

Radio.displayName = 'Radio'
