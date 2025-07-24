import type {ResponsiveProp} from '../../types'

/** @public */
export type MinHeight = 0 | 'full'

/** @public */
export interface MinHeightStyleProps {
  minHeight?: ResponsiveProp<MinHeight>
}
