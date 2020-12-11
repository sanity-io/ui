import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
  responsiveFlexItemStyle,
  ResponsiveFlexItemStyleProps,
} from '../../styles/internal'

interface FlexProps
  extends ResponsiveBoxStyleProps,
    ResponsiveFlexStyleProps,
    ResponsiveFlexItemStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  ResponsiveBoxStyleProps & ResponsiveFlexStyleProps & ResponsiveFlexItemStyleProps
>(responsiveBoxStyle, responsiveFlexStyle, responsiveFlexItemStyle)

export const Flex = forwardRef((props: FlexProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {direction, ...restProps} = props

  return <Root data-ui="Flex" {...restProps} direction={direction} ref={ref} />
})

Flex.displayName = 'Flex'
