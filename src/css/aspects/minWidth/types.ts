import {ResponsiveProp} from '../../types'

export type MinWidth = 0 | 'auto' | 'full' | 'min' | 'max' | 'fit'

export interface MinWidthStyleProps {
  minWidth?: ResponsiveProp<MinWidth>
}
