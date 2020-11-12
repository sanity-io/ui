import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {gridStyle, GridStyleProps} from '../../styles'

const Root = styled.div(gridStyle)

export const Grid = forwardRef(
  (
    props: GridStyleProps &
      React.HTMLProps<HTMLDivElement> & {
        as?: React.ElementType | keyof JSX.IntrinsicElements
      },
    ref
  ) => {
    const {children, ...restProps} = props

    return (
      <Root data-ui="Grid" {...restProps} ref={ref}>
        {children}
      </Root>
    )
  }
)

Grid.displayName = 'Grid'
