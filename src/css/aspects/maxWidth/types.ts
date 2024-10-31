import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface MaxWidthStyleProps {
  maxWidth?: ResponsiveProp<ContainerWidth | 'auto' | 'fill'>
}
