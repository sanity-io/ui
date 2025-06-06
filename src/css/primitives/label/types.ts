import type {FontLabelSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/**
 * @public
 * @deprecated Use `FontLabelSize` from `@sanity/ui/theme` instead
 */
export type LabelSize = number

/** @public */
export interface LabelStyleProps extends FlexStyleProps, FontStyleProps {
  /** @deprecated No longer in use */
  accent?: boolean
  align?: TextAlignStyleProps['textAlign']
  className?: string
  muted?: boolean
  size?: ResponsiveProp<FontLabelSize>
}
