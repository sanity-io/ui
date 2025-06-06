import type {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  ResponsiveProp,
} from '@sanity/ui/css'

import type {Props} from '../../types/props'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/box'

/** @public */
export const DEFAULT_FLEX_ELEMENT = 'div'

/** @public */
export type FlexOwnProps = Omit<BoxOwnProps, 'align' | 'display' | 'flexDirection' | 'flexWrap'> & {
  align?: ResponsiveProp<AlignItems>
  direction?: ResponsiveProp<FlexDirection>
  justify?: ResponsiveProp<JustifyContent>
  wrap?: ResponsiveProp<FlexWrap>
}

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
    align,
    as = DEFAULT_FLEX_ELEMENT,
    direction = 'row',
    justify,
    wrap,
    ...rest
  } = props as FlexProps<typeof DEFAULT_FLEX_ELEMENT>

  return (
    <Box
      data-ui="Flex"
      {...rest}
      alignItems={align}
      as={as}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap}
      justifyContent={justify}
    />
  )
}
