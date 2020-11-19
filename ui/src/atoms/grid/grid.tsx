import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {boxStyle, BoxStyleProps, gridStyle, GridStyleProps} from '../../styles'

const Root = styled.div<BoxStyleProps & GridStyleProps>(boxStyle, gridStyle)

export const Grid = forwardRef(
  (
    props: BoxStyleProps &
      GridStyleProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'rows'> & {
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
