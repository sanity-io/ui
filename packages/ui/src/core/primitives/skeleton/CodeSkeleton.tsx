import {codeSkeleton, type ResponsiveProp} from '@sanity/ui/css'
import type {FontCodeSize} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Skeleton, type SkeletonElementType, type SkeletonOwnProps} from './Skeleton'

/** @beta */
export const DEFAULT_CODE_SKELETON_ELEMENT = 'div'

/** @beta */
export type CodeSkeletonOwnProps = SkeletonOwnProps & {
  /**
   * Sets the font size of the skeleton placeholder, matching the code font
   * size scale defined by the theme.
   *
   * @remarks
   * Supports responsive values. The skeleton's height and line-height are
   * derived from this value so that the placeholder matches the dimensions
   * of the {@link Code} component it stands in for.
   *
   * @defaultValue 2
   */
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
 * A skeleton placeholder that matches the dimensions of a {@link Code} component.
 *
 * @remarks
 * The `CodeSkeleton` component renders a {@link Skeleton} element styled to
 * approximate the height and line-height of the code typography scale at the
 * given `size`. Use it as a loading placeholder wherever a `Code` element
 * will eventually appear.
 *
 * @beta
 */
export function CodeSkeleton<
  E extends CodeSkeletonElementType = typeof DEFAULT_CODE_SKELETON_ELEMENT,
>(props: CodeSkeletonProps<E>): React.JSX.Element {
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
