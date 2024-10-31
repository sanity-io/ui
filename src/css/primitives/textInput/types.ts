import {FontTextSize, Space} from '@sanity/ui/theme'
import {ResponsiveProp} from '../../types'

/** @public */
export interface TextInputStyleProps {
  padding: ResponsiveProp<Space>
  size: ResponsiveProp<FontTextSize>
}
