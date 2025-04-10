import {
  avatar,
  avatarArrow,
  avatarImage,
  avatarInitials,
  composeClassNames,
  ResponsiveProp,
} from '@sanity/ui/css'
import {AvatarSize, ThemeColorAvatarColorKey} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useState} from 'react'
import ReactIs from 'react-is'

import {useArrayProp} from '../../hooks'
import {AvatarPosition, AvatarStatus, Props} from '../../types'
import {Box} from '../box'
import {Label} from '../label'

/**
 * @public
 */
export interface AvatarProps {
  /** @beta */
  __unstable_hideInnerStroke?: boolean
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
  color?: ThemeColorAvatarColorKey
  initials?: string
  onImageLoadError?: (event: Error) => void
  size?: ResponsiveProp<AvatarSize>
  src?: string
  /**
   * The status of the entity this Avatar represents.
   * @alpha
   */
  status?: AvatarStatus
  title?: string
}

/**
 * Avatars are used to represent people and other agents (e.g. bots).
 *
 * @public
 */
export const Avatar = forwardRef(function Avatar(
  props: Props<AvatarProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_hideInnerStroke,
    as: asProp,
    className,
    color = 'gray',
    src,
    title,
    initials,
    onImageLoadError,
    arrowPosition: arrowPositionProp,
    animateArrowFrom,
    status = 'online',
    size: sizeProp = 1,
    ...restProps
  } = props
  const As = ReactIs.isValidElementType(asProp) ? asProp : 'div'
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
    <As
      // data-as={typeof As === 'string' ? As : undefined}
      data-hide-inner-stroke={__unstable_hideInnerStroke ? '' : undefined}
      data-ui="Avatar"
      {...restProps}
      aria-label={title}
      className={composeClassNames(className, avatar({color, size: sizeProp}))}
      data-arrow-position={arrowPosition}
      data-image-error={imageError ? '' : undefined}
      data-status={status}
      ref={ref}
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
        <Label
          align="center"
          as="span"
          size={initialsSize}
          style={{color: 'inherit'}}
          weight="medium"
        >
          {initials}
        </Label>
      </Box>

      {src && (
        <Box className={avatarImage()} inset={0} position="absolute">
          <img alt={initials} onError={handleImageError} src={src} />
          <span />
        </Box>
      )}
    </As>
  )
})

Avatar.displayName = 'ForwardRef(Avatar)'
