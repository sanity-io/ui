import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface PaddingStyleProps {
  padding?: ResponsiveProp<Space>
  paddingTop?: ResponsiveProp<Space>
  paddingRight?: ResponsiveProp<Space>
  paddingBottom?: ResponsiveProp<Space>
  paddingLeft?: ResponsiveProp<Space>
  paddingX?: ResponsiveProp<Space>
  paddingY?: ResponsiveProp<Space>
}
