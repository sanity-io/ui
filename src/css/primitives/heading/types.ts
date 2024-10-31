import {FlexItemStyleProps, FontStyleProps, TextAlignStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

/** @public */
export type HeadingSize = number

/** @public */
export interface HeadingStyleProps extends FontStyleProps, FlexItemStyleProps {
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  muted?: boolean
  size?: ResponsiveProp<HeadingSize>
}
