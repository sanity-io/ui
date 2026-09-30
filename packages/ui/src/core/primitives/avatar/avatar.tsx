import {useCallback, useEffect, useState} from 'react'
import ReactIs from 'react-is'
import {styled} from 'styled-components'

import {ThemeColorAvatarColorKey} from '../../../theme/system/color/_system'
import {_getArrayProp} from '../../styles/helpers'
import {AvatarPosition, AvatarSize, AvatarStatus} from '../../types/avatar'
import {ElementType, Props} from '../../types/component'
import {Label} from '../label/label'
import {avatarRootStyle, responsiveAvatarSizeStyle} from './styles'

import {
  avatarArrow,
  avatarBgStroke,
  avatarImage,
  avatarInitials,
  avatarStroke,
  avatarStrokes,
} from './avatar.css'

/**
 * @public
 */
export interface AvatarOwnProps {
  /** @beta */
  __unstable_hideInnerStroke?: boolean
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
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
 * @public
 */
export type AvatarProps<E extends ElementType = 'div'> = Props<AvatarOwnProps, E>

const StyledAvatar = styled.div<{$color: ThemeColorAvatarColorKey; $size: AvatarSize[]}>(
  responsiveAvatarSizeStyle,
  avatarRootStyle,
)

// Stays on styled-components: `color: inherit` must beat Label's runtime
// `color: var(--card-fg-color)` at equal specificity, which needs both rules in
// the runtime stylesheet.
const InitialsLabel = styled(Label)({
  color: 'inherit',
})

function AvatarComponent(
  props: AvatarOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
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
    ref,
    status = 'online',
    size: sizeProp = 1,
    ...restProps
  } = props
  const as = ReactIs.isValidElementType(asProp) ? asProp : 'div'
  const size = _getArrayProp(sizeProp)

  const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
    animateArrowFrom || arrowPositionProp || 'inside',
  )

  const [imageFailed, setImageFailed] = useState<boolean>(false)

  // Adjusted during render rather than in an effect, so no committed frame
  // shows the initials for an image that has not tried to load yet.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevSrc, setPrevSrc] = useState(src)

  if (prevSrc !== src) {
    setPrevSrc(src)
    if (src) setImageFailed(false)
  }

  useEffect(() => {
    if (arrowPosition === arrowPositionProp) return undefined

    // Start animation in the next frame
    const raf = requestAnimationFrame(() => setArrowPosition(arrowPositionProp))

    return () => cancelAnimationFrame(raf)
  }, [arrowPosition, arrowPositionProp])

  const handleImageError = useCallback(() => {
    setImageFailed(true)

    if (onImageLoadError) {
      onImageLoadError(new Error('Avatar: the image failed to load'))
    }
  }, [onImageLoadError])

  return (
    <StyledAvatar
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
      <div className={avatarArrow}>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path
            d="M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z"
            fill={color}
          />
        </svg>
      </div>

      {!imageFailed && src && (
        <>
          {/*
           * A native <img> lets React wait for the image inside a <ViewTransition>
           * or a Suspense reveal. An `onLoad` handler or `loading="lazy"` would
           * opt it out of that, so neither is set.
           */}
          <img
            alt=""
            className={avatarImage}
            draggable={false}
            onError={handleImageError}
            src={src}
          />

          {/*
           * The strokes straddle the circle's edge and the svg clips the outer
           * half, leaving 1px of avatar color and 1px of card color inside.
           */}
          <svg className={avatarStrokes} viewBox="0 0 2 2" fill="none">
            {!__unstable_hideInnerStroke && (
              <circle
                className={avatarBgStroke}
                cx="1"
                cy="1"
                r="1"
                vectorEffect="non-scaling-stroke"
              />
            )}

            <circle
              className={avatarStroke}
              cx="1"
              cy="1"
              r="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </>
      )}

      {(imageFailed || !src) && initials && (
        <>
          <div className={avatarInitials}>
            <InitialsLabel
              forwardedAs="span"
              size={size.map((s) => {
                if (s === 1) return 1
                if (s === 2) return 3
                if (s === 3) return 5

                return 0
              })}
              weight="medium"
            >
              {initials}
            </InitialsLabel>
          </div>
        </>
      )}
    </StyledAvatar>
  )
}

/**
 * Avatars are used to represent people and other agents (e.g. bots).
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Avatar = AvatarComponent as unknown as <E extends ElementType = 'div'>(
  props: AvatarProps<E>,
) => React.JSX.Element
