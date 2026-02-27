import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {box, BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link Box} component.
 *
 * @public
 */
export const DEFAULT_BOX_ELEMENT = 'div'

/**
 * Style props for the {@link Box} component.
 *
 * @remarks
 * Inherits all properties from {@link BoxStyleProps}, which provides a comprehensive set of
 * CSS utility style props for layout, spacing, sizing, positioning, and visual treatment.
 *
 * @public
 */
export type BoxOwnProps = BoxStyleProps

/**
 * Accepted values for the `as` prop of the {@link Box} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Box`.
 * The rendered element receives all applicable HTML attributes for the chosen element type
 * in addition to the Box's own style props.
 *
 * @public
 */
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

/**
 * Props for the {@link Box} component.
 *
 * @remarks
 * Combines {@link BoxOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render.
 *
 * @public
 */
export type BoxProps<E extends BoxElementType = BoxElementType> = Props<BoxOwnProps, E>

/**
 * The `Box` component is a foundational layout primitive that provides utility properties
 * for display, flex, grid, margins, padding, sizing, positioning, and visual treatment.
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
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as BoxProps<typeof DEFAULT_BOX_ELEMENT>, BOX_STYLE_PROP_KEYS)

  // const  = domProps

  return (
    <Element data-ui="Box" {...domProps} className={box(styleProps)}>
      {children}
    </Element>
  )
}
