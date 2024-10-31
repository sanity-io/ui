import {
  avatar,
  avatarArrow,
  avatarBgStroke,
  avatarImage,
  avatarInitials,
  avatarStroke,
  composeClassNames,
} from '@sanity/ui/css'
import {ThemeColorAvatarColorKey} from '@sanity/ui/theme'
import {forwardRef, useCallback, useEffect, useId, useMemo, useState} from 'react'
import ReactIs from 'react-is'
import {useArrayProp} from '../../hooks'
import {useTheme_v2} from '../../theme'
import {AvatarPosition, AvatarSize, AvatarStatus} from '../../types'
import {Label} from '../label'

/**
 * @public
 */
export interface AvatarProps {
  /** @beta */
  __unstable_hideInnerStroke?: boolean
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
  as?: React.ElementType | keyof JSX.IntrinsicElements
  color?: ThemeColorAvatarColorKey
  initials?: string
  onImageLoadError?: (event: Error) => void
  size?: AvatarSize | AvatarSize[]
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
  props: AvatarProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>,
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
  const {avatar: avatarTheme} = useTheme_v2()
  const As = ReactIs.isValidElementType(asProp) ? asProp : 'div'
  const size = useArrayProp(sizeProp)

  // @todo: remove this
  const avatarSize = avatarTheme.sizes[size[0]] || avatarTheme.sizes[0]
  const _sizeRem = avatarSize.size
  const _radius = _sizeRem / 2

  const elementId = useId()
  const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
    animateArrowFrom || arrowPositionProp || 'inside',
  )

  const [imageFailed, setImageFailed] = useState<boolean>(false)

  const imageId = `avatar-image-${elementId}`

  useEffect(() => {
    if (arrowPosition === arrowPositionProp) return undefined

    // Start animation in the next frame
    const raf = requestAnimationFrame(() => setArrowPosition(arrowPositionProp))

    return () => cancelAnimationFrame(raf)
  }, [arrowPosition, arrowPositionProp])

  useEffect(() => {
    if (src) setImageFailed(false)
  }, [src])

  const handleImageError = useCallback(() => {
    setImageFailed(true)

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
      data-as={typeof As === 'string' ? As : undefined}
      data-ui="Avatar"
      {...restProps}
      $color={color}
      $size={size}
      aria-label={title}
      className={composeClassNames(
        className,
        avatar({
          arrowPosition,
          color,
          size: sizeProp,
        }),
      )}
      // data-arrow-position={arrowPosition}
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

      {!imageFailed && src && (
        <svg className={avatarImage()} viewBox={`0 0 ${_sizeRem} ${_sizeRem}`} fill="none">
          <defs>
            <pattern id={imageId} patternContentUnits="objectBoundingBox" width="1" height="1">
              <image
                href={src}
                width="1"
                height="1"
                // eslint-disable-next-line react/no-unknown-property
                onError={handleImageError}
              />
            </pattern>
          </defs>

          <circle cx={_radius} cy={_radius} r={_radius} fill={`url(#${imageId})`} />

          {!__unstable_hideInnerStroke && (
            <ellipse
              className={avatarBgStroke()}
              cx={_radius}
              cy={_radius}
              rx={_radius}
              ry={_radius}
              vectorEffect="non-scaling-stroke"
            />
          )}

          <ellipse
            className={avatarStroke()}
            cx={_radius}
            cy={_radius}
            rx={_radius}
            ry={_radius}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {(imageFailed || !src) && initials && (
        <>
          <span className={avatarInitials()}>
            <Label as="span" size={initialsSize} style={{color: 'inherit'}} weight="medium">
              {initials}
            </Label>
          </span>
        </>
      )}
    </As>
  )
})

Avatar.displayName = 'ForwardRef(Avatar)'
