import {ContainerWidth} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

/** @public */
export interface MaxWidthStyleProps {
  maxWidth?: ResponsiveProp<ContainerWidth | 'auto' | 'fill'>
}
