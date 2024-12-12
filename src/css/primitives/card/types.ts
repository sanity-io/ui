import {ResponsiveProp} from '../../types'
import {BoxStyleProps} from '../box'

export interface CardStyleProps extends BoxStyleProps {
  checkered?: boolean
  selectable?: boolean
  shadow?: ResponsiveProp<number>
}
