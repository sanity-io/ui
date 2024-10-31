import type {FlexItemStyleProps, FontStyleProps, TextAlignStyleProps} from '../../aspects'
import type {ResponsiveProp} from '../../types'

/** @public */
export type HeadingSize = number

/** @public */
export interface HeadingStyleProps extends FontStyleProps, FlexItemStyleProps {
  /** @deprecated No longer in use */
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  muted?: boolean
  size?: ResponsiveProp<HeadingSize>
}
