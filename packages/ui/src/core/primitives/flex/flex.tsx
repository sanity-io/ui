import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
} from '../../styles/internal'
import {ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
import {ResponsiveFlexItemProps, ResponsiveFlexProps} from '../types'

/**
 * @public
 */
export interface FlexOwnProps
  extends Omit<BoxOwnProps, 'display'>, ResponsiveFlexProps, ResponsiveFlexItemProps {
  gap?: number | number[]
}

/**
 * @public
 */
export type FlexProps<E extends ElementType = 'div'> = Props<FlexOwnProps, E>

const StyledFlex = styled(Box)<FlexItemStyleProps & ResponsiveFlexStyleProps>(
  flexItemStyle,
  responsiveFlexStyle,
)

const FlexComponent = forwardRef(function Flex(
  props: FlexOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'wrap'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {align, as, direction = 'row', gap, justify, wrap, ...restProps} = props

  return (
    <StyledFlex
      data-ui="Flex"
      {...restProps}
      $align={_getArrayProp(align)}
      $direction={_getArrayProp(direction)}
      $gap={_getArrayProp(gap)}
      $justify={_getArrayProp(justify)}
      $wrap={_getArrayProp(wrap)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
FlexComponent.displayName = 'ForwardRef(Flex)'

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Flex = FlexComponent as unknown as <E extends ElementType = 'div'>(
  props: FlexProps<E>,
) => React.JSX.Element
