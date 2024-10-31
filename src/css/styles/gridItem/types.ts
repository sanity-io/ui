import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type GridItemColumn = 'auto' | 'full' | number

/**
 * @public
 */
export type GridItemColumnStart = 'auto' | number

/**
 * @public
 */
export type GridItemColumnEnd = 'auto' | number

/**
 * @public
 */
export type GridItemRow = 'auto' | 'full' | number

/**
 * @public
 */
export type GridItemRowStart = 'auto' | number

/**
 * @public
 */
export type GridItemRowEnd = 'auto' | number

export interface GridItemStyleProps {
  column?: ResponsiveProp<GridItemColumn>
  columnStart?: ResponsiveProp<GridItemColumnStart>
  columnEnd?: ResponsiveProp<GridItemColumnEnd>

  row?: ResponsiveProp<GridItemRow>
  rowStart?: ResponsiveProp<GridItemRowStart>
  rowEnd?: ResponsiveProp<GridItemRowEnd>
}
