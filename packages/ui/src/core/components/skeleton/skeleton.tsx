import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import {Box, BoxOwnProps} from '../../primitives/box/box'
import {ResponsiveRadiusProps} from '../../primitives/types'
import {_getArrayProp} from '../../styles/helpers'
import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'
import {skeletonStyle} from './styles'

const StyledSkeleton = styled(Box)<
  {$animated: boolean; $visible: boolean} & ResponsiveRadiusStyleProps
>(responsiveRadiusStyle, skeletonStyle)

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
  const {animated = false, delay, radius, ref, ...restProps} = props
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
      $animated={animated}
      $radius={_getArrayProp(radius)}
      $visible={delay ? visible : true}
      ref={ref}
    />
  )
}
