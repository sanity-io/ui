import {ResponsiveProp} from '../../types'

/** @public */
export type Inset = 0

/** @public */
export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

/** @public */
export interface PositionStyleProps {
  inset?: ResponsiveProp<Inset>
  position?: ResponsiveProp<Position>
}
