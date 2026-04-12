import {
  heading,
  HEADING_STYLE_PROP_KEYS,
  type HeadingStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui-css'

import {_splitKeys} from '../../core/_keys'
import type {ComponentType, Props} from '../../core/types'

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
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_HEADING_ELEMENT,
      children: childrenProp,
      textOverflow: textOverflowProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as HeadingProps<typeof DEFAULT_HEADING_ELEMENT>, HEADING_STYLE_PROP_KEYS)

  let children = childrenProp

  if (textOverflowProp) {
    children = <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
  }

  return (
    <Element data-ui="Heading" {...domProps} className={heading(styleProps)}>
      {children}
    </Element>
  )
}
