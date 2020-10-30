import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {flexItem, FlexItemProps} from '../../styles'
import {flexBaseStyles, flexColumnStyles} from './styles'
import {FlexAlign, FlexDirection, FlexJustify} from './types'

interface FlexProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  align?: FlexAlign
  direction?: FlexDirection
  flex?: number | number[]
  justify?: FlexJustify
}

const Root = styled.div<
  FlexItemProps & {align?: FlexAlign; justify?: FlexJustify; uiDirection: FlexDirection}
>(flexItem, flexBaseStyles, flexColumnStyles)

export const Flex = forwardRef((props: React.HTMLProps<HTMLDivElement> & FlexProps, ref) => {
  const {direction = 'row', ...restProps} = props

  return <Root data-ui="Flex" {...restProps} uiDirection={direction} ref={ref} />
})

Flex.displayName = 'Flex'
