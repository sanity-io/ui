import {forwardRef} from 'react'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface GridProps extends Omit<BoxProps, 'display'> {}

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
export const Grid = forwardRef(function Grid(
  props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, children, ...restProps} = props

  return (
    <Box
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Grid"
      {...restProps}
      as={as}
      display="grid"
      ref={ref}
    >
      {children}
    </Box>
  )
})

Grid.displayName = 'ForwardRef(Grid)'
