import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonTone} from './types'

interface ButtonProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button(buttonBaseStyles, buttonColorStyles)

export const Button = forwardRef((props: React.HTMLProps<HTMLButtonElement> & ButtonProps, ref) => {
  const {children, ...restProps} = props

  return (
    <Root data-ui="Button" {...restProps} ref={ref}>
      {children && <Text>{children}</Text>}
    </Root>
  )
})

Button.displayName = 'Button'
