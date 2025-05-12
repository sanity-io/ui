import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

/**
 * @public
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/**
 * @public
 */
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/**
 * @public
 */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

/** @public */
export interface FlexStyleProps {
  align?: ResponsiveProp<FlexAlign>
  direction?: ResponsiveProp<FlexDirection>
  justify?: ResponsiveProp<FlexJustify>
  wrap?: ResponsiveProp<FlexWrap>
}
