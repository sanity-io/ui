import type {FontLabelSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface LabelStyleProps
  extends FlexStyleProps,
    FontStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps {
  align?: TextAlignStyleProps['textAlign']
  className?: string
  muted?: boolean
  size?: ResponsiveProp<FontLabelSize>
}
