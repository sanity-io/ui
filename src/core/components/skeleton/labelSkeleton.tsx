import {_composeClassNames, labelSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontLabelSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './skeleton'

/** @public */
export const DEFAULT_LABEL_SKELETON_ELEMENT = 'div'

/** @beta */
export type LabelSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontLabelSize>
}

/** @public */
export type LabelSkeletonElementType = SkeletonElementType

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type LabelSkeletonProps<E extends LabelSkeletonElementType = LabelSkeletonElementType> =
  Props<LabelSkeletonOwnProps, E>

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function LabelSkeleton<
  E extends LabelSkeletonElementType = typeof DEFAULT_LABEL_SKELETON_ELEMENT,
>(props: LabelSkeletonProps<E>) {
  const {
    className,
    size = 2,
    ...rest
  } = props as LabelSkeletonProps<typeof DEFAULT_LABEL_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={_composeClassNames(
        className,
        labelSkeleton({
          size,
        }),
      )}
    />
  )
}

LabelSkeleton.displayName = 'LabelSkeleton'
