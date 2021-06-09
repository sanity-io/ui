import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Card, CardProps} from '../../primitives'

export interface SkeletonProps extends Omit<CardProps, 'children' | 'tone'> {
  animationDuration?: number
}

const Root = styled(Card)<{$animationDuration: number}>``

export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps & React.HTMLProps<HTMLDivElement>
) {
  const {animationDuration, ...restProps} = props

  return <Root {...restProps} $animationDuration={animationDuration} tone="transparent" />
})
