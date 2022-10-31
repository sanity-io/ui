import {forwardRef, memo} from 'react'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {
  FlexItemStyleProps,
  ResponsiveFlexStyleProps,
  __tmp_flexItemStyle,
  __tmp_flexStyle,
  responsiveFlexAlignStyle,
  responsiveFlexDirectionStyle,
  responsiveFlexGapStyle,
  responsiveFlexItemStyle,
  responsiveFlexJustifyStyle,
  responsiveFlexWrapStyle,
} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveFlexProps, ResponsiveFlexItemProps} from '../types'

/**
 * @public
 */
export interface FlexProps
  extends Omit<BoxProps, 'display'>,
    ResponsiveFlexProps,
    ResponsiveFlexItemProps {
  gap?: number | number[]
}

const Root = memo(
  compose<FlexItemStyleProps & ResponsiveFlexStyleProps>(Box, [
    // flexItem
    __tmp_flexItemStyle,
    responsiveFlexItemStyle,
    // flex
    __tmp_flexStyle,
    responsiveFlexAlignStyle,
    responsiveFlexGapStyle,
    responsiveFlexWrapStyle,
    responsiveFlexJustifyStyle,
    responsiveFlexDirectionStyle,
  ])
)

/**
 * @public
 */
export const Flex = forwardRef(function Flex(
  props: FlexProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'wrap'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {align, as, direction = 'row', gap, justify, wrap, ...restProps} = props

  return (
    <Root
      data-ui="Flex"
      {...restProps}
      $align={useArrayProp(align)}
      $direction={useArrayProp(direction)}
      $gap={useArrayProp(gap)}
      $justify={useArrayProp(justify)}
      $wrap={useArrayProp(wrap)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
