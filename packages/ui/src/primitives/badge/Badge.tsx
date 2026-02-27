import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {
  badge,
  BADGE_STYLE_PROP_KEYS,
  type BadgeStyleProps,
  type ResponsiveProp,
} from '@sanity/ui/css'
import {Text} from '@sanity/ui/primitives/text'
import type {FontTextSize} from '@sanity/ui/theme'

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
 * Extends {@link BadgeStyleProps} to provide visual styling props such as
 * `mode`, `tone`, and `radius`.
 *
 * @public
 */
export interface BadgeOwnProps extends BadgeStyleProps {
  /**
   * Sets the font size of the badge's text content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   */
  fontSize?: ResponsiveProp<FontTextSize>
}

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
 * Badges are used to tag resources with short, descriptive labels indicating
 * status, category, or other metadata.
 *
 * @public
 */
export function Badge<E extends BadgeElementType = typeof DEFAULT_BADGE_ELEMENT>(
  props: BadgeProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_BADGE_ELEMENT,
      children,
      fontSize = 1,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as BadgeProps<typeof DEFAULT_BADGE_ELEMENT>, BADGE_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Badge" {...domProps} className={badge(styleProps)}>
      <Text as="span" size={fontSize}>
        {children}
      </Text>
    </Element>
  )
}
