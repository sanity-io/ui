import {ContainerWidth} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

export type Width = ContainerWidth | 'fill'

export interface WidthStyleProps {
  width?: ResponsiveProp<Width>
}
