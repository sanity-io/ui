import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {
  heading,
  HEADING_STYLE_PROP_KEYS,
  type HeadingStyleProps,
  type TextOverflow,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

/** @public */
export const DEFAULT_HEADING_ELEMENT = 'div'

/** @public */
export type HeadingOwnProps = HeadingStyleProps &
  TextOverflowStyleProps & {
    textOverflow?: TextOverflow
  }

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
      children,
      textOverflow: textOverflowProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as HeadingProps<typeof DEFAULT_HEADING_ELEMENT>, HEADING_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Heading" {...domProps} className={heading(styleProps)}>
      <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
    </Element>
  )
}
