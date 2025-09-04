import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type Width = ContainerWidth | 'auto' | 'fill' | 'stretch' | 'min' | 'max'

/** @public */
export interface WidthStyleProps {
  width?: ResponsiveProp<Width>
}
