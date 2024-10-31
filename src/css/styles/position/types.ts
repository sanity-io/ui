import {ResponsiveProp} from '../../types'

/** @public */
export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

/** @public */
export interface PositionStyleProps {
  position?: ResponsiveProp<Position>
}
