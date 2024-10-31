import {ContainerWidth} from '@sanity/ui/theme'
import {ResponsiveProp} from '../../types'

export type Width = 'fill'

export interface WidthStyleProps {
  width?: ResponsiveProp<ContainerWidth | 'fill'>
}
