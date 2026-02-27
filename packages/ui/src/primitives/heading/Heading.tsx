import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {
  heading,
  HEADING_STYLE_PROP_KEYS,
  type HeadingStyleProps,
  type TextOverflow,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link Heading} component.
 *
 * @public
 */
export const DEFAULT_HEADING_ELEMENT = 'div'

/**
 * Style props for the {@link Heading} component.
 *
 * @remarks
 * Combines {@link HeadingStyleProps} and {@link TextOverflowStyleProps} to provide
 * heading-specific typography styling and text overflow behavior.
 *
 * @public
 */
export type HeadingOwnProps = HeadingStyleProps &
  TextOverflowStyleProps & {
    /**
     * Controls how overflowing text is treated within the heading.
     */
    textOverflow?: TextOverflow
  }

/**
 * Accepted values for the `as` prop of the {@link Heading} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Heading`.
 * The rendered element receives all applicable HTML attributes for the chosen
 * element type in addition to the Heading's own style props.
 *
 * @public
 */
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

/**
 * Props for the {@link Heading} component.
 *
 * @remarks
 * Combines {@link HeadingOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link HeadingElementType}.
 *
 * @public
 */
export type HeadingProps<E extends HeadingElementType = HeadingElementType> = Props<
  HeadingOwnProps,
  E
>

/**
 * A themed typographic element for rendering headings at various sizes
 * within the theme's heading typography scale.
 *
 * @remarks
 * The `Heading` component renders a single HTML element (default `<div>`) styled
 * with the theme's heading typography scale. Use the `as` prop to render
 * semantically appropriate heading elements (`h1`–`h6`).
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
