import {FlexItemStyleProps, FontStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

export type TextSize = number

/** @public */
export interface TextStyleProps extends FlexItemStyleProps, FontStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<TextSize>
}
