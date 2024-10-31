import {composeClassNames, headingSkeleton, ResponsiveProp} from '@sanity/ui/css'
import {FontHeadingSize} from '@sanity/ui/theme'

import {Props} from '../../types'
import {Skeleton, SkeletonElementType, SkeletonOwnProps} from './skeleton'

/** @public */
export const DEFAULT_HEADING_SKELETON_ELEMENT = 'div'

/** @beta */
export type HeadingSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontHeadingSize>
}

/** @public */
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
>(props: HeadingSkeletonProps<E>) {
  const {
    className,
    size = 2,
    ...rest
  } = props as HeadingSkeletonProps<typeof DEFAULT_HEADING_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={composeClassNames(
        className,
        headingSkeleton({
          size,
        }),
      )}
    />
  )
}

HeadingSkeleton.displayName = 'HeadingSkeleton'
