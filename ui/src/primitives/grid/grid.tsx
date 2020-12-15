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
} from '../../styles/internal'

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
    const {as: asProp, margin = 0, padding = 0, children, ...restProps} = props

    return (
      <Root
        data-as={String(asProp)}
        data-ui="Grid"
        {...restProps}
        as={asProp}
        margin={margin}
        padding={padding}
        ref={ref}
      >
        {children}
      </Root>
    )
  }
)

Grid.displayName = 'Grid'
