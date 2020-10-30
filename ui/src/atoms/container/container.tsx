import React from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../../styles'
import {containerBaseStyles, containerWidthStyles} from './styles'

interface ContainerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  width?: number | number[]
}

const Root = styled.div(containerBaseStyles, containerWidthStyles)

export function Container(props: React.HTMLProps<HTMLDivElement> & ContainerProps) {
  const {width: widthProp, ...restProps} = props
  const width = getResponsiveProp(widthProp, [2])

  return <Root data-ui="Container" {...restProps} width={width} />
}
