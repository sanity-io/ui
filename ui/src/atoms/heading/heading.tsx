import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {headingFont} from '../../styles'
import {headingBaseStyles} from './styles'

interface HeadingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number | number[]
  weight?: string
}

const Root = styled.div(headingBaseStyles, headingFont)

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, size = 2, weight = 'bold', ...restProps} = props

    return (
      <Root data-ui="Heading" {...restProps} ref={ref} size={size} weight={weight}>
        {children}
      </Root>
    )
  }
)

Heading.displayName = 'Heading'
