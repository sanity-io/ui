import {
  heading,
  type HeadingStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Heading} component.
 *
 * @public
 */
export const DEFAULT_HEADING_ELEMENT = 'div'

/**
 * Own props for the {@link Heading} component.
 *
 * @remarks
 * Extends {@link HeadingStyleProps} and {@link TextOverflowStyleProps} to provide
 * typographic control over heading elements.
 *
 * @public
 */
export type HeadingOwnProps = HeadingStyleProps & TextOverflowStyleProps

/**
 * Accepted values for the `as` prop of the {@link Heading} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Heading`.
 * The rendered element receives all applicable HTML attributes for the chosen element type.
 *
 * `"div"` | `"h1"` | `"h2"` | `"h3"` | `"h4"` | `"h5"` | `"h6"` | `"label"` | `"span"` | `ComponentType`
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
 * A typographic heading component for rendering themed heading text.
 *
 * @remarks
 * The `Heading` component renders text using the theme's heading typography scale.
 * It supports multiple heading levels via the `as` prop (e.g. `"h1"` through `"h6"`),
 * responsive font sizing via `size`, font weight via `weight`, text overflow handling
 * via `textOverflow`, and muted/aligned text rendering.
 *
 * The heading text is wrapped in an inner `<span>` element to support the
 * `textOverflow` behavior.
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
