import {box, BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '@sanity/ui/css'

import {_splitKeys} from '../../core/_keys'
import type {ComponentType, Props} from '../../core/types'

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
  const [
    styleProps,
    {
      as: Element = DEFAULT_BOX_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as BoxProps<typeof DEFAULT_BOX_ELEMENT>, BOX_STYLE_PROP_KEYS)

  return <Element data-ui="Box" {...domProps} className={box(styleProps)} />
}
