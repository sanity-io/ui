import {ThemeColorAvatarColorKey} from '@sanity/ui/theme'
import {forwardRef, useCallback, useEffect, useId, useMemo, useState} from 'react'
import ReactIs from 'react-is'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {useTheme_v2} from '../../theme'
import {AvatarPosition, AvatarSize, AvatarStatus} from '../../types'
import {Label} from '../label'
import {avatarStyle, responsiveAvatarSizeStyle} from './styles'

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

const Root = styled.div<{$color: ThemeColorAvatarColorKey; $size: AvatarSize[]}>(
  responsiveAvatarSizeStyle,
  avatarStyle.root,
)

const Arrow = styled.div(avatarStyle.arrow)

const BgStroke = styled.ellipse(avatarStyle.bgStroke)

const Stroke = styled.ellipse(avatarStyle.stroke)

const Initials = styled.div(avatarStyle.initials)

const InitialsLabel = styled(Label)({
  color: 'inherit',
})

const Image = styled.svg(avatarStyle.image)

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
  const {avatar} = useTheme_v2()
  const as = ReactIs.isValidElementType(asProp) ? asProp : 'div'
  const size = useArrayProp(sizeProp)

  // @todo: remove this
  const avatarSize = avatar.sizes[size[0]] || avatar.sizes[0]
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
    <Root
      as={as}
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Avatar"
      {...restProps}
      $color={color}
      $size={size}
      aria-label={title}
      data-arrow-position={arrowPosition}
      data-status={status}
      ref={ref}
      title={title}
    >
      <Arrow>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path
            d="M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z"
            fill={color}
          />
        </svg>
      </Arrow>

      {!imageFailed && src && (
        <Image viewBox={`0 0 ${_sizeRem} ${_sizeRem}`} fill="none">
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
            <BgStroke
              cx={_radius}
              cy={_radius}
              rx={_radius}
              ry={_radius}
              vectorEffect="non-scaling-stroke"
            />
          )}

          <Stroke
            cx={_radius}
            cy={_radius}
            rx={_radius}
            ry={_radius}
            vectorEffect="non-scaling-stroke"
          />
        </Image>
      )}

      {(imageFailed || !src) && initials && (
        <>
          <Initials>
            <InitialsLabel forwardedAs="span" size={initialsSize} weight="medium">
              {initials}
            </InitialsLabel>
          </Initials>
        </>
      )}
    </Root>
  )
})
