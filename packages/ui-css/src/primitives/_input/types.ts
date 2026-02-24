import type {FontTextSize, Space} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends FlexStyleProps, RadiusStyleProps, WidthStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  gap?: ResponsiveProp<Space>
  padding?: ResponsiveProp<Space>
}
