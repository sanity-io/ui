import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export interface GridAutoRowsStyleProps {
  /**
   * @deprecated Use `gridAutoRows` instead
   */
  autoRows?: ResponsiveProp<GridAutoRows>
  gridAutoRows?: ResponsiveProp<GridAutoRows>
}
