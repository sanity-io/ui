import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoColumns = 'auto' | 'min' | 'max' | 'fr'

/**
 * @public
 * @deprecated Use `GridAutoColumns` instead
 * */
export type GridAutoCols = GridAutoColumns

/** @public */
export interface GridAutoColumnsStyleProps {
  /**
   * @deprecated Use `gridAutoColumns` instead
   */
  autoCols?: ResponsiveProp<GridAutoCols>
  gridAutoColumns?: ResponsiveProp<GridAutoColumns>
}
