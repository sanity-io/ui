import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type MaxWidth = ContainerWidth | 'auto' | 'fill'

/** @public */
export interface MaxWidthStyleProps {
  maxWidth?: ResponsiveProp<MaxWidth>
}
