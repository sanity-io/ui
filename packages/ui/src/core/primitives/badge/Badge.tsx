import {
  badge,
  type BadgeStyleProps,
  type FlexStyleProps,
  type PaddingStyleProps,
  type RadiusStyleProps,
} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Text} from '../text/Text'

/**
 * The default HTML element type rendered by the {@link Badge} component.
 *
 * @public
 */
export const DEFAULT_BADGE_ELEMENT = 'span'

/**
 * Own props for the {@link Badge} component.
 *
 * @remarks
 * Extends {@link BadgeStyleProps}, {@link FlexStyleProps}, {@link PaddingStyleProps},
 * and {@link RadiusStyleProps} to combine badge-specific visual styling with
 * layout capabilities.
 *
 * @public
 */
export type BadgeOwnProps = BadgeStyleProps & FlexStyleProps & PaddingStyleProps & RadiusStyleProps

/**
 * Accepted values for the `as` prop of the {@link Badge} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Badge`.
 *
 * @public
 */
export type BadgeElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Badge} component.
 *
 * @remarks
 * Combines {@link BadgeOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<span>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link BadgeElementType}.
 *
 * @public
 */
export type BadgeProps<E extends BadgeElementType = BadgeElementType> = Props<BadgeOwnProps, E>

/**
 * Badges are used to tag resources with short, descriptive labels.
 *
 * @remarks
 * The `Badge` component renders a small inline element containing a text label,
 * styled with a background color and text color determined by the `tone` prop.
 * It is typically used to categorize, label, or add metadata to other UI elements.
 *
 * The badge wraps its `children` in a {@link Text} component and constrains its
 * width to the minimum content size (`width: min`), with a maximum width of
 * `fill` to prevent overflow beyond its parent container.
 *
 * @public
 */
export function Badge<E extends BadgeElementType = typeof DEFAULT_BADGE_ELEMENT>(
  props: BadgeProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_BADGE_ELEMENT,
    children,
    className,
    flex = 'none',
    fontSize = 1,
    padding = 1,
    radius = 2,
    tone = 'default',
    ...rest
  } = props as BadgeProps<typeof DEFAULT_BADGE_ELEMENT>

  return (
    <Box
      data-ui="Badge"
      {...rest}
      as={as}
      className={badge({className, tone})}
      flex={flex}
      display="flex"
      maxWidth="fill"
      padding={padding}
      radius={radius}
      width="min"
    >
      <Text size={fontSize}>{children}</Text>
    </Box>
  )
}
