import {forwardRef} from 'react'
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
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
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
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  forwardedAs?: React.ElementType | keyof React.JSX.IntrinsicElements
}

const StyledBox = styled.div<
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

  return (
    <StyledBox
      data-as={typeof asProp === 'string' ? asProp : undefined}
      data-ui="Box"
      {...restProps}
      $column={_getArrayProp(column)}
      $columnStart={_getArrayProp(columnStart)}
      $columnEnd={_getArrayProp(columnEnd)}
      $display={_getArrayProp(display)}
      $flex={_getArrayProp(flex)}
      $height={_getArrayProp(height)}
      $margin={_getArrayProp(margin)}
      $marginX={_getArrayProp(marginX)}
      $marginY={_getArrayProp(marginY)}
      $marginTop={_getArrayProp(marginTop)}
      $marginRight={_getArrayProp(marginRight)}
      $marginBottom={_getArrayProp(marginBottom)}
      $marginLeft={_getArrayProp(marginLeft)}
      $overflow={_getArrayProp(overflow)}
      $padding={_getArrayProp(padding)}
      $paddingX={_getArrayProp(paddingX)}
      $paddingY={_getArrayProp(paddingY)}
      $paddingTop={_getArrayProp(paddingTop)}
      $paddingRight={_getArrayProp(paddingRight)}
      $paddingBottom={_getArrayProp(paddingBottom)}
      $paddingLeft={_getArrayProp(paddingLeft)}
      $row={_getArrayProp(row)}
      $rowStart={_getArrayProp(rowStart)}
      $rowEnd={_getArrayProp(rowEnd)}
      $sizing={_getArrayProp(sizing)}
      as={asProp}
      ref={ref}
    >
      {props.children}
    </StyledBox>
  )
})
Box.displayName = 'ForwardRef(Box)'
