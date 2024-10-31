import {
  _composeClassNames,
  avatar,
  avatarArrow,
  avatarImage,
  avatarInitials,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {AvatarColor} from '@sanity/ui/theme'
import {useCallback, useEffect, useMemo, useState} from 'react'

import {useArrayProp} from '../../hooks'
import type {AvatarPosition, AvatarSize, AvatarStatus, ComponentType, Props} from '../../types'
import {Box} from '../box'
import {Label} from '../label'

/** @public */
export const DEFAULT_AVATAR_ELEMENT = 'div'

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
  /**
   * The status of the entity this Avatar represents.
   * @deprecated Will be removed in next major version.
   */
  status?: AvatarStatus
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
) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status = 'online',
    size: sizeProp = 1,
    ...rest
  } = props as AvatarProps<typeof DEFAULT_AVATAR_ELEMENT>

  const size = useArrayProp(sizeProp)

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
      size.map((s) => {
        if (s === 1) return 1
        if (s === 2) return 3
        if (s === 3) return 5

        return 0
      }),
    [size],
  )

  return (
    <Element
      data-hide-inner-stroke={__unstable_hideInnerStroke ? '' : undefined}
      data-ui="Avatar"
      {...rest}
      aria-label={title}
      className={_composeClassNames(className, avatar({color, size: sizeProp}))}
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
        align="center"
        as="span"
        className={avatarInitials()}
        display="flex"
        justify="center"
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
          <span />
        </Box>
      )}
    </Element>
  )
}

Avatar.displayName = 'Avatar'
