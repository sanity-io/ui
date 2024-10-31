import {box, BoxStyleProps, composeClassNames, PositionStyleProps} from '@sanity/ui/css'
import {GapStyleProps} from '@sanity/ui/css'
import {forwardRef} from 'react'

/**
 * @public
 */
export interface BoxProps extends BoxStyleProps, GapStyleProps, PositionStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  forwardedAs?: React.ElementType | keyof JSX.IntrinsicElements
}

/**
 * The `Box` component is a basic layout wrapper component which provides utility properties
 * for flex, margins and padding.
 *
 * @public
 */
export const Box = forwardRef(function Box(
  props: BoxProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows' | 'wrap' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    align,
    as: As = 'div',
    className,
    column,
    columnStart,
    columnEnd,
    direction,
    display = 'block',
    flex,
    gap,
    gapX,
    gapY,
    height,
    inset,
    justify,
    margin = 0,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    overflow,
    padding = 0,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    pointerEvents,
    position,
    row,
    rowStart,
    rowEnd,
    sizing,
    width,
    wrap,
    ...restProps
  } = props

  return (
    <As
      data-as={typeof As === 'string' ? As : undefined}
      data-ui="Box"
      {...restProps}
      className={composeClassNames(
        className,
        box({
          align,
          column,
          columnStart,
          columnEnd,
          direction,
          display,
          flex,
          gap,
          gapX,
          gapY,
          height,
          inset,
          justify,
          overflow,
          margin,
          marginX,
          marginY,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          maxWidth,
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          pointerEvents,
          position,
          row,
          rowStart,
          rowEnd,
          sizing,
          width,
          wrap,
        }),
      )}
      ref={ref}
    >
      {props.children}
    </As>
  )
})

Box.displayName = 'ForwardRef(Box)'
