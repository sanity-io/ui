import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  boxStyle,
  BoxStyleProps,
  flexItemStyle,
  FlexItemStyleProps,
  gridItemStyle,
  GridItemProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles'

export interface BoxProps
  extends BoxStyleProps,
    GridItemProps,
    ResponsiveMarginStyleProps,
    ResponsivePaddingStyleProps,
    FlexItemStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  BoxStyleProps &
    GridItemProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps &
    FlexItemStyleProps
>(boxStyle, gridItemStyle, flexItemStyle, responsiveMarginStyle, responsivePaddingStyle)

export const Box = forwardRef(
  (props: Omit<React.HTMLProps<HTMLDivElement>, 'height'> & BoxProps, ref) => {
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
