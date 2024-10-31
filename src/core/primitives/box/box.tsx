import {
  box,
  BoxStyleProps,
  composeClassNames,
  GapStyleProps,
  InsetStyleProps,
  PositionStyleProps,
} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'

/**
 * @public
 */
export interface BoxProps
  extends BoxStyleProps,
    GapStyleProps,
    InsetStyleProps,
    PositionStyleProps {}

/**
 * The `Box` component is a basic layout wrapper component which provides utility properties
 * for flex, margins and padding.
 *
 * @public
 */
export const Box = forwardRef(function Box(
  props: Props<BoxProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    align,
    as: As = 'div',
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    className,
    column,
    columnStart,
    columnEnd,
    columns,
    direction,
    display = 'block',
    flex,
    gap,
    gapX,
    gapY,
    height,
    inset,
    insetBottom,
    insetLeft,
    insetRight,
    insetTop,
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
    muted,
    radius,
    row,
    rows,
    rowStart,
    rowEnd,
    sizing = 'border',
    width,
    wrap,
    ...restProps
  } = props

  return (
    <As
      data-ui="Box"
      {...restProps}
      className={composeClassNames(
        className,
        box({
          align,
          border,
          borderTop,
          borderRight,
          borderBottom,
          borderLeft,
          column,
          columnStart,
          columnEnd,
          columns,
          direction,
          display,
          flex,
          gap,
          gapX,
          gapY,
          height,
          inset,
          insetBottom,
          insetLeft,
          insetRight,
          insetTop,
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
          muted,
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          pointerEvents,
          position,
          radius,
          row,
          rows,
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
