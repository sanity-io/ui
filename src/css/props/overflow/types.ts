import type {ResponsiveProp} from '../../types'

/** @public */
export type Overflow = 'visible' | 'hidden' | 'auto'

/** @public */
export interface OverflowStyleProps {
  overflow?: ResponsiveProp<Overflow>
  overflowX?: ResponsiveProp<Overflow>
  overflowY?: ResponsiveProp<Overflow>
}
