import {forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'
import {_getArrayProp} from '../../styles'
import {
  boxStyle,
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveGridItemStyle,
  ResponsiveGridItemStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'
import {
  ResponsiveBoxProps,
  ResponsiveFlexItemProps,
  ResponsiveGridItemProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
} from '../types'

/**
 * @public
 */
export interface BoxProps
  extends ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  forwardedAs?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps
>(
  boxStyle,
  flexItemStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
)

/**
 * The `Box` component is a basic layout wrapper component which provides utility properties
 * for flex, margins and padding.
 *
 * @public
 */
export const Box = forwardRef(function Box(
  props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    as: asProp = 'div',
    column,
    columnStart,
    columnEnd,
    display = 'block',
    flex,
    height,
    margin = 0,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    overflow,
    padding = 0,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    row,
    rowStart,
    rowEnd,
    sizing,
    ...restProps
  } = props

  const $column = useMemo(() => _getArrayProp(column), [column])
  const $columnStart = useMemo(() => _getArrayProp(columnStart), [columnStart])
  const $columnEnd = useMemo(() => _getArrayProp(columnEnd), [columnEnd])
  const $display = useMemo(() => _getArrayProp(display), [display])
  const $flex = useMemo(() => _getArrayProp(flex), [flex])
  const $height = useMemo(() => _getArrayProp(height), [height])
  const $margin = useMemo(() => _getArrayProp(margin), [margin])
  const $marginX = useMemo(() => _getArrayProp(marginX), [marginX])
  const $marginY = useMemo(() => _getArrayProp(marginY), [marginY])
  const $marginTop = useMemo(() => _getArrayProp(marginTop), [marginTop])
  const $marginRight = useMemo(() => _getArrayProp(marginRight), [marginRight])
  const $marginBottom = useMemo(() => _getArrayProp(marginBottom), [marginBottom])
  const $marginLeft = useMemo(() => _getArrayProp(marginLeft), [marginLeft])
  const $overflow = useMemo(() => _getArrayProp(overflow), [overflow])
  const $padding = useMemo(() => _getArrayProp(padding), [padding])
  const $paddingX = useMemo(() => _getArrayProp(paddingX), [paddingX])
  const $paddingY = useMemo(() => _getArrayProp(paddingY), [paddingY])
  const $paddingTop = useMemo(() => _getArrayProp(paddingTop), [paddingTop])
  const $paddingRight = useMemo(() => _getArrayProp(paddingRight), [paddingRight])
  const $paddingBottom = useMemo(() => _getArrayProp(paddingBottom), [paddingBottom])
  const $paddingLeft = useMemo(() => _getArrayProp(paddingLeft), [paddingLeft])
  const $row = useMemo(() => _getArrayProp(row), [row])
  const $rowStart = useMemo(() => _getArrayProp(rowStart), [rowStart])
  const $rowEnd = useMemo(() => _getArrayProp(rowEnd), [rowEnd])
  const $sizing = useMemo(() => _getArrayProp(sizing), [sizing])

  return (
    <Root
      data-as={typeof asProp === 'string' ? asProp : undefined}
      data-ui="Box"
      {...restProps}
      $column={$column}
      $columnStart={$columnStart}
      $columnEnd={$columnEnd}
      $display={$display}
      $flex={$flex}
      $height={$height}
      $margin={$margin}
      $marginX={$marginX}
      $marginY={$marginY}
      $marginTop={$marginTop}
      $marginRight={$marginRight}
      $marginBottom={$marginBottom}
      $marginLeft={$marginLeft}
      $overflow={$overflow}
      $padding={$padding}
      $paddingX={$paddingX}
      $paddingY={$paddingY}
      $paddingTop={$paddingTop}
      $paddingRight={$paddingRight}
      $paddingBottom={$paddingBottom}
      $paddingLeft={$paddingLeft}
      $row={$row}
      $rowStart={$rowStart}
      $rowEnd={$rowEnd}
      $sizing={$sizing}
      as={asProp}
      ref={ref}
    >
      {props.children}
    </Root>
  )
})
