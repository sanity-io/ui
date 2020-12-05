import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveFlexItemStyle,
  ResponsiveFlexItemStyleProps,
  responsiveGridStyle,
  ResponsiveGridStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles'

interface GridProps
  extends ResponsiveBoxStyleProps,
    ResponsiveFlexItemStyleProps,
    ResponsiveGridStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveMarginStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  ResponsiveBoxStyleProps &
    ResponsiveGridStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveMarginStyleProps
>(
  responsiveBoxStyle,
  responsiveFlexItemStyle,
  responsiveGridStyle,
  responsivePaddingStyle,
  responsiveMarginStyle
)

export const Grid = forwardRef(
  (props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'rows'>, ref) => {
    const {children, ...restProps} = props

    return (
      <Root data-ui="Grid" {...restProps} ref={ref}>
        {children}
      </Root>
    )
  }
)

Grid.displayName = 'Grid'
