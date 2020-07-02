import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {headingBaseStyles, headingSizeStyles} from './styles'

interface HeadingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

const Root = styled.div(headingBaseStyles, headingSizeStyles)

export const Heading = forwardRef((props: React.HTMLProps<HTMLDivElement> & HeadingProps, ref) => {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Heading" {...restProps} ref={ref} size={size}>
      {children}
    </Root>
  )
})

Heading.displayName = 'Heading'
