import {ContainerWidth} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

/** @public */
export type Width = ContainerWidth | 'fill'

/** @public */
export interface WidthStyleProps {
  width?: ResponsiveProp<Width>
}
