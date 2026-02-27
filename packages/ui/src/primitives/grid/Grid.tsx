import {grid, GRID_STYLE_PROP_KEYS, type GridStyleProps} from '@sanity/ui/css'

import {_splitKeys} from '../../_keys'
import type {Props} from '../../types'
import {type BoxElementType} from '../box/Box'

/** @public */
export const DEFAULT_GRID_ELEMENT = 'div'

/** @public */
export type GridOwnProps = GridStyleProps

/** @public */
export type GridElementType = BoxElementType

/** @public */
export type GridProps<E extends GridElementType = GridElementType> = Props<GridOwnProps, E>

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
export function Grid<E extends GridElementType = typeof DEFAULT_GRID_ELEMENT>(
  props: GridProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_GRID_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as GridProps<typeof DEFAULT_GRID_ELEMENT>, GRID_STYLE_PROP_KEYS)

  return <Element data-ui="Grid" {...domProps} className={grid(styleProps)} />
}
