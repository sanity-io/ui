import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box'

/** @public */
export const DEFAULT_FLEX_ELEMENT = 'div'

/** @public */
export type FlexOwnProps = Omit<BoxOwnProps, 'display'>

/** @public */
export type FlexElementType = BoxElementType

/** @public */
export type FlexProps<E extends FlexElementType = FlexElementType> = Props<FlexOwnProps, E>

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
export function Flex<E extends FlexElementType = typeof DEFAULT_FLEX_ELEMENT>(props: FlexProps<E>) {
  const {
    as = DEFAULT_FLEX_ELEMENT,
    direction = 'row',
    ...rest
  } = props as FlexProps<typeof DEFAULT_FLEX_ELEMENT>

  return <Box data-ui="Flex" {...rest} as={as} direction={direction} display="flex" />
}

Flex.displayName = 'Flex'
