import {forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'
import {_getArrayProp} from '../../styles'
import {
  flexItemStyle,
  FlexItemStyleProps,
  responsiveFlexStyle,
  ResponsiveFlexStyleProps,
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

const Root = styled(Box)<FlexItemStyleProps & ResponsiveFlexStyleProps>(
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

  const $align = useMemo(() => _getArrayProp(align), [align])
  const $direction = useMemo(() => _getArrayProp(direction), [direction])
  const $gap = useMemo(() => _getArrayProp(gap), [gap])
  const $justify = useMemo(() => _getArrayProp(justify), [justify])
  const $wrap = useMemo(() => _getArrayProp(wrap), [wrap])

  return (
    <Root
      data-ui="Flex"
      {...restProps}
      $align={$align}
      $direction={$direction}
      $gap={$gap}
      $justify={$justify}
      $wrap={$wrap}
      forwardedAs={as}
      ref={ref}
    />
  )
})
