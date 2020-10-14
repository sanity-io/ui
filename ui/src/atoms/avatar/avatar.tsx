import {useId} from '@reach/auto-id'
import {ColorHueKey} from '@sanity/color'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {rem} from '../../styles'
import {ColorSchemeKey, Theme, useTheme} from '../../theme'
import {useCard} from '../card'
import {Text} from '../text'
import {avatarTheme} from './theme'
import {AvatarPosition, AvatarSize, AvatarStatus} from './types'

export interface AvatarProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  color?: ColorHueKey
  src?: string
  title?: string
  initials?: string
  onImageLoadError?: (event: Error) => void
  arrowPosition?: AvatarPosition
  animateArrowFrom?: AvatarPosition
  status?: AvatarStatus
  size?: AvatarSize
  // tone?: 'navbar'
}

const Root = styled.div<{uiColor: string; size: AvatarSize}>`
  background-color: ${({uiColor}) => uiColor};
  position: relative;
  box-sizing: border-box;
  user-select: none;
  width: ${({size}) => rem(avatarTheme.size[size])};
  height: ${({size}) => rem(avatarTheme.size[size])};
  border-radius: ${({size}) => rem(avatarTheme.size[size] / 2)};
  box-shadow: 0 0 0 1px var(--card-bg-color);

  &[data-status='inactive'] {
    opacity: 0.5;
  }

  & > svg {
    display: block;
    width: ${({size}) => rem(avatarTheme.size[size])};
    height: ${({size}) => rem(avatarTheme.size[size])};
    border-radius: ${({size}) => rem(avatarTheme.size[size] / 2)};
  }

  &:is(button) {
    appearance: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    -webkit-font-smoothing: inherit;
    color: inherit;
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }
  }
`

const Arrow = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  opacity: 0;
  transition: all 0.2s linear;
  transform: rotate(-90deg) translate3d(0, 6px, 0);

  & > svg {
    display: block;
    width: 11px;
    height: 7px;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  ${Root}[data-arrow-position='inside'] & {
    transform: rotate(-90deg) translate3d(0, 6px, 0);
    opacity: 0;
  }

  ${Root}[data-arrow-position='top'] & {
    opacity: 1;
    transform: rotate(0deg);
  }

  ${Root}[data-arrow-position='bottom'] & {
    opacity: 1;
    transform: rotate(-180deg);
  }
`

const BgStroke = styled.ellipse`
  stroke-width: 4px;
  vector-effect: non-scaling-stroke;
  stroke: var(--card-bg-color);
`

const Stroke = styled.ellipse`
  stroke-width: 3px;
  vector-effect: non-scaling-stroke;

  ${Root}[data-status='editing'] & {
    stroke-dasharray: 2 4;
    stroke-linecap: round;
    animation: avatarEditingSpin 250ms infinite linear;
  }
`

const Initials = styled.div<{scheme: ColorSchemeKey}>(
  (props: {scheme: ColorSchemeKey; theme: Theme}) => {
    const {scheme, theme} = props
    const tone = theme.color[scheme].card.tones.default

    return css`
      width: 100%;
      height: 100%;
      color: ${tone.enabled.bg};
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      text-align: center;
      border-radius: 50%;
    `
  }
)

export const Avatar = forwardRef(
  (props: AvatarProps & Omit<React.HTMLProps<HTMLDivElement>, 'ref'>, ref) => {
    const {
      color: colorKey = 'gray',
      src,
      title,
      initials,
      onImageLoadError,
      arrowPosition: arrowPositionProp,
      animateArrowFrom,
      status = 'online',
      size = 0,
      // tone,
      ...restProps
    } = props

    const theme = useTheme()
    const card = useCard()
    const color = theme.color[card.scheme].avatar[colorKey]

    const _sizeRem = avatarTheme.size[size]
    const _radius = avatarTheme.size[size] / 2

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
        data-ui="Avatar"
        {...restProps}
        aria-label={title}
        data-arrow-position={arrowPosition}
        data-status={status}
        // data-tone={tone}
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
            <BgStroke cx={_radius} cy={_radius} rx={_radius} ry={_radius} />
            <Stroke cx={_radius} cy={_radius} rx={_radius} ry={_radius} stroke={color} />
          </svg>
        )}

        {(imageFailed || !src) && initials && (
          <>
            <Initials scheme={card.scheme}>
              {size === 0 && (
                <Text as="span" size={0}>
                  <strong>{initials}</strong>
                </Text>
              )}
              {size === 1 && (
                <Text as="span" size={2}>
                  <strong>{initials}</strong>
                </Text>
              )}
              {size === 2 && (
                <Text as="span" size={3}>
                  <strong>{initials}</strong>
                </Text>
              )}
            </Initials>
          </>
        )}
      </Root>
    )
  }
)

Avatar.displayName = 'Avatar'
