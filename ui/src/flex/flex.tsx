import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {flexBaseStyles, flexColumnStyles} from './styles'
import {FlexDirection} from './types'

interface FlexProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  direction?: FlexDirection
}

const Root = styled.div(flexBaseStyles, flexColumnStyles)

export const Flex = forwardRef((props: React.HTMLProps<HTMLDivElement> & FlexProps, ref) => {
  const {direction = 'row', ...restProps} = props

  return <Root data-ui="Flex" {...restProps} direction={direction} ref={ref} />
})

Flex.displayName = 'Flex'
