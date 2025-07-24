import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type Margin = Space | 'auto'

/** @public */
export interface MarginStyleProps {
  margin?: ResponsiveProp<Margin>
  marginX?: ResponsiveProp<Margin>
  marginY?: ResponsiveProp<Margin>
  marginTop?: ResponsiveProp<Margin>
  marginRight?: ResponsiveProp<Margin>
  marginBottom?: ResponsiveProp<Margin>
  marginLeft?: ResponsiveProp<Margin>
}
