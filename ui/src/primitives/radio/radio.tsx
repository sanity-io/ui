import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {radioBaseStyle, inputElementStyle} from './styles'

interface RadioProps {
  customValidity?: string
}

const Root = styled.div(radioBaseStyle)
const Input = styled.input(inputElementStyle)

export const Radio = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const {className, style, customValidity, ...restProps} = props
    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root className={className} data-ui="Radio" style={style}>
        <Input type="radio" {...restProps} ref={ref} />
        <span />
      </Root>
    )
  }
)

Radio.displayName = 'Radio'
