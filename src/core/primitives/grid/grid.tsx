import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box'

/** @public */
export const DEFAULT_GRID_ELEMENT = 'div'

/** @public */
export type GridOwnProps = Omit<BoxOwnProps, 'display'>

/** @public */
export type GridElementType = BoxElementType

/** @public */
export type GridProps<E extends GridElementType = GridElementType> = Props<GridOwnProps, E>

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
export function Grid<E extends GridElementType = typeof DEFAULT_GRID_ELEMENT>(props: GridProps<E>) {
  const {
    as = DEFAULT_GRID_ELEMENT,
    children,
    ...rest
  } = props as GridProps<typeof DEFAULT_GRID_ELEMENT>

  return (
    <Box data-ui="Grid" {...rest} as={as} display="grid">
      {children}
    </Box>
  )
}

Grid.displayName = 'Grid'
