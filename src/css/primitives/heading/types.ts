import {FlexItemStyleProps, FontStyleProps} from '../../styles'
import {ResponsiveProp} from '../../types'

/** @public */
export type HeadingSize = number

/** @public */
export interface HeadingStyleProps extends FontStyleProps, FlexItemStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<HeadingSize>
}
