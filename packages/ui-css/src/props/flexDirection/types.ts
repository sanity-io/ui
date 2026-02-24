import type {ResponsiveProp} from '../../types'

/** @public */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/** @public */
export interface FlexDirectionStyleProps {
  flexDirection?: ResponsiveProp<FlexDirection>
}
