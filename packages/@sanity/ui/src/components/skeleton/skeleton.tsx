import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxProps} from '../../primitives'

export interface SkeletonProps extends Omit<BoxProps, 'children'> {
  animationDuration?: number
}

const Root = styled(Box)<{$animationDuration: number}>`
  background-color: var(--card-skeleton-color-from);
`

export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps & React.HTMLProps<HTMLDivElement>
) {
  const {animationDuration, ...restProps} = props

  return <Root {...restProps} $animationDuration={animationDuration} />
})
