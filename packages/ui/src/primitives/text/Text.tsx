import {
  text,
  TEXT_STYLE_PROP_KEYS,
  textOverflow,
  type TextOverflowStyleProps,
  type TextStyleProps,
} from '@sanity/ui-css'

import {_splitKeys} from '../../core/_keys'
import type {ComponentType, Props} from '../../core/types'

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
  const [
    styleProps,
    {
      as: Element = DEFAULT_TEXT_ELEMENT,
      children: childrenProp,
      textOverflow: textOverflowProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as TextProps<typeof DEFAULT_TEXT_ELEMENT>, TEXT_STYLE_PROP_KEYS)

  let children = childrenProp

  if (textOverflowProp) {
    children = <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
  }

  return (
    <Element data-ui="Text" {...domProps} className={text(styleProps)}>
      {children}
    </Element>
  )
}
