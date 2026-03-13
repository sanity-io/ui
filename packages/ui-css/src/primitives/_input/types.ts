import type {FontTextSize, FontWeight, Space} from '@sanity/ui-tokens'

import type {FlexPropStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends FlexPropStyleProps, RadiusStyleProps, WidthStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  fontWeight?: FontWeight
  gap?: ResponsiveProp<Space>
  padding?: ResponsiveProp<Space>
}
