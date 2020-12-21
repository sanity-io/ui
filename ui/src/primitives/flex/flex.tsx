import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveFlexProps, ResponsiveFlexItemProps} from '../types'

interface FlexProps extends BoxProps, ResponsiveFlexProps, ResponsiveFlexItemProps {}

const Root = styled(Box)<FlexItemStyleProps & ResponsiveFlexStyleProps>(
  flexItemStyle,
  responsiveFlexStyle
)

export const Flex = forwardRef((props: FlexProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {align, as, direction = 'row', justify, wrap, ...restProps} = props

  return (
    <Root
      data-ui="Flex"
      {...restProps}
      $align={align}
      $direction={direction}
      $justify={justify}
      $wrap={wrap}
      forwardedAs={as}
      ref={ref}
    />
  )
})

Flex.displayName = 'Flex'
