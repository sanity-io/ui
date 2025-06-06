import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export type CodeSize = number

/** @public */
export interface CodeStyleProps extends FlexStyleProps, Omit<FontStyleProps, 'align'> {
  className?: string
  size?: ResponsiveProp<CodeSize>
}
