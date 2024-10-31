import type {ResponsiveProp} from '../../types'

/** @public */
export type BoxSizing = 'content' | 'border'

/** @public */
export interface BoxSizingStyleProps {
  boxSizing?: ResponsiveProp<BoxSizing>
}
