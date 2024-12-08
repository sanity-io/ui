import {FlexItemStyleProps, FontStyleProps} from '@sanity/ui/css'
import {ResponsiveProp} from '../../types'

export type TextSize = number

/** @public */
export interface TextStyleProps extends FlexItemStyleProps, FontStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<TextSize>
}
