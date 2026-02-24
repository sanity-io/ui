import {type ResponsiveProp, textSkeleton} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './Skeleton'

/** @beta */
export const DEFAULT_TEXT_SKELETON_ELEMENT = 'div'

/** @beta */
export type TextSkeletonOwnProps = SkeletonOwnProps & {
  /**
   * Sets the font size of the skeleton placeholder, matching the text font
   * size scale defined by the theme.
   *
   * @remarks
   * Supports responsive values. The skeleton's height and line-height are
   * derived from this value so that the placeholder matches the dimensions
   * of the {@link Text} component it stands in for.
   *
   * @defaultValue 2
   */
  size?: ResponsiveProp<FontTextSize>
}

/** @beta */
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
 * A skeleton placeholder that matches the dimensions of a {@link Text} component.
 *
 * @remarks
 * The `TextSkeleton` component renders a {@link Skeleton} element styled to
 * approximate the height and line-height of the text typography scale at the
 * given `size`. Use it as a loading placeholder wherever a `Text` element
 * will eventually appear.
 *
 * @beta
 */
export function TextSkeleton<
  E extends TextSkeletonElementType = typeof DEFAULT_TEXT_SKELETON_ELEMENT,
>(props: TextSkeletonProps<E>): React.JSX.Element {
  const {
    className,
    size = 2,
    ...rest
  } = props as TextSkeletonProps<typeof DEFAULT_TEXT_SKELETON_ELEMENT>

  return (
    <Skeleton
      {...rest}
      className={textSkeleton({
        className,
        size,
      })}
    />
  )
}
