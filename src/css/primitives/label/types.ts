import {FontStyleProps} from '../../aspects'
import {ResponsiveProp} from '../../types'

/** @public */
export type LabelSize = number

/** @public */
export interface LabelStyleProps extends FontStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<LabelSize>
}
