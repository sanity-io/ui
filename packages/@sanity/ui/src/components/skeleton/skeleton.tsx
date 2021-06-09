import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxProps} from '../../primitives'
import {ResponsiveRadiusProps} from '../../primitives/types'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'

export interface SkeletonProps extends ResponsiveRadiusProps, Omit<BoxProps, 'children'> {
  animationDuration?: number
}

const Root = styled(Box)<{$animationDuration: number} & ResponsiveRadiusStyleProps>`
  background-color: var(--card-skeleton-color-from);
  ${responsiveRadiusStyle}
`

export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps & React.HTMLProps<HTMLDivElement>
) {
  const {animationDuration, radius, ...restProps} = props

  return <Root {...restProps} $animationDuration={animationDuration} $radius={radius} />
})
