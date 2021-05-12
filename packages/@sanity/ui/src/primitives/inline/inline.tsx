import React, {forwardRef} from 'react'
import {Flex, FlexProps} from '../flex'

export interface InlineProps extends Omit<FlexProps, 'direction' | 'display' | 'gap'> {
  space?: number | number[]
}

export const Inline = forwardRef(function Inline(
  props: InlineProps & React.HTMLProps<HTMLDivElement>,
  ref
) {
  const {align = 'center', children, space, wrap = 'wrap', ...restProps} = props

  return (
    <Flex data-ui="Inline" {...restProps} align={align} gap={space} ref={ref} wrap={wrap}>
      {children}
    </Flex>
  )
})
