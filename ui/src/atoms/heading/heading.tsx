import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {headingFont} from '../../styles'
import {headingBaseStyles} from './styles'

interface HeadingProps {
  accent?: boolean
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

const Root = styled.div(headingBaseStyles, headingFont)

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, size = 2, ...restProps} = props

    return (
      <Root data-ui="Heading" {...restProps} ref={ref} size={size}>
        {children}
      </Root>
    )
  }
)

Heading.displayName = 'Heading'
