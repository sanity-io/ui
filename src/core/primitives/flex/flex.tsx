import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveFlexItemProps, ResponsiveFlexProps} from '../types'

/**
 * @public
 */
export interface FlexProps
  extends Omit<BoxProps, 'display'>,
    ResponsiveFlexProps,
    ResponsiveFlexItemProps {
  gap?: number | number[]
}

const StyledFlex = styled(Box)<FlexItemStyleProps & ResponsiveFlexStyleProps>(
  flexItemStyle,
  responsiveFlexStyle,
)

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
export const Flex = forwardRef(function Flex(
  props: FlexProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'wrap'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {align, as, direction = 'row', gap, justify, wrap, ...restProps} = props

  return (
    <StyledFlex
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
Flex.displayName = 'ForwardRef(Flex)'
