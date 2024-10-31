import type {FontStyleProps} from '../../aspects'
import type {ResponsiveProp} from '../../types'

/** @public */
export type CodeSize = number

/** @public */
export interface CodeStyleProps extends FontStyleProps {
  size?: ResponsiveProp<CodeSize>
}
