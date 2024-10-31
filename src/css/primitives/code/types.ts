import {FontStyleProps} from '@sanity/ui/css'
import {ResponsiveProp} from '../../types'

/** @public */
export type CodeSize = number

/** @public */
export interface CodeStyleProps extends FontStyleProps {
  size?: ResponsiveProp<CodeSize>
}
