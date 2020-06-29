import React from 'react'
import styled from 'styled-components'
import {textBaseStyles, textSizeStyles} from './styles'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

const Root = styled.div(textBaseStyles, textSizeStyles)

export function Text(props: React.HTMLProps<HTMLDivElement> & TextProps) {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Text" {...restProps} size={size}>
      {children}
    </Root>
  )
}
