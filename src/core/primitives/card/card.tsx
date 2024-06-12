import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {forwardRef, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import {styled} from 'styled-components'
import {_getArrayProp} from '../../styles'
import {
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles/internal'
import {ThemeColorProvider, useRootTheme} from '../../theme'
import {CardTone} from '../../types'
import {Box, BoxProps} from '../box'
import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {cardStyle} from './styles'
import {CardStyleProps} from './types'

/**
 * @public
 */
export interface CardProps
  extends BoxProps,
    ResponsiveBorderProps,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
  /**
   * Do not use in production.
   * @beta
   */
  __unstable_checkered?: boolean
  /**
   * Do not use in production.
   * @beta
   */
  __unstable_focusRing?: boolean
  muted?: boolean
  pressed?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
}

const Root = styled(Box)<
  CardStyleProps &
    ResponsiveRadiusStyleProps &
    ResponsiveBorderStyleProps &
    ResponsiveShadowStyleProps
>(responsiveBorderStyle, responsiveRadiusStyle, responsiveShadowStyle, cardStyle)

/**
 * The `Card` component acts much like a `Box`, but with a background and foreground color.
 * Components within a `Card` inherit its colors.
 *
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: asProp,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    muted,
    pressed,
    radius = 0,
    scheme,
    selected,
    shadow,
    tone: toneProp = 'default',
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'
  const rootTheme = useRootTheme()
  const tone = toneProp === 'inherit' ? rootTheme.tone : toneProp

  const $border = useMemo(() => _getArrayProp(border), [border])
  const $borderTop = useMemo(() => _getArrayProp(borderTop), [borderTop])
  const $borderRight = useMemo(() => _getArrayProp(borderRight), [borderRight])
  const $borderBottom = useMemo(() => _getArrayProp(borderBottom), [borderBottom])
  const $borderLeft = useMemo(() => _getArrayProp(borderLeft), [borderLeft])
  const $radius = useMemo(() => _getArrayProp(radius), [radius])
  const $shadow = useMemo(() => _getArrayProp(shadow), [shadow])

  // todo: Consider adding the wrapper approach for nested cards in which the tones are not changing, avoid unnecessary ThemeColorProvider
  return (
    <ThemeColorProvider scheme={scheme} tone={tone}>
      <Root
        data-as={typeof as === 'string' ? as : undefined}
        data-scheme={rootTheme.scheme}
        data-ui="Card"
        data-tone={tone}
        {...restProps}
        $border={$border}
        $borderTop={$borderTop}
        $borderRight={$borderRight}
        $borderBottom={$borderBottom}
        $borderLeft={$borderLeft}
        $radius={$radius}
        $shadow={$shadow}
        $checkered={checkered}
        $focusRing={focusRing}
        $muted={muted}
        $tone={tone}
        data-checkered={checkered ? '' : undefined}
        data-pressed={pressed ? '' : undefined}
        data-selected={selected ? '' : undefined}
        forwardedAs={as}
        ref={ref}
        selected={selected}
      />
    </ThemeColorProvider>
  )
})
