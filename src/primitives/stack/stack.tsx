import React, {forwardRef} from 'react'
import {Flex, FlexProps} from '../flex'

export interface StackProps extends Omit<FlexProps, 'direction' | 'display' | 'gap'> {
  space?: number | number[]
}

export const Stack = forwardRef(function Stack(
  props: StackProps & Omit<React.HTMLProps<HTMLDivElement>, 'wrap'>,
  ref
) {
  const {children, space, ...restProps} = props

  return (
    <Flex data-ui="Stack" {...restProps} direction="column" gap={space} ref={ref}>
      {children}
    </Flex>
  )
})
