import {FlexItemStyleProps, FontStyleProps, TextAlignStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

/** @public */
export type TextSize = number

/** @public */
export interface TextStyleProps extends FlexItemStyleProps, FontStyleProps {
  /**
   * @deprecated Will be removed in next major version
   */
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  muted?: boolean
  size?: ResponsiveProp<TextSize>
}
