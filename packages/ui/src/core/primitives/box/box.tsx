import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {boxStyle, responsiveBoxStyle} from '../../styles/box/boxStyle'
import {ResponsiveBoxStyleProps} from '../../styles/box/types'
import {flexItemStyle} from '../../styles/flex/flexItemStyle'
import {FlexItemStyleProps} from '../../styles/flex/types'
import {responsiveGridItemStyle} from '../../styles/grid/gridItemStyle'
import {ResponsiveGridItemStyleProps} from '../../styles/grid/types'
import {_getArrayProp} from '../../styles/helpers'
import {responsiveMarginStyle} from '../../styles/margin/marginStyle'
import {ResponsiveMarginStyleProps} from '../../styles/margin/types'
import {responsivePaddingStyle} from '../../styles/padding/paddingStyle'
import {ResponsivePaddingStyleProps} from '../../styles/padding/types'
import {ElementType, Props} from '../../types/component'
import {
  ResponsiveBoxProps,
  ResponsiveFlexItemProps,
  ResponsiveGridItemProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
} from '../types'

/**
 * The props that `Box` adds on top of the element it renders as.
 *
 * @public
 */
export interface BoxOwnProps
  extends
    ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps {
  forwardedAs?: ElementType
}

/**
 * @public
 */
export type BoxProps<E extends ElementType = 'div'> = Props<BoxOwnProps, E>

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

const BoxComponent = forwardRef(function Box(
  props: BoxOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    as: asProp = 'div',
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
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
    gridRow,
    gridRowStart,
    gridRowEnd,
    sizing,
    ...restProps
  } = props

  return (
    <StyledBox
      data-as={typeof asProp === 'string' ? asProp : undefined}
      data-ui="Box"
      {...restProps}
      $column={_getArrayProp(gridColumn)}
      $columnStart={_getArrayProp(gridColumnStart)}
      $columnEnd={_getArrayProp(gridColumnEnd)}
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
      $row={_getArrayProp(gridRow)}
      $rowStart={_getArrayProp(gridRowStart)}
      $rowEnd={_getArrayProp(gridRowEnd)}
      $sizing={_getArrayProp(sizing)}
      as={asProp}
      ref={ref}
    >
      {props.children}
    </StyledBox>
  )
})

/**
 * The `Box` component is a basic layout wrapper component which provides utility properties
 * for flex, margins and padding.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Box = BoxComponent as unknown as <E extends ElementType = 'div'>(
  props: BoxProps<E>,
) => React.JSX.Element
