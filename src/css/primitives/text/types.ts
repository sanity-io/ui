import {FlexItemStyleProps, FontStyleProps} from '../../styles'
import {ResponsiveProp} from '../../types'

export type TextSize = number

/** @public */
export interface TextStyleProps extends FlexItemStyleProps, FontStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<TextSize>
}
