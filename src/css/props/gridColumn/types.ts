import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumn = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridColumnStyleProps {
  gridColumn?: ResponsiveProp<GridColumn>
}
