import {
  avatar,
  avatarArrow,
  avatarImage,
  avatarImageOutline,
  avatarInitials,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {AvatarColor, AvatarSize, FontLabelSize} from '@sanity/ui/theme'
import {useCallback, useEffect, useMemo, useState} from 'react'

import {_getResponsiveProp} from '../../helpers/props'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import type {AvatarPosition} from './types'

/**
 * The default HTML element type rendered by the {@link Avatar} component.
 *
 * @public
 */
export const DEFAULT_AVATAR_ELEMENT = 'span'

/**
 * Own props for the {@link Avatar} component.
 *
 * @remarks
 * Defines the configuration for rendering an avatar, including its image source,
 * initials fallback, color, size, and optional directional arrow indicator.
 *
 * @public
 */
export interface AvatarOwnProps {
  /**
   * When `true`, hides the inner stroke ring rendered inside the avatar circle.
   *
   * @beta Do not use in production.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  __unstable_hideInnerStroke?: boolean

  /**
   * Sets the initial position from which the arrow indicator animates.
   *
   * @remarks
   * When specified, the arrow animates from this position to the value of
   * `arrowPosition` on mount.
   *
   * Accepted values: `"top"` | `"bottom"` | `"inside"`
   *
   * @type {AvatarPosition}
   * @defaultValue undefined
   * @optional
   */
  animateArrowFrom?: AvatarPosition

  /**
   * Controls the position of the directional arrow indicator on the avatar.
   *
   * @remarks
   * When set, renders a small triangular arrow pointing outward from the avatar
   * at the specified position.
   *
   * Accepted values:
   * - `"top"` – Renders the arrow above the avatar.
   * - `"bottom"` – Renders the arrow below the avatar.
   * - `"inside"` – Hides the arrow inside the avatar (not visible).
   *
   * @type {AvatarPosition}
   * @defaultValue undefined
   * @optional
   */
  arrowPosition?: AvatarPosition

  /**
   * Sets the background color of the avatar when no image is provided or the image fails to load.
   *
   * @remarks
   * Uses a predefined set of color tokens from the theme.
   *
   * Accepted values:
   * `"gray"` | `"blue"` | `"purple"` | `"magenta"` | `"red"` | `"orange"` | `"yellow"` | `"green"` | `"cyan"`
   *
   * @type {AvatarColor}
   * @defaultValue `"magenta"`
   * @optional
   */
  color?: AvatarColor

  /**
   * The initials to display inside the avatar when no image is provided
   * or the image fails to load.
   *
   * @remarks
   * Typically one or two characters representing the user's name (e.g. `"AB"`).
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  initials?: string

  /**
   * Callback invoked when the avatar image fails to load.
   *
   * @remarks
   * Receives an `Error` object with the message `"Avatar: the image failed to load"`.
   * When an image load error occurs, the avatar falls back to rendering the `initials`.
   *
   * @type {(event: Error) => void}
   * @defaultValue undefined
   * @optional
   */
  onImageLoadError?: (event: Error) => void

  /**
   * Sets the size of the avatar.
   *
   * @remarks
   * Uses the avatar size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3`
   *
   * - `0` – Extra-small avatar.
   * - `1` – Small avatar (default).
   * - `2` – Medium avatar.
   * - `3` – Large avatar.
   *
   * @type {ResponsiveProp\<AvatarSize\>}
   * @defaultValue 1
   * @optional
   */
  size?: ResponsiveProp<AvatarSize>

  /**
   * The URL of the image to display in the avatar.
   *
   * @remarks
   * When provided and loaded successfully, the image is rendered inside the
   * avatar circle. If the image fails to load, the avatar falls back to
   * displaying the `initials`.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  src?: string

  /**
   * An accessible title for the avatar, used as the `aria-label` and `title` attributes.
   *
   * @remarks
   * Provides a text description of the avatar for assistive technologies and
   * browser tooltip display on hover.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  title?: string
}

/**
 * Accepted values for the `as` prop of the {@link Avatar} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Avatar`.
 *
 * Accepted values: `"a"` | `"button"` | `"div"` | `"span"` | `ComponentType`
 *
 * @public
 */
export type AvatarElementType = 'a' | 'button' | 'div' | 'span' | ComponentType

/**
 * Props for the {@link Avatar} component.
 *
 * @remarks
 * Combines {@link AvatarOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<span>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link AvatarElementType}.
 *
 * @public
 */
export type AvatarProps<E extends AvatarElementType = AvatarElementType> = Props<AvatarOwnProps, E>

/**
 * Avatars represent people and other agents (e.g. bots).
 *
 * @remarks
 * The `Avatar` component renders a circular element that can display either an image
 * (via the `src` prop) or initials (via the `initials` prop) as a fallback.
 * An optional directional arrow indicator can be shown via the `arrowPosition` prop.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"span"` |
 * | `color` | `"magenta"` |
 * | `size` | `1` |
 *
 * @public
 */
export function Avatar<E extends AvatarElementType = typeof DEFAULT_AVATAR_ELEMENT>(
  props: AvatarProps<E>,
): React.JSX.Element {
  const {
    __unstable_hideInnerStroke: hideInnerStroke,
    as: Element = DEFAULT_AVATAR_ELEMENT,
    className,
    color = 'magenta',
    src,
    title,
    initials,
    onImageLoadError,
    arrowPosition: arrowPositionProp,
    animateArrowFrom,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarProps<typeof DEFAULT_AVATAR_ELEMENT>

  const size = useMemo(() => _getResponsiveProp(sizeProp), [sizeProp])

  const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
    animateArrowFrom || arrowPositionProp || 'inside',
  )

  const [imageError, setImageError] = useState<boolean>(false)

  useEffect(() => {
    if (arrowPosition === arrowPositionProp) return undefined

    // Start animation in the next frame
    const raf = requestAnimationFrame(() => setArrowPosition(arrowPositionProp))

    return () => cancelAnimationFrame(raf)
  }, [arrowPosition, arrowPositionProp])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (src) setImageError(false)
  }, [src])

  const handleImageError = useCallback(() => {
    setImageError(true)

    if (onImageLoadError) {
      onImageLoadError(new Error('Avatar: the image failed to load'))
    }
  }, [onImageLoadError])

  const initialsSize = useMemo(
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
    <Element
      data-hide-inner-stroke={hideInnerStroke ? '' : undefined}
      data-ui="Avatar"
      {...rest}
      aria-label={title}
      className={avatar({className, color, size: sizeProp})}
      data-arrow-position={arrowPosition}
      data-image-error={imageError ? '' : undefined}
      title={title}
    >
      <span className={avatarArrow()}>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path
            d="M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z"
            fill={color}
          />
        </svg>
      </span>

      <Box
        alignItems="center"
        as="span"
        className={avatarInitials()}
        display="flex"
        justifyContent="center"
        position="absolute"
        inset={0}
      >
        <Label align="center" as="span" size={initialsSize} weight="medium">
          {initials}
        </Label>
      </Box>

      {src && (
        <Box className={avatarImage()} inset={0} position="absolute">
          <img alt={initials} onError={handleImageError} src={src} />
          <span className={avatarImageOutline()} />
        </Box>
      )}
    </Element>
  )
}
