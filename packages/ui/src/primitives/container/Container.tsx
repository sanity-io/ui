import {_splitKeys, type Props} from '@sanity/ui/core'
import {
  type BoxStyleProps,
  container,
  CONTAINER_STYLE_PROP_KEYS,
  type ContainerStyleProps,
} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/** @public */
export const DEFAULT_CONTAINER_ELEMENT = 'div'

/** @public */
export type ContainerOwnProps = Omit<BoxStyleProps, 'width'> & ContainerStyleProps

/** @public */
export type ContainerElementType = BoxElementType

/** @public */
export type ContainerProps<E extends ContainerElementType = ContainerElementType> = Props<
  ContainerOwnProps,
  E
>

/**
 * The `Container` component wraps content layout in a defined set of widths.
 *
 * @public
 */
export function Container<E extends ContainerElementType = typeof DEFAULT_CONTAINER_ELEMENT>(
  props: ContainerProps<E>,
): React.JSX.Element {
  const [styleProps, domProps] = _splitKeys(
    props as ContainerProps<typeof DEFAULT_CONTAINER_ELEMENT>,
    CONTAINER_STYLE_PROP_KEYS,
  )

  return <div data-ui="Container" {...domProps} className={container(styleProps)} />
}
