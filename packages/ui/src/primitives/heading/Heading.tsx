import {
  heading,
  type HeadingStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_HEADING_ELEMENT = 'div'

/** @public */
export type HeadingOwnProps = HeadingStyleProps & TextOverflowStyleProps

/** @public */
export type HeadingElementType =
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'span'
  | ComponentType

/** @public */
export type HeadingProps<E extends HeadingElementType = HeadingElementType> = Props<
  HeadingOwnProps,
  E
>

/**
 * Typographic headings.
 *
 * @public
 */
export function Heading<E extends HeadingElementType = typeof DEFAULT_HEADING_ELEMENT>(
  props: HeadingProps<E>,
): React.JSX.Element {
  const {
    align,
    as: Element = DEFAULT_HEADING_ELEMENT,
    children,
    className,
    flex,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    muted = false,
    size = 2,
    textOverflow: textOverflowProp,
    weight = 'regular',
    ...rest
  } = props as HeadingProps<typeof DEFAULT_HEADING_ELEMENT>

  return (
    <Element
      data-ui="Heading"
      {...rest}
      className={heading({
        className,
        align,
        flex,
        margin,
        marginX,
        marginY,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        maxWidth,
        muted,
        size,
        weight,
      })}
    >
      <span
        className={textOverflow({
          textOverflow: textOverflowProp,
        })}
      >
        {children}
      </span>
    </Element>
  )
}
