import type {FontLabelSize} from '@sanity/ui/theme'

import type {FontStyleProps, TextAlignStyleProps} from '../../aspects'
import type {ResponsiveProp} from '../../types'

/**
 * @public
 * @deprecated Use `FontLabelSize` from `@sanity/ui/theme` instead
 */
export type LabelSize = number

/** @public */
export interface LabelStyleProps extends FontStyleProps {
  /** @deprecated No longer in use */
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  muted?: boolean
  size?: ResponsiveProp<FontLabelSize>
}
