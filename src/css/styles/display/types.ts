import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type Display =
  | 'block'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none'

export interface DisplayStyleProps {
  display?: ResponsiveProp<Display>
}
