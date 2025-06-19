import {skeleton, type SkeletonStyleProps} from '@sanity/ui/css'
import {useEffect, useState} from 'react'

import type {ComponentType, Props} from '../../types/props'

/** @beta */
export const DEFAULT_SKELETON_ELEMENT = 'div'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type SkeletonOwnProps = SkeletonStyleProps & {
  animated?: boolean
  delay?: number
}

/** @beta */
export type SkeletonElementType = 'div' | 'span' | ComponentType

/** @beta */
export type SkeletonProps<E extends SkeletonElementType = SkeletonElementType> = Props<
  SkeletonOwnProps,
  E
>

/**
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
    radius,
    ...rest
  } = props as SkeletonProps<typeof DEFAULT_SKELETON_ELEMENT>

  const [visible, setVisible] = useState<boolean>(delay ? false : true)

  useEffect(() => {
    if (!delay) {
      return setVisible(true)
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
        radius,
      })}
      data-animated={animated ? '' : undefined}
      data-visible={visible ? '' : undefined}
    />
  )
}
