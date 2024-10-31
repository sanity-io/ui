import {_composeClassNames, type ResponsiveProp, textSkeleton} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './skeleton'

/** @public */
export const DEFAULT_TEXT_SKELETON_ELEMENT = 'div'

/** @beta */
export type TextSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontTextSize>
}

/** @public */
export type TextSkeletonElementType = SkeletonElementType

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type TextSkeletonProps<E extends TextSkeletonElementType = TextSkeletonElementType> = Props<
  TextSkeletonOwnProps,
  E
>

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function TextSkeleton<
  E extends TextSkeletonElementType = typeof DEFAULT_TEXT_SKELETON_ELEMENT,
>(props: TextSkeletonProps<E>) {
  const {
    className,
    size = 2,
    ...rest
  } = props as TextSkeletonProps<typeof DEFAULT_TEXT_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={_composeClassNames(
        className,
        textSkeleton({
          size,
        }),
      )}
    />
  )
}

TextSkeleton.displayName = 'TextSkeleton'
