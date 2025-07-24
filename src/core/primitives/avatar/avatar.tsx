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

import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/box'
import {Label} from '../label/label'
import type {AvatarPosition} from './types'

/** @public */
export const DEFAULT_AVATAR_ELEMENT = 'span'

/** @public */
export interface AvatarOwnProps {
  /** @beta */
  __unstable_hideInnerStroke?: boolean
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
  color?: AvatarColor
  initials?: string
  onImageLoadError?: (event: Error) => void
  size?: ResponsiveProp<AvatarSize>
  src?: string
  title?: string
}

/** @public */
export type AvatarElementType = 'a' | 'button' | 'div' | 'span' | ComponentType

/** @public */
export type AvatarProps<E extends AvatarElementType = AvatarElementType> = Props<AvatarOwnProps, E>

/**
 * Avatars are used to represent people and other agents (e.g. bots).
 *
 * @public
 */
export function Avatar<E extends AvatarElementType = typeof DEFAULT_AVATAR_ELEMENT>(
  props: AvatarProps<E>,
): React.JSX.Element {
  const {
    __unstable_hideInnerStroke,
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

  const size = useResponsiveProp(sizeProp)

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
      data-hide-inner-stroke={__unstable_hideInnerStroke ? '' : undefined}
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
