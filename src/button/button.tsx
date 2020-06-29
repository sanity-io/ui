import React from 'react'
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

export function Button(props: React.HTMLProps<HTMLButtonElement> & ButtonProps) {
  const {children, ...restProps} = props

  return (
    <Root data-ui="Button" {...restProps}>
      {children && <Text>{children}</Text>}
    </Root>
  )
}
