import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveGridItemStyle,
  ResponsiveGridItemStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'

export interface BoxProps
  extends FlexItemStyleProps,
    ResponsiveBoxStyleProps,
    ResponsiveGridItemStyleProps,
    ResponsiveMarginStyleProps,
    ResponsivePaddingStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps
>(
  flexItemStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
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
