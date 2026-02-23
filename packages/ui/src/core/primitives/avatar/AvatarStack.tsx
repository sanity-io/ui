import {avatarStack, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize} from '@sanity/ui/theme'
import {Children, cloneElement, Fragment, isValidElement, type ReactElement} from 'react'

import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {ComponentType, Props} from '../../types'
import {Box, type BoxOwnProps} from '../box/Box'
import type {AvatarProps} from './Avatar'
import {AvatarCounter} from './AvatarCounter'

/**
 * The default HTML element type rendered by the {@link AvatarStack} component.
 *
 * @public
 */
export const DEFAULT_AVATAR_STACK_ELEMENT = 'span'

/**
 * Represents a valid child element of the {@link AvatarStack} component.
 *
 * @remarks
 * Each child must be a React element whose props conform to {@link AvatarProps}
 * with a `"div"` element type, or a falsy value (`null`, `undefined`, `false`)
 * which will be filtered out.
 *
 * @public
 */
export type AvatarStackChild = ReactElement<AvatarProps<'div'>> | null | undefined | false

/**
 * Own props for the {@link AvatarStack} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} (with `align`, `alignItems`, `display`, `justify`,
 * and `justifyContent` omitted, since those are internally managed by the component)
 * to provide layout control alongside avatar-stack-specific properties.
 *
 * Inherited from {@link BoxOwnProps}:
 * - All spacing props: `margin`, `padding`, and per-side variants.
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - Other layout props: `flex`, `gap`, `position`, etc.
 *
 * @public
 */
export type AvatarStackOwnProps = Omit<
  BoxOwnProps,
  'align' | 'alignItems' | 'display' | 'justify' | 'justifyContent'
> & {
  /**
   * The avatar elements to render inside the stack.
   *
   * @remarks
   * Accepts one or more {@link AvatarStackChild} elements. Falsy values
   * (`null`, `undefined`, `false`) are filtered out. Avatars beyond the
   * `maxLength` limit are replaced by an {@link AvatarCounter} that
   * displays the count of hidden avatars.
   *
   * @type {AvatarStackChild | AvatarStackChild[]}
   * @required
   */
  children: AvatarStackChild | AvatarStackChild[]

  /**
   * Sets the maximum number of avatars visible in the stack before
   * the remaining avatars are collapsed into a counter.
   *
   * @remarks
   * When the number of children exceeds `maxLength`, the first
   * `maxLength - 1` avatars from the end of the list are displayed,
   * and an {@link AvatarCounter} is prepended showing the count of
   * the hidden avatars.
   *
   * A value of `0` or less is clamped to `0`, which hides all avatars
   * and only shows the counter.
   *
   * @type {number}
   * @defaultValue 4
   * @optional
   */
  maxLength?: number

  /**
   * Sets the size of all avatars within the stack.
   *
   * @remarks
   * This prop is forwarded to each child {@link Avatar} and the
   * {@link AvatarCounter}, overriding any individually set `size` props.
   * Uses the avatar size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3`
   *
   * @type {ResponsiveProp\<AvatarSize\>}
   * @defaultValue 1
   * @optional
   */
  size?: ResponsiveProp<AvatarSize>
}

/**
 * Accepted values for the `as` prop of the {@link AvatarStack} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `AvatarStack`.
 *
 * Accepted values: `"div"` | `"span"` | `ComponentType`
 *
 * @public
 */
export type AvatarStackElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link AvatarStack} component.
 *
 * @remarks
 * Combines {@link AvatarStackOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<span>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link AvatarStackElementType}.
 *
 * @public
 */
export type AvatarStackProps<E extends AvatarStackElementType = AvatarStackElementType> = Props<
  AvatarStackOwnProps,
  E
>

/**
 * Displays a horizontal stack of {@link Avatar} components with automatic
 * overflow handling via an {@link AvatarCounter}.
 *
 * @remarks
 * The `AvatarStack` component renders a row of avatars. When the number of
 * avatars exceeds the `maxLength`, the overflow is collapsed into a counter
 * badge that displays how many avatars are hidden.
 *
 * The `size` prop is propagated to all child avatars and the counter,
 * ensuring a uniform size across the stack.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"span"` |
 * | `maxLength` | `4` |
 * | `size` | `1` |
 *
 * @public
 */
export function AvatarStack<E extends AvatarStackElementType = typeof DEFAULT_AVATAR_STACK_ELEMENT>(
  props: AvatarStackProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_AVATAR_STACK_ELEMENT,
    children: childrenProp,
    className,
    maxLength: maxLengthProp = 4,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarStackProps<typeof DEFAULT_AVATAR_STACK_ELEMENT>

  const children = Children.toArray(childrenProp).filter(isValidElement) as ReactElement<
    AvatarProps<'span'>
  >[]
  const maxLength = Math.max(maxLengthProp, 0)
  const size = useResponsiveProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <Box
      data-ui="AvatarStack"
      {...rest}
      alignItems="center"
      as={as}
      className={avatarStack({className, size})}
      display="flex"
      justifyContent="flex-start"
    >
      {len === 0 && <AvatarCounter count={len} size={size} />}

      {len !== 0 && extraCount > 1 && <AvatarCounter count={extraCount} size={size} />}

      {visibleChildren.map((child, childIndex) => (
        <Fragment key={String(childIndex)}>{cloneElement(child, {size})}</Fragment>
      ))}
    </Box>
  )
}
