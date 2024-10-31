import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type FlexValue = number | 'none' | 'auto' | 'initial'

/** @public */
export interface FlexItemStyleProps {
  flex?: ResponsiveProp<FlexValue>
}
