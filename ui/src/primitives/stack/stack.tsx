import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveFlexItemStyle,
  ResponsiveFlexItemStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'
import {stackBaseStyle, responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps} from './styles'

interface StackProps
  extends ResponsiveBoxStyleProps,
    ResponsiveFlexItemStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveMarginStyleProps,
    ResponsiveStackSpaceStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  ResponsiveBoxStyleProps &
    ResponsiveFlexItemStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveMarginStyleProps &
    ResponsiveStackSpaceStyleProps
>(
  responsiveBoxStyle,
  responsiveFlexItemStyle,
  responsivePaddingStyle,
  responsiveMarginStyle,
  stackBaseStyle,
  responsiveStackSpaceStyle
)

export const Stack = forwardRef((props: StackProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {as: asProp, margin = 0, padding = 0, space, ...restProps} = props

  return (
    <Root
      data-as={String(asProp)}
      data-ui="Stack"
      {...restProps}
      as={asProp}
      margin={margin}
      padding={padding}
      ref={ref}
      space={space}
    />
  )
})

Stack.displayName = 'Stack'
