import type {ResponsiveProp} from '../../types'

/** @public */
export type Height = 'fill' | 'auto' | 'min' | 'max' | 'fit' | 'stretch'

/** @public */
export interface HeightStyleProps {
  height?: ResponsiveProp<Height>
}
