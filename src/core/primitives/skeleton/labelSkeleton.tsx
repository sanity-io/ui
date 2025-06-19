import {labelSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontLabelSize} from '@sanity/ui/theme'

import type {Props} from '../../types/props'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './skeleton'

/** @beta */
export const DEFAULT_LABEL_SKELETON_ELEMENT = 'div'

/** @beta */
export type LabelSkeletonOwnProps = SkeletonOwnProps & {
  size?: ResponsiveProp<FontLabelSize>
}

/** @beta */
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
>(props: LabelSkeletonProps<E>): React.JSX.Element {
  const {
    className,
    size = 2,
    ...rest
  } = props as LabelSkeletonProps<typeof DEFAULT_LABEL_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={labelSkeleton({
        className,
        size,
      })}
    />
  )
}
