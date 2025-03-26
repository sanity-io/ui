import {FlexAlign, FlexDirection, FlexJustify, FlexValue, FlexWrap} from '../../types'

/**
 * @internal
 */
export interface ResponsiveFlexStyleProps {
  $align: FlexAlign[]
  $direction: FlexDirection[]
  $gap: number[]
  $justify: FlexJustify[]
  $wrap: FlexWrap[]
}

/**
 * @internal
 */
export interface ResponsiveFlexItemStyleProps {
  $flex: FlexValue[]
}

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FlexItemStyleProps extends ResponsiveFlexItemStyleProps {}
