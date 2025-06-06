import type {ResponsiveProp} from '../../types'

/** @public */
export type AlignItems = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'

/** @public */
export interface AlignItemsStyleProps {
  alignItems?: ResponsiveProp<AlignItems>
}
