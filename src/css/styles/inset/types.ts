import {ResponsiveProp} from '../../types'

/** @public */
export type Inset = 0

/** @public */
export interface InsetStyleProps {
  inset?: ResponsiveProp<Inset>
  insetTop?: ResponsiveProp<Inset>
  insetRight?: ResponsiveProp<Inset>
  insetBottom?: ResponsiveProp<Inset>
  insetLeft?: ResponsiveProp<Inset>
}
