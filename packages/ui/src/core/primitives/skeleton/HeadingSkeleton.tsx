import {headingSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontHeadingSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './Skeleton'

/** @beta */
export const DEFAULT_HEADING_SKELETON_ELEMENT = 'div'

/** @beta */
export type HeadingSkeletonOwnProps = SkeletonOwnProps & {
  /**
   * Sets the font size of the skeleton placeholder, matching the heading font
   * size scale defined by the theme.
   *
   * @remarks
   * Supports responsive values. The skeleton's height and line-height are
   * derived from this value so that the placeholder matches the dimensions
   * of the {@link Heading} component it stands in for.
   *
   * @defaultValue 2
   */
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
 * A skeleton placeholder that matches the dimensions of a {@link Heading} component.
 *
 * @remarks
 * The `HeadingSkeleton` component renders a {@link Skeleton} element styled to
 * approximate the height and line-height of the heading typography scale at the
 * given `size`. Use it as a loading placeholder wherever a `Heading` element
 * will eventually appear.
 *
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
