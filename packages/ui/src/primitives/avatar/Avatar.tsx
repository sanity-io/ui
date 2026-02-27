import {_getResponsiveProp, _raf, type ComponentType, type Props} from '@sanity/ui/core'
import {
  avatar,
  avatar_arrow,
  avatar_arrowSvg,
  avatar_image,
  avatar_imageOutline,
  avatar_initials,
  type ResponsiveProp,
} from '@sanity/ui/css'
import {Box} from '@sanity/ui/primitives/box'
import {Label} from '@sanity/ui/primitives/label'
import type {AvatarColor, AvatarSize, FontLabelSize} from '@sanity/ui/theme'
import {startTransition, useEffect, useState} from 'react'

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
 * @public
 */
export interface AvatarOwnProps {
  /**
   * When `true`, hides the inner stroke outline on the avatar.
   *
   * @beta Do not use in production.
   */
  __unstable_hideInnerStroke?: boolean

  /**
   * The position from which the arrow indicator should animate.
   *
   * @remarks
   * Used to create a smooth transition when the arrow moves between positions.
   */
  animateArrowFrom?: AvatarPosition

  /**
   * The position of the directional arrow indicator on the avatar.
   */
  arrowPosition?: AvatarPosition

  /**
   * The color of the avatar background.
   */
  color?: AvatarColor

  /**
   * The initials to display when no image source is provided.
   *
   * @remarks
   * Only the first two characters are rendered.
   */
  initials?: string

  /**
   * A callback that fires when the avatar image fails to load.
   */
  onImageLoadError?: (event: Error) => void

  /**
   * The size of the avatar. Supports responsive values.
   */
  size?: ResponsiveProp<AvatarSize>

  /**
   * The URL of the image to display in the avatar.
   *
   * @remarks
   * When the image fails to load, the avatar falls back to displaying initials.
   */
  src?: string

  /**
   * An accessible label for the avatar, rendered as `aria-label` and `title` attributes.
   */
  title?: string
}

/**
 * Accepted values for the `as` prop of the {@link Avatar} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Avatar`.
 * The rendered element receives all applicable HTML attributes for the chosen element type.
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
 * Avatars are used to represent people and other agents (e.g. bots).
 *
 * @remarks
 * The `Avatar` component displays a user image, initials, or a colored
 * placeholder. It supports an optional directional arrow indicator
 * for use in collaborative editing contexts.
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
    initials: initialsProp,
    onImageLoadError,
    arrowPosition: arrowPositionProp,
    animateArrowFrom,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarProps<typeof DEFAULT_AVATAR_ELEMENT>

  const initials = typeof initialsProp === 'string' ? initialsProp.slice(0, 2) : undefined

  const size = _getResponsiveProp(sizeProp)

  const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
    animateArrowFrom || arrowPositionProp || 'inside',
  )

  const [imageError, setImageError] = useState<boolean>(false)

  const handleImageError = () => {
    setImageError(true)

    if (onImageLoadError) {
      onImageLoadError(new Error('Avatar: the image failed to load'))
    }
  }

  const initialsSize = size.map((s) => {
    if (s === 1) return 1 satisfies FontLabelSize
    if (s === 2) return 3 satisfies FontLabelSize
    if (s === 3) return 5 satisfies FontLabelSize

    return 0 satisfies FontLabelSize
  }) as ResponsiveProp<FontLabelSize>

  useEffect(() => {
    if (arrowPosition === arrowPositionProp) return undefined

    // Start animation in the next frame
    return _raf(() => setArrowPosition(arrowPositionProp))
  }, [arrowPosition, arrowPositionProp])

  useEffect(() => {
    if (src) {
      startTransition(() => setImageError(false))
    }
  }, [src])

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
      <span className={avatar_arrow()}>
        <svg className={avatar_arrowSvg()} fill="none" height="7" viewBox="0 0 11 7" width="11">
          <path d="M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z" />
        </svg>
      </span>

      <Box
        alignItems="center"
        as="span"
        className={avatar_initials()}
        display="flex"
        inset={0}
        justifyContent="center"
        overflow="hidden"
        position="absolute"
        radius="full"
      >
        <Label align="center" as="span" size={initialsSize} weight="semibold">
          {initials}
        </Label>
      </Box>

      {src && (
        <Box className={avatar_image()} inset={0} position="absolute">
          <img alt={initials} src={src} onError={handleImageError} />
          <span className={avatar_imageOutline()} />
        </Box>
      )}
    </Element>
  )
}
