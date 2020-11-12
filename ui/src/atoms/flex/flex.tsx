import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {flexStyle, FlexStyleProps, flexItemStyle, FlexItemStyleProps} from '../../styles'

interface FlexProps extends FlexStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<FlexStyleProps & FlexItemStyleProps>(flexStyle, flexItemStyle)

export const Flex = forwardRef((props: React.HTMLProps<HTMLDivElement> & FlexProps, ref) => {
  const {direction, ...restProps} = props

  return <Root data-ui="Flex" {...restProps} direction={direction} ref={ref} />
})

Flex.displayName = 'Flex'
