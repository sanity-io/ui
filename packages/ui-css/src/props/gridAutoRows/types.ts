import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export interface GridAutoRowsStyleProps {
  gridAutoRows?: ResponsiveProp<GridAutoRows>
}
