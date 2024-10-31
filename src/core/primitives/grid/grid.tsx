import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GridProps extends Omit<BoxProps, 'display'> {}

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
export const Grid = forwardRef(function Grid(
  props: Props<GridProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, children, ...restProps} = props

  return (
    <Box data-ui="Grid" {...restProps} as={as} display="grid" ref={ref}>
      {children}
    </Box>
  )
})

Grid.displayName = 'ForwardRef(Grid)'
