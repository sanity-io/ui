import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRowStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridRowStart` instead
 */
export type GridItemRowStart = 'auto' | number

/** @public */
export interface GridRowStartStyleProps {
  /**
   * @deprecated Use `gridRowStart` instead
   */
  rowStart?: ResponsiveProp<GridItemRowStart>
  gridRowStart?: ResponsiveProp<GridRowStart>
}
