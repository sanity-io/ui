import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
} from '../../styles/internal'

interface FlexProps extends FlexItemStyleProps, ResponsiveBoxStyleProps, ResponsiveFlexStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<FlexItemStyleProps & ResponsiveBoxStyleProps & ResponsiveFlexStyleProps>(
  flexItemStyle,
  responsiveBoxStyle,
  responsiveFlexStyle
)

export const Flex = forwardRef((props: FlexProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {direction = 'row', ...restProps} = props

  return <Root data-ui="Flex" {...restProps} direction={direction} ref={ref} />
})

Flex.displayName = 'Flex'
