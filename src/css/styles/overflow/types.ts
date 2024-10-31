import {ResponsiveProp} from '../../types'

/** @public */
export type BoxOverflow = 'visible' | 'hidden' | 'auto'

/** @public */
export interface OverflowStyleProps {
  overflow?: ResponsiveProp<BoxOverflow>
  overflowX?: ResponsiveProp<BoxOverflow>
  overflowY?: ResponsiveProp<BoxOverflow>
}
