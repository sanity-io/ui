import {FontStyleProps} from '../../styles'
import {ResponsiveProp} from '../../types'

/** @public */
export type CodeSize = number

/** @public */
export interface CodeStyleProps extends FontStyleProps {
  size?: ResponsiveProp<CodeSize>
}
