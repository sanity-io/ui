import type {ResponsiveProp} from '../../types'

/** @public */
export type MinWidth = 0 | 'auto' | 'full' | 'min' | 'max' | 'fit'

/** @public */
export interface MinWidthStyleProps {
  minWidth?: ResponsiveProp<MinWidth>
}
