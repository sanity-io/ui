import {headingSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontHeadingSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './Skeleton'

/** @beta */
export const DEFAULT_HEADING_SKELETON_ELEMENT = 'div'

/** @beta */
export type HeadingSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontHeadingSize>
}

/** @beta */
export type HeadingSkeletonElementType = SkeletonElementType

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type HeadingSkeletonProps<
  E extends HeadingSkeletonElementType = HeadingSkeletonElementType,
> = Props<HeadingSkeletonOwnProps, E>

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function HeadingSkeleton<
  E extends HeadingSkeletonElementType = typeof DEFAULT_HEADING_SKELETON_ELEMENT,
>(props: HeadingSkeletonProps<E>): React.JSX.Element {
  const {
    className,
    size = 2,
    ...rest
  } = props as HeadingSkeletonProps<typeof DEFAULT_HEADING_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={headingSkeleton({
        className,
        size,
      })}
    />
  )
}
