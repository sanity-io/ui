import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveFlexItemStyle,
  ResponsiveFlexItemStyleProps,
  responsiveGridItemStyle,
  ResponsiveGridItemStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'

export interface BoxProps
  extends ResponsiveBoxStyleProps,
    ResponsiveGridItemStyleProps,
    ResponsiveMarginStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveFlexItemStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveFlexItemStyleProps
>(
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveFlexItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle
)

export const Box = forwardRef(
  (props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>, ref) => {
    const {as: asProp = 'div', display = 'block', margin = 0, padding = 0, ...restProps} = props

    return (
      <Root
        data-ui="Box"
        {...restProps}
        as={asProp}
        display={display}
        margin={margin}
        padding={padding}
        ref={ref}
      >
        {props.children}
      </Root>
    )
  }
)

Box.displayName = 'Box'
