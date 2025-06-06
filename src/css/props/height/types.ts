import type {ResponsiveProp} from '../../types'

/**
 * @public
 * @deprecated Use `Height` instead
 */
export type BoxHeight = 'stretch' | 'fill'

/** @public */
export type Height = 'fill' | 'auto' | 'min' | 'max' | 'fit' | 'stretch'

/** @public */
export interface HeightStyleProps {
  height?: ResponsiveProp<Height>
}
