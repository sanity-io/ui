import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoColumns = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export interface GridAutoColumnsStyleProps {
  gridAutoColumns?: ResponsiveProp<GridAutoColumns>
}
