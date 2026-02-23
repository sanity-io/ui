import {skeleton, type SkeletonStyleProps} from '@sanity/ui/css'
import {useEffect, useState} from 'react'

import type {ComponentType, Props} from '../../types'

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
 * Extends {@link SkeletonStyleProps} to inherit flex, margin, and radius style props,
 * and adds skeleton-specific properties for animation and delayed visibility.
 *
 * Inherited from {@link SkeletonStyleProps}:
 * - `className` (`string`) – A custom CSS class name to append to the element.
 * - `flex` (`ResponsiveProp<Flex>`) – Controls the flex grow/shrink behavior within a flex container.
 * - `margin`, `marginX`, `marginY`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft` – Outer margin props from the theme spacing scale.
 * - `radius` (`ResponsiveProp<Radius | 'full'>`) – Sets the border radius using the theme radius scale (`0 | 1 | 2 | 3 | 4 | 5 | 6 | "full"`).
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 *
 * @beta
 */
export type SkeletonOwnProps = SkeletonStyleProps & {
  /**
   * When `true`, applies a pulsing animation to the skeleton element to
   * indicate that content is loading.
   *
   * @remarks
   * The animation is applied via the `data-animated` attribute on the
   * rendered element. The actual visual animation is defined in the
   * design system's CSS layer.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  animated?: boolean

  /**
   * Sets a delay in milliseconds before the skeleton becomes visible.
   *
   * @remarks
   * When a positive number is provided, the skeleton is initially hidden
   * and becomes visible after the specified delay has elapsed. This is
   * useful for preventing skeleton flashes during fast load times — the
   * skeleton is only shown if the content takes longer than the delay
   * to appear.
   *
   * When `0`, `undefined`, or not provided, the skeleton is visible
   * immediately on mount.
   *
   * @type {number}
   * @defaultValue undefined
   * @optional
   */
  delay?: number
}

/**
 * Accepted values for the `as` prop of the {@link Skeleton} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Skeleton`.
 *
 * Accepted values: `"div"` | `"span"` | `ComponentType`
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
 * A placeholder loading indicator that mimics the shape of content that is
 * still loading.
 *
 * @remarks
 * The `Skeleton` component renders a blank element styled as a loading
 * placeholder. It supports an optional pulsing animation via the `animated`
 * prop and delayed visibility via the `delay` prop to prevent skeleton
 * flashes during fast load times.
 *
 * The skeleton inherits flex, margin, and radius style props from
 * {@link SkeletonStyleProps}, allowing it to match the size and shape
 * of the content it replaces. Consumers are expected to set explicit
 * dimensions (via `style` or CSS) to match the anticipated content size.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `SkeletonElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `animated` | `boolean` | `false` | No | When `true`, applies a pulsing loading animation. |
 * | `delay` | `number` | `undefined` | No | Delay in milliseconds before the skeleton becomes visible. |
 * | `flex` | `ResponsiveProp<Flex>` | `undefined` | No | Controls flex grow/shrink behavior. |
 * | `margin` | `ResponsiveProp<Margin>` | `undefined` | No | Sets outer margin on all sides. |
 * | `radius` | `ResponsiveProp<Radius \| 'full'>` | `undefined` | No | Sets the border radius. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| "full"`. |
 *
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
