import {codeSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontCodeSize} from '@sanity/ui/theme'

import type {Props} from '../../types/props'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './skeleton'

/** @beta */
export const DEFAULT_CODE_SKELETON_ELEMENT = 'div'

/** @beta */
export type CodeSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontCodeSize>
}

/** @beta */
export type CodeSkeletonElementType = SkeletonElementType

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type CodeSkeletonProps<E extends CodeSkeletonElementType = CodeSkeletonElementType> = Props<
  CodeSkeletonOwnProps,
  E
>

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function CodeSkeleton<
  E extends CodeSkeletonElementType = typeof DEFAULT_CODE_SKELETON_ELEMENT,
>(props: CodeSkeletonProps<E>) {
  const {
    className,
    size = 2,
    ...rest
  } = props as CodeSkeletonProps<typeof DEFAULT_CODE_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={codeSkeleton({
        className,
        size,
      })}
    />
  )
}
