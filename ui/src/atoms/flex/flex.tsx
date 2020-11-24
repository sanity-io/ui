import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  boxStyle,
  BoxStyleProps,
  flexStyle,
  FlexStyleProps,
  flexItemStyle,
  FlexItemStyleProps,
} from '../../styles'

interface FlexProps extends BoxStyleProps, FlexStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<BoxStyleProps & FlexStyleProps & FlexItemStyleProps>(
  boxStyle,
  flexStyle,
  flexItemStyle
)

export const Flex = forwardRef(
  (
    props: BoxStyleProps & FlexProps & FlexItemStyleProps & React.HTMLProps<HTMLDivElement>,
    ref
  ) => {
    const {direction, ...restProps} = props

    return <Root data-ui="Flex" {...restProps} direction={direction} ref={ref} />
  }
)

Flex.displayName = 'Flex'
