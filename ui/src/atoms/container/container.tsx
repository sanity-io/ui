import React from 'react'
import styled from 'styled-components'
import {boxStyle, BoxStyleProps, getResponsiveProp} from '../../styles'
import {containerBaseStyles, containerWidthStyles} from './styles'

export interface ContainerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  width?: number | number[]
}

const Root = styled.div<BoxStyleProps & {width?: number | number[]}>(
  boxStyle,
  containerBaseStyles,
  containerWidthStyles as any
)

export function Container(
  props: BoxStyleProps & ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'width'>
) {
  const {width: widthProp, ...restProps} = props
  const width = getResponsiveProp(widthProp, [2])

  return <Root data-ui="Container" {...restProps} width={width} />
}
