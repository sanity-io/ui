import type {FontCodeSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface CodeStyleProps
  extends FlexStyleProps,
    Omit<FontStyleProps, 'align'>,
    MarginStyleProps,
    MaxWidthStyleProps {
  className?: string
  size?: ResponsiveProp<FontCodeSize>
}
