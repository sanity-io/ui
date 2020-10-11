import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {textBaseStyles, textSizeStyles} from './styles'
import {getResponsiveProp} from '../helpers'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number | number[]
  weight?: string
}

// @todo: Figure out typings
const Root = styled.div(textBaseStyles, textSizeStyles as any)

export const Text = forwardRef(
  (props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {children, size: sizeProp = 2, weight, ...restProps} = props
    const size = getResponsiveProp(sizeProp)

    return (
      <Root data-ui="Text" {...restProps} ref={ref} size={size} weight={weight}>
        {children}
      </Root>
    )
  }
)

Text.displayName = 'Text'
