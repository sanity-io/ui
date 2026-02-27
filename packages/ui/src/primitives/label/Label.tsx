import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {
  label,
  LABEL_STYLE_PROP_KEYS,
  type LabelStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link Label} component.
 *
 * @public
 */
export const DEFAULT_LABEL_ELEMENT = 'div'

/**
 * Style props for the {@link Label} component.
 *
 * @remarks
 * Combines {@link LabelStyleProps} and {@link TextOverflowStyleProps} to provide
 * label-specific typography styling and text overflow behavior.
 *
 * @public
 */
export type LabelOwnProps = LabelStyleProps & TextOverflowStyleProps

/**
 * Accepted values for the `as` prop of the {@link Label} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Label`.
 * The rendered element receives all applicable HTML attributes for the chosen
 * element type in addition to the Label's own style props.
 *
 * @public
 */
export type LabelElementType =
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
  | ComponentType

/**
 * Props for the {@link Label} component.
 *
 * @remarks
 * Combines {@link LabelOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link LabelElementType}.
 *
 * @public
 */
export type LabelProps<E extends LabelElementType = LabelElementType> = Props<LabelOwnProps, E>

/**
 * A themed typographic element for rendering UI labels such as form field
 * labels, section headings, and other short descriptor text.
 *
 * @remarks
 * The `Label` component renders a single HTML element (default `<div>`) styled
 * with the theme's label typography scale. It is typically used for small,
 * uppercase or semi-bold text that accompanies form controls or sections.
 *
 * @public
 */
export function Label<E extends LabelElementType = typeof DEFAULT_LABEL_ELEMENT>(
  props: LabelProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_LABEL_ELEMENT,
      children: childrenProp,
      textOverflow: textOverflowProp,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as LabelProps<typeof DEFAULT_LABEL_ELEMENT>, LABEL_STYLE_PROP_KEYS)

  let children = childrenProp

  if (textOverflowProp) {
    children = <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
  }

  return (
    <Element data-ui="Label" {...domProps} className={label(styleProps)}>
      {children}
    </Element>
  )
}
