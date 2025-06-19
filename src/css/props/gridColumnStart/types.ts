import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumnStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridColumnStartStyleProps {
  gridColumnStart?: ResponsiveProp<GridColumnStart>
}
