import {box, type BoxStyleProps} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_BOX_ELEMENT = 'div'

/** @public */
export type BoxOwnProps = BoxStyleProps

/** @public */
export type BoxElementType =
  | 'a'
  | 'article'
  | 'aside'
  | 'blockquote'
  | 'body'
  | 'button'
  | 'details'
  | 'div'
  | 'header'
  | 'fieldset'
  | 'figure'
  | 'figcaption'
  | 'footer'
  | 'form'
  | 'html'
  | 'iframe'
  | 'kbd'
  | 'label'
  | 'legend'
  | 'li'
  | 'main'
  | 'nav'
  | 'ol'
  | 'pre'
  | 'section'
  | 'span'
  | 'summary'
  | 'table'
  | 'tbody'
  | 'td'
  | 'tfoot'
  | 'th'
  | 'thead'
  | 'tr'
  | 'ul'
  | ComponentType

/** @public */
export type BoxProps<E extends BoxElementType = BoxElementType> = Props<BoxOwnProps, E>

/**
 * The `Box` component is a basic layout wrapper component which provides utility properties
 * for flex, margins and padding.
 *
 * @public
 */
export function Box<E extends BoxElementType = typeof DEFAULT_BOX_ELEMENT>(
  props: BoxProps<E>,
): React.JSX.Element {
  const {
    alignItems,
    as: Element = DEFAULT_BOX_ELEMENT,
    // autoCols,
    // autoFlow,
    // autoRows,
    border = false,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    className,
    children,
    // column,
    // columnStart,
    // columnEnd,
    // columns,
    display = 'block',
    flex,
    flexDirection,
    flexWrap,
    gap,
    gapX,
    gapY,
    gridAutoColumns,
    gridAutoFlow,
    gridAutoRows,
    gridColumn,
    gridColumnEnd,
    gridColumnStart,
    gridRow,
    gridRowEnd,
    gridRowStart,
    gridTemplateColumns,
    gridTemplateRows,
    height,
    inset,
    insetBottom,
    insetLeft,
    insetRight,
    insetTop,
    justifyContent,
    margin = 0,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    minHeight = 0,
    minWidth = 0,
    muted,
    outline,
    overflow,
    overflowX,
    overflowY,
    padding = 0,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    pointerEvents,
    position,
    radius,
    // row,
    // rows,
    // rowStart,
    // rowEnd,
    shadow,
    sizing = 'border',
    textAlign,
    width,
    ...rest
  } = props as BoxProps<typeof DEFAULT_BOX_ELEMENT>

  return (
    <Element
      data-ui="Box"
      {...rest}
      className={box({
        className,
        alignItems,
        // autoCols,
        // autoFlow,
        // autoRows,
        border,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        // column,
        // columnStart,
        // columnEnd,
        // columns,
        display,
        flex,
        flexDirection,
        flexWrap,
        gap,
        gapX,
        gapY,
        gridAutoColumns,
        gridAutoFlow,
        gridAutoRows,
        gridColumn,
        gridColumnEnd,
        gridColumnStart,
        gridRow,
        gridRowEnd,
        gridRowStart,
        gridTemplateColumns,
        gridTemplateRows,
        height,
        inset,
        insetBottom,
        insetLeft,
        insetRight,
        insetTop,
        justifyContent,
        margin,
        marginX,
        marginY,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        maxWidth,
        minHeight,
        minWidth,
        muted,
        outline,
        overflow,
        overflowX,
        overflowY,
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
        // row,
        // rows,
        // rowStart,
        // rowEnd,
        shadow,
        sizing,
        textAlign,
        width,
      })}
    >
      {children}
    </Element>
  )
}
