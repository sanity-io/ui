import type {ComponentType, Props} from '@sanity/ui/core'
import {skeleton, type SkeletonStyleProps} from '@sanity/ui/css'
import {useEffect, useState} from 'react'

/**
 * The default HTML element type rendered by the {@link Skeleton} component.
 *
 * @beta
 */
export const DEFAULT_SKELETON_ELEMENT = 'div'

/**
 * Own props for the {@link Skeleton} component.
 *
 * @remarks
 * Extends {@link SkeletonStyleProps} to provide skeleton-specific styling,
 * and adds animation and delay capabilities.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type SkeletonOwnProps = SkeletonStyleProps & {
  /**
   * When `true`, applies a shimmer animation to the skeleton placeholder.
   */
  animated?: boolean

  /**
   * The delay in milliseconds before the skeleton becomes visible.
   *
   * @remarks
   * Useful for avoiding layout flicker on fast connections by only showing
   * the skeleton if loading takes longer than the specified delay.
   */
  delay?: number
}

/**
 * Accepted values for the `as` prop of the {@link Skeleton} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Skeleton`.
 *
 * @beta
 */
export type SkeletonElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Skeleton} component.
 *
 * @remarks
 * Combines {@link SkeletonOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SkeletonElementType}.
 *
 * @beta
 */
export type SkeletonProps<E extends SkeletonElementType = SkeletonElementType> = Props<
  SkeletonOwnProps,
  E
>

/**
 * The `Skeleton` component renders a placeholder shape that indicates
 * content is loading.
 *
 * @remarks
 * Use skeletons to represent the approximate layout of content before it
 * has loaded, reducing perceived loading time. Supports an optional shimmer
 * animation and a visibility delay.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function Skeleton<E extends SkeletonElementType = typeof DEFAULT_SKELETON_ELEMENT>(
  props: SkeletonProps<E>,
): React.JSX.Element {
  const {
    as: As = DEFAULT_SKELETON_ELEMENT,
    animated = false,
    className,
    delay,
    ...rest
  } = props as SkeletonProps<typeof DEFAULT_SKELETON_ELEMENT>

  const [visible, setVisible] = useState<boolean>(delay ? false : true)

  useEffect(() => {
    if (!delay) {
      return undefined
    }

    const timeout = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return (
    <As
      data-ui="Skeleton"
      {...rest}
      className={skeleton({
        className,
        ...rest,
      })}
      data-animated={animated ? '' : undefined}
      data-visible={(delay ? visible : true) ? '' : undefined}
    />
  )
}
