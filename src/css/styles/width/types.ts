import {ContainerWidth} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

export type Width = ContainerWidth

export interface WidthStyleProps {
  width?: ResponsiveProp<Width>
}
