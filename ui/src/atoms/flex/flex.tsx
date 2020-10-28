import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {boxFlexStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {flexBaseStyles, flexColumnStyles} from './styles'
import {FlexAlign, FlexDirection, FlexJustify} from './types'

interface FlexProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  align?: FlexAlign
  direction?: FlexDirection
  flex?: number | number[]
  justify?: FlexJustify
}

const Root = styled.div(boxFlexStyles as any, flexBaseStyles as any, flexColumnStyles)

export const Flex = forwardRef((props: React.HTMLProps<HTMLDivElement> & FlexProps, ref) => {
  const {direction = 'row', flex: flexProp, ...restProps} = props
  const flex = getResponsiveProp(flexProp)

  return <Root data-ui="Flex" {...restProps} uiDirection={direction} flex={flex} ref={ref} />
})

Flex.displayName = 'Flex'
