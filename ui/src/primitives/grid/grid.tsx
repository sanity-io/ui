import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveGridStyle,
  ResponsiveGridStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'

interface GridProps
  extends FlexItemStyleProps,
    ResponsiveBoxStyleProps,
    ResponsiveGridStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveMarginStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveMarginStyleProps
>(
  flexItemStyle,
  responsiveBoxStyle,
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
