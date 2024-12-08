import {RadiusStyleProps} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends RadiusStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
  space?: ResponsiveProp<Space>
}
