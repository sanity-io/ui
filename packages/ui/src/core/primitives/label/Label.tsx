import {
  label,
  type LabelStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Label} component.
 *
 * @public
 */
export const DEFAULT_LABEL_ELEMENT = 'div'

/**
 * Own props for the {@link Label} component.
 *
 * @remarks
 * Combines {@link LabelStyleProps} and {@link TextOverflowStyleProps} to provide
 * typographic control and text truncation capabilities for label elements.
 *
 * @public
 */
export type LabelOwnProps = LabelStyleProps & TextOverflowStyleProps

/**
 * Accepted values for the `as` prop of the {@link Label} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Label`.
 * Choose an element type that is semantically appropriate for the content.
 *
 * `"div"` | `"h1"` | `"h2"` | `"h3"` | `"h4"` | `"h5"` | `"h6"` |
 * `"label"` | `"li"` | `"p"` | `"span"` | `ComponentType`
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
 * A typographic label component for rendering short descriptive text such as
 * form field labels, section headers, or UI annotations.
 *
 * @remarks
 * The `Label` component renders text using the theme's label typography scale,
 * which is distinct from the body text and heading scales. Label text is typically
 * rendered in uppercase or small-caps depending on the theme, and is designed for
 * short, descriptive content rather than long-form prose.
 *
 * The component wraps its children in a `<span>` element that applies text
 * overflow behavior when the `textOverflow` prop is set.
 *
 * @public
 */
export function Label<E extends LabelElementType = typeof DEFAULT_LABEL_ELEMENT>(
  props: LabelProps<E>,
): React.JSX.Element {
  const {
    align,
    as: Element = DEFAULT_LABEL_ELEMENT,
    children,
    className,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    maxWidth,
    muted = false,
    size = 1,
    textOverflow: textOverflowProp,
    weight = 'regular',
    ...rest
  } = props

  return (
    <Element
      data-ui="Label"
      {...rest}
      className={label({
        className,
        align,
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
