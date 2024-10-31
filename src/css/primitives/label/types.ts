import {FontLabelSize} from '@sanity/ui/theme'

import {FontStyleProps, TextAlignStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

/**
 * @public
 * @deprecated Use `FontLabelSize` from `@sanity/ui/theme` instead
 */
export type LabelSize = number

/** @public */
export interface LabelStyleProps extends FontStyleProps {
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  muted?: boolean
  size?: ResponsiveProp<FontLabelSize>
}
