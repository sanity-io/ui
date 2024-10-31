import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/** @public */
export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridStyleProps {
  autoRows?: ResponsiveProp<GridAutoRows>
  autoCols?: ResponsiveProp<GridAutoCols>
  autoFlow?: ResponsiveProp<GridAutoFlow>
  columns?: ResponsiveProp<Columns>
  rows?: ResponsiveProp<Rows>
}
