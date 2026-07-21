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
  /**
   * Optional: `Flex` applies `flexItemStyle` without passing `$flex` — its public
   * `flex` prop is forwarded to the inner `Box`, which resolves it to `$flex`.
   * `flexItemStyle` guards for the missing value.
   */
  $flex?: FlexValue[]
}

/**
 * @internal
 */
export interface FlexItemStyleProps extends ResponsiveFlexItemStyleProps {}
