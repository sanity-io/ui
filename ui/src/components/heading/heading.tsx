import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {headingBaseStyles, headingSizeStyles} from './styles'

interface HeadingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number | number[]
}

const Root = styled.div(headingBaseStyles, headingSizeStyles)

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, size: sizeProp = 2, ...restProps} = props
    const size = getResponsiveProp(sizeProp)

    return (
      <Root data-ui="Heading" {...restProps} ref={ref} size={size}>
        {children}
      </Root>
    )
  }
)

Heading.displayName = 'Heading'
