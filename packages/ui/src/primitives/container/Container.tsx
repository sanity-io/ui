import {container, type ContainerStyleProps} from '@sanity/ui/css'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/** @public */
export const DEFAULT_CONTAINER_ELEMENT = 'div'

/** @public */
export type ContainerOwnProps = Omit<BoxOwnProps, 'width'> & ContainerStyleProps

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
  const {
    as = DEFAULT_CONTAINER_ELEMENT,
    className,
    width = 2,
    ...rest
  } = props as ContainerProps<typeof DEFAULT_CONTAINER_ELEMENT>

  return <Box data-ui="Container" {...rest} as={as} className={container({className, width})} />
}
