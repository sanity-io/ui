import {forwardRef, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import {Box, BoxProps, ResponsiveRadiusProps} from '../../primitives'
import {_getArrayProp} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {skeletonStyle} from './styles'

const StyledSkeleton = styled(Box)<
  {$animated: boolean; $visible: boolean} & ResponsiveRadiusStyleProps
>(responsiveRadiusStyle, skeletonStyle)

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface SkeletonProps extends ResponsiveRadiusProps, Omit<BoxProps, 'children'> {
  animated?: boolean
  delay?: number
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps & React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {animated = false, delay, radius, ...restProps} = props
  const [visible, setVisible] = useState<boolean>(delay ? false : true)

  useEffect(() => {
    if (!delay) {
      return undefined
    }

    const timeout = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return (
    <StyledSkeleton
      {...restProps}
      $animated={animated}
      $radius={_getArrayProp(radius)}
      $visible={delay ? visible : true}
      ref={ref}
    />
  )
})
Skeleton.displayName = 'ForwardRef(Skeleton)'
