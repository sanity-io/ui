import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface FlexProps extends Omit<BoxProps, 'display'> {
  htmlFor?: string
}

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
export const Flex = forwardRef(function Flex(
  props: Props<FlexProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, direction = 'row', ...restProps} = props

  return (
    <Box data-ui="Flex" {...restProps} as={as} direction={direction} display="flex" ref={ref} />
  )
})

Flex.displayName = 'ForwardRef(Flex)'
