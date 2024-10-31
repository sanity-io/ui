import {FontStyleProps} from '@sanity/ui/css'
import {ResponsiveProp} from '../../types'

/** @public */
export type HeadingSize = number

/** @public */
export interface HeadingStyleProps extends FontStyleProps {
  accent?: boolean
  muted?: boolean
  size?: ResponsiveProp<HeadingSize>
}
