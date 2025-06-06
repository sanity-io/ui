import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export type HeadingSize = number

/** @public */
export interface HeadingStyleProps extends FontStyleProps, FlexStyleProps {
  /** @deprecated No longer in use */
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  className?: string
  muted?: boolean
  size?: ResponsiveProp<HeadingSize>
}
