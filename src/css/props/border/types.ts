import type {ResponsiveProp} from '../../types'

/** @public */
export type BorderStyle = 'solid' | 'muted' | 'none'

/** @public */
export interface BorderStyleProps {
  border?: ResponsiveProp<BorderStyle | boolean>
  borderTop?: ResponsiveProp<BorderStyle | boolean>
  borderRight?: ResponsiveProp<BorderStyle | boolean>
  borderBottom?: ResponsiveProp<BorderStyle | boolean>
  borderLeft?: ResponsiveProp<BorderStyle | boolean>
}
