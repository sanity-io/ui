import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type Padding = Space

/** @public */
export interface PaddingStyleProps {
  padding?: ResponsiveProp<Padding>
  paddingTop?: ResponsiveProp<Padding>
  paddingRight?: ResponsiveProp<Padding>
  paddingBottom?: ResponsiveProp<Padding>
  paddingLeft?: ResponsiveProp<Padding>
  paddingX?: ResponsiveProp<Padding>
  paddingY?: ResponsiveProp<Padding>
}
