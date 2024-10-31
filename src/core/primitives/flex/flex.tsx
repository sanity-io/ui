import {forwardRef} from 'react'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface FlexProps extends Omit<BoxProps, 'display'> {}

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
export const Flex = forwardRef(function Flex(
  props: FlexProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'wrap'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, direction = 'row', ...restProps} = props

  return (
    <Box
      data-ui="Flex"
      {...restProps}
      direction={direction}
      display="flex"
      forwardedAs={as}
      ref={ref}
    />
  )
})

Flex.displayName = 'ForwardRef(Flex)'
