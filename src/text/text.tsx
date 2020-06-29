import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {textBaseStyles, textSizeStyles} from './styles'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

const Root = styled.div(textBaseStyles, textSizeStyles)

export const Text = forwardRef((props: React.HTMLProps<HTMLDivElement> & TextProps, ref) => {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Text" {...restProps} ref={ref} size={size}>
      {children}
    </Root>
  )
})

Text.displayName = 'Text'
