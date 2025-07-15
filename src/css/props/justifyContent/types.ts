import type {ResponsiveProp} from '../../types'

/** @public */
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/** @public */
export interface JustifyContentStyleProps {
  justifyContent?: ResponsiveProp<JustifyContent>
}
