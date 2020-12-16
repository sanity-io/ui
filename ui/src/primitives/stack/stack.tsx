import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'
import {stackBaseStyle, responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps} from './styles'

interface StackProps
  extends FlexItemStyleProps,
    ResponsiveBoxStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveMarginStyleProps,
    ResponsiveStackSpaceStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveMarginStyleProps &
    ResponsiveStackSpaceStyleProps
>(
  flexItemStyle,
  responsiveBoxStyle,
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
