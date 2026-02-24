import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface ContainerStyleProps {
  className?: string
  width?: ResponsiveProp<ContainerWidth>
}
