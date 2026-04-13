import {
  avatar,
  avatar_arrow,
  avatar_arrowSvg,
  avatar_image,
  avatar_imageOutline,
  avatar_initials,
  type ResponsiveProp,
} from '@sanity/ui-css'
import type {AvatarColor, AvatarSize, FontLabelSize} from '@sanity/ui-tokens'
import {startTransition, useEffect, useState} from 'react'

import {_raf} from '../../core/helpers/animation'
import {_getResponsiveProp} from '../../core/helpers/props'
import type {ComponentType, Props} from '../../core/types'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
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

  const initialsSize = size.map((s): FontLabelSize => {
    if (s === 1) return 1
    if (s === 2) return 3
    if (s === 3) return 5

    return 0
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
