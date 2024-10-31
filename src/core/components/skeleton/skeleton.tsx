import {composeClassNames, skeleton, SkeletonStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, useEffect, useState} from 'react'

import {Box, BoxProps} from '../../primitives'
import {Props} from '../../types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface SkeletonProps extends SkeletonStyleProps, Omit<BoxProps, 'children'> {
  animated?: boolean
  delay?: number
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const Skeleton = forwardRef(function Skeleton(
  props: Props<SkeletonProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {animated = false, className, delay, radius, ...restProps} = props
  const [visible, setVisible] = useState<boolean>(delay ? false : true)

  useEffect(() => {
    if (!delay) {
      return setVisible(true)
    }

    const timeout = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return (
    <Box
      data-ui="Skeleton"
      {...restProps}
      className={composeClassNames(className, skeleton({radius}))}
      data-animated={animated ? '' : undefined}
      data-visible={visible ? '' : undefined}
      ref={ref}
    />
  )
})

Skeleton.displayName = 'ForwardRef(Skeleton)'
