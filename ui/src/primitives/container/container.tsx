import React from 'react'
import styled from 'styled-components'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
} from '../../styles/internal'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

export interface ContainerProps
  extends FlexItemStyleProps,
    ResponsiveBoxStyleProps,
    ResponsiveWidthStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<FlexItemStyleProps & ResponsiveBoxStyleProps & ResponsiveWidthStyleProps>(
  flexItemStyle,
  responsiveBoxStyle,
  containerBaseStyle,
  responsiveContainerWidthStyle
)

export function Container(
  props: ResponsiveBoxStyleProps &
    ContainerProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'width'>
) {
  const {width = 2, ...restProps} = props

  return <Root data-ui="Container" {...restProps} width={width} />
}
