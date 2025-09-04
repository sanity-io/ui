import {text, textOverflow, type TextOverflowStyleProps, type TextStyleProps} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_TEXT_ELEMENT = 'div'

/** @public */
export type TextOwnProps = TextStyleProps & TextOverflowStyleProps

/** @public */
export type TextElementType =
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'li'
  | 'p'
  | 'span'
  | 'summary'
  | 'time'
  | ComponentType

/** @public */
export type TextProps<E extends TextElementType = TextElementType> = Props<TextOwnProps, E>

/**
 * The `Text` component is an agile, themed typographic element.
 *
 * @public
 */
export function Text<E extends TextElementType = typeof DEFAULT_TEXT_ELEMENT>(
  props: TextProps<E>,
): React.JSX.Element {
  const {
    align,
    as: Element = DEFAULT_TEXT_ELEMENT,
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
    maxWidth = 'fill',
    muted,
    size = 2,
    textOverflow: textOverflowProp,
    weight = 'regular',
    ...rest
  } = props as TextProps<typeof DEFAULT_TEXT_ELEMENT>

  return (
    <Element
      data-ui="Text"
      {...rest}
      className={text({
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
