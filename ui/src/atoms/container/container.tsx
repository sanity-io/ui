import React from 'react'
import styled from 'styled-components'
import {responsiveBoxStyle, ResponsiveBoxStyleProps} from '../../styles'
import {containerBaseStyles, responsiveContainerWidthStyles} from './styles'
import {ResponsiveWidthStyleProps} from './types'

export interface ContainerProps extends ResponsiveWidthStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<ResponsiveBoxStyleProps & ResponsiveWidthStyleProps>(
  responsiveBoxStyle,
  containerBaseStyles,
  responsiveContainerWidthStyles
)

export function Container(
  props: ResponsiveBoxStyleProps &
    ContainerProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'width'>
) {
  const {width = 2, ...restProps} = props

  return <Root data-ui="Container" {...restProps} width={width} />
}
