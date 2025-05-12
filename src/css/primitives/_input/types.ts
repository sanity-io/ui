import {FontTextSize, Space} from '@sanity/ui/theme'

import {RadiusStyleProps, WidthStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends RadiusStyleProps, WidthStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  gap?: ResponsiveProp<Space>
  padding?: ResponsiveProp<Space>
}
