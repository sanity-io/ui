import {container, CONTAINER_STYLE_PROP_KEYS, type ContainerStyleProps} from '@sanity/ui-css'

import {_splitKeys} from '../../core/_keys'
import type {Props} from '../../core/types'
import type {BoxElementType} from '../box/Box'

/** @public */
export const DEFAULT_CONTAINER_ELEMENT = 'div'

/** @public */
export type ContainerOwnProps = ContainerStyleProps

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
  const [
    styleProps,
    {
      as: Element = DEFAULT_CONTAINER_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(
    props as ContainerProps<typeof DEFAULT_CONTAINER_ELEMENT>,
    CONTAINER_STYLE_PROP_KEYS,
  )

  return <Element data-ui="Container" {...domProps} className={container(styleProps)} />
}
