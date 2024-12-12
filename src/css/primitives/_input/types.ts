import {FontTextSize, Space} from '@sanity/ui/theme'
import {RadiusStyleProps} from '../../styles'
import {ResponsiveProp} from '../../types'

/** @public */
export interface InputStyleProps extends RadiusStyleProps {
  border?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  gap?: ResponsiveProp<Space>
  padding?: ResponsiveProp<Space>
}
