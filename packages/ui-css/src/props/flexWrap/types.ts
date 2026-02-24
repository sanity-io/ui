import type {ResponsiveProp} from '../../types'

/** @public */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

/** @public */
export interface FlexWrapStyleProps {
  flexWrap?: ResponsiveProp<FlexWrap>
}
