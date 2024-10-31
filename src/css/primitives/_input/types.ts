import type {FontTextSize, Space} from '@sanity/ui/theme'

import type {RadiusStyleProps, WidthStyleProps} from '../../aspects'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends RadiusStyleProps, WidthStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  gap?: ResponsiveProp<Space>
  padding?: ResponsiveProp<Space>
}
