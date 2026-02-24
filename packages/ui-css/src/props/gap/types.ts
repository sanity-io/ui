import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface GapStyleProps {
  gap?: ResponsiveProp<Space>
  gapX?: ResponsiveProp<Space>
  gapY?: ResponsiveProp<Space>
}
