import {clsx} from 'clsx/lite'
import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import {Box, BoxOwnProps} from '../../primitives/box/box'
import {ResponsiveRadiusProps} from '../../primitives/types'
import {_getArrayProp} from '../../styles/helpers'
import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'

import {skeleton, skeletonAnimated, skeletonHidden, skeletonStatic} from './skeleton.css'

const StyledSkeleton = styled(Box)<ResponsiveRadiusStyleProps>(responsiveRadiusStyle)

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface SkeletonProps extends ResponsiveRadiusProps, Omit<BoxOwnProps, 'children'> {
  animated?: boolean
  delay?: number
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function Skeleton(props: SkeletonProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>) {
  const {animated = false, className, delay, radius, ref, ...restProps} = props
  // oxlint-disable-next-line no-unneeded-ternary
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
      $radius={_getArrayProp(radius)}
      className={clsx(
        skeleton,
        delay && !visible && skeletonHidden,
        animated ? skeletonAnimated : skeletonStatic,
        className,
      )}
      ref={ref}
    />
  )
}
