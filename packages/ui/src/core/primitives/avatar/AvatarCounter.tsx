import {avatarCounter, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize, FontLabelSize} from '@sanity/ui/theme'
import {useMemo} from 'react'

import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Label} from '../label/Label'

/**
 * The default HTML element type rendered by the {@link AvatarCounter} component.
 *
 * @public
 */
export const DEFAULT_AVATAR_COUNTER_ELEMENT = 'span'

/**
 * Own props for the {@link AvatarCounter} component.
 *
 * @remarks
 * Defines the configuration for rendering a numeric counter that indicates
 * the number of additional avatars not shown in an {@link AvatarStack}.
 *
 * @public
 */
export interface AvatarCounterOwnProps {
  /**
   * The number to display inside the counter.
   *
   * @remarks
   * Typically represents the count of additional avatars that are not
   * individually visible within an {@link AvatarStack} due to the `maxLength`
   * constraint.
   *
   * @type {number}
   * @required
   */
  count: number

  /**
   * Sets the size of the avatar counter, matching the avatar size scale.
   *
   * @remarks
   * Uses the avatar size scale defined by the theme. Supports responsive values.
   * Should match the `size` of the sibling {@link Avatar} components for
   * consistent visual alignment within an {@link AvatarStack}.
   *
   * Accepted values: `0 | 1 | 2 | 3`
   *
   * - `0` – Extra-small size.
   * - `1` – Small size (default).
   * - `2` – Medium size.
   * - `3` – Large size.
   *
   * @type {ResponsiveProp\<AvatarSize\>}
   * @defaultValue 1
   * @optional
   */
  size?: ResponsiveProp<AvatarSize>
}

/**
 * Accepted values for the `as` prop of the {@link AvatarCounter} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `AvatarCounter`.
 *
 * Accepted values: `"button"` | `"div"` | `"span"` | `ComponentType`
 *
 * @public
 */
export type AvatarCounterElementType = 'button' | 'div' | 'span' | ComponentType

/**
 * Props for the {@link AvatarCounter} component.
 *
 * @remarks
 * Combines {@link AvatarCounterOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<span>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link AvatarCounterElementType}.
 *
 * @public
 */
export type AvatarCounterProps<E extends AvatarCounterElementType = AvatarCounterElementType> =
  Props<AvatarCounterOwnProps, E>

/**
 * Displays a numeric count indicating the number of additional avatars
 * not individually rendered within an {@link AvatarStack}.
 *
 * @remarks
 * The `AvatarCounter` component is typically used internally by {@link AvatarStack}
 * to show a `+N` style indicator when the number of avatars exceeds the
 * `maxLength` threshold. It can also be used standalone.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"span"` |
 * | `size` | `1` |
 *
 * @public
 */
export function AvatarCounter<
  E extends AvatarCounterElementType = typeof DEFAULT_AVATAR_COUNTER_ELEMENT,
>(props: AvatarCounterProps<E>): React.JSX.Element {
  const {
    as = DEFAULT_AVATAR_COUNTER_ELEMENT,
    className,
    count,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarCounterProps<typeof DEFAULT_AVATAR_COUNTER_ELEMENT>
  const size = useResponsiveProp(sizeProp)

  const labelSize = useMemo(
    () =>
      Object.values(size).map((s) => {
        if (s === 1) return 1 satisfies FontLabelSize
        if (s === 2) return 3 satisfies FontLabelSize
        if (s === 3) return 5 satisfies FontLabelSize

        return 0 satisfies FontLabelSize
      }) as ResponsiveProp<FontLabelSize>,
    [size],
  )

  return (
    <Box
      data-ui="AvatarCounter"
      {...rest}
      alignItems="center"
      as={as}
      className={avatarCounter({className, size})}
      display="flex"
      flex="none"
      justifyContent="center"
      paddingX={2}
      sizing="border"
    >
      <Label align="center" as="span" size={labelSize} weight="medium">
        {count}
      </Label>
    </Box>
  )
}
