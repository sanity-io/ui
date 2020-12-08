import {useId} from '@reach/auto-id'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import ReactIs from 'react-is'
import styled, {css} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {focusRingStyle} from '../../styles/_internal/focusRing'
import {ThemeColorSpotKey, useTheme} from '../../theme'
import {Text} from '../text'
import {AvatarPosition, AvatarSize, AvatarStatus} from './types'

export interface AvatarProps {
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
  as?: React.ElementType | keyof JSX.IntrinsicElements
  color?: ThemeColorSpotKey
  initials?: string
  onImageLoadError?: (event: Error) => void
  size?: AvatarSize | AvatarSize[]
  src?: string
  status?: AvatarStatus
  title?: string
}

function responsiveAvatarSizeStyle(props: {size: AvatarSize[]} & ThemeProps) {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return responsive(media, props.size, (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return {}

    return {
      width: rem(avatarSize.size),
      height: rem(avatarSize.size),
      borderRadius: rem(avatarSize.size / 2),

      '& > svg': {
        width: rem(avatarSize.size),
        height: rem(avatarSize.size),
        borderRadius: rem(avatarSize.size / 2),
      },
    }
  })
}

const Root = styled.div<{uiColor: string; size: AvatarSize[]}>(
  responsiveAvatarSizeStyle,
  ({theme, uiColor}: {uiColor: string} & ThemeProps) => {
    const {focusRing} = theme.sanity

    return css`
      background-color: ${uiColor};
      position: relative;
      box-sizing: border-box;
      user-select: none;
      box-shadow: 0 0 0 1px var(--card-bg-color);

      &[data-status='inactive'] {
        opacity: 0.5;
      }

      & > svg {
        &:not([hidden]) {
          display: block;
        }
      }

      /* &:is(button) */
      &[data-as='button'] {
        appearance: none;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        -webkit-font-smoothing: inherit;
        color: inherit;
        outline: none;

        &:focus {
          box-shadow: ${focusRingStyle({focusRing})};
        }

        &:focus:not(:focus-visible) {
          box-shadow: none;
        }
      }
    `
  }
)

const Arrow = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  opacity: 0;
  transition: all 0.2s linear;
  transform: rotate(-90deg) translate3d(0, 6px, 0);

  & > svg {
    width: 11px;
    height: 7px;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);

    &:not([hidden]) {
      display: block;
    }
  }

  [data-arrow-position='inside'] > & {
    transform: rotate(-90deg) translate3d(0, 6px, 0);
    opacity: 0;
  }

  [data-arrow-position='top'] > & {
    opacity: 1;
    transform: rotate(0deg);
  }

  [data-arrow-position='bottom'] > & {
    opacity: 1;
    transform: rotate(-180deg);
  }
`

const BgStroke = styled.ellipse`
  stroke-width: 4px;
  stroke: var(--card-bg-color);
`

const Stroke = styled.ellipse`
  stroke-width: 3px;

  ${Root}[data-status='editing'] & {
    stroke-dasharray: 2 4;
    stroke-linecap: round;
    animation: avatarEditingSpin 250ms infinite linear;
  }
`

const Initials = styled.div((props: ThemeProps) => {
  const {theme} = props
  const {base} = theme.sanity.color

  return css`
    width: 100%;
    height: 100%;
    color: ${base.fg};
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    text-align: center;
    border-radius: 50%;

    &:not([hidden]) {
      display: flex;
    }
  `
})

export const Avatar = forwardRef(
  (props: AvatarProps & Omit<React.HTMLProps<HTMLDivElement>, 'ref'>, ref) => {
    const {
      as: asProp,
      color: colorKey = 'gray',
      src,
      title,
      initials,
      onImageLoadError,
      arrowPosition: arrowPositionProp,
      animateArrowFrom,
      status = 'online',
      size: sizeProp,
      ...restProps
    } = props
    const as = ReactIs.isValidElementType(asProp) ? asProp : 'div'
    const size: AvatarSize[] = getResponsiveProp(sizeProp, [0])
    const theme = useTheme()
    const color = theme.sanity.color.spot[colorKey] || theme.sanity.color.spot.gray

    // @todo: remove this
    const avatarSize = theme.sanity.avatar.sizes[size[0]]
    const _sizeRem = avatarSize.size
    const _radius = _sizeRem / 2

    const elementId = useId()
    const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
      animateArrowFrom || arrowPositionProp || 'inside'
    )

    const [imageFailed, setImageFailed] = useState<boolean>(false)

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

    return (
      <Root
        as={as}
        data-as={String(as) || 'div'}
        data-ui="Avatar"
        {...restProps}
        aria-label={title}
        data-arrow-position={arrowPosition}
        data-status={status}
        ref={ref}
        size={size}
        title={title}
        uiColor={color}
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
          <svg viewBox={`0 0 ${_sizeRem} ${_sizeRem}`} fill="none">
            <defs>
              <pattern
                id={`${elementId}-image-url`}
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <image href={src} width="1" height="1" onError={handleImageError} />
              </pattern>
            </defs>

            <circle cx={_radius} cy={_radius} r={_radius} fill={`url(#${elementId}-image-url)`} />
            <BgStroke
              cx={_radius}
              cy={_radius}
              rx={_radius}
              ry={_radius}
              vectorEffect="non-scaling-stroke"
            />
            <Stroke
              cx={_radius}
              cy={_radius}
              rx={_radius}
              ry={_radius}
              stroke={color}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        {(imageFailed || !src) && initials && (
          <>
            <Initials>
              <Text as="span" size={size.map((s) => (s === 0 ? 0 : s + 1))}>
                <strong>{initials}</strong>
              </Text>
            </Initials>
          </>
        )}
      </Root>
    )
  }
)

Avatar.displayName = 'Avatar'
