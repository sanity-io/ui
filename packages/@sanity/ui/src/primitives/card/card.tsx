import {forwardRef, memo} from 'react'
import {isValidElementType} from 'react-is'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {
  responsiveBorderBottomStyle,
  responsiveBorderLeftStyle,
  responsiveBorderRightStyle,
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  responsiveBorderTopStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles/internal'
import {ThemeColorProvider, ThemeColorSchemeKey, useRootTheme} from '../../theme'
import {CardTone} from '../../types'
import {Box, BoxProps} from '../box'
import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {cardBaseStyle, cardColorStyle} from './styles'
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
  pressed?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
}

const Root = memo(
  compose<
    CardStyleProps &
      ResponsiveRadiusStyleProps &
      ResponsiveBorderStyleProps &
      ResponsiveShadowStyleProps
  >(Box, [
    responsiveBorderStyle,
    responsiveBorderTopStyle,
    responsiveBorderRightStyle,
    responsiveBorderBottomStyle,
    responsiveBorderLeftStyle,
    responsiveRadiusStyle,
    responsiveShadowStyle,
    cardBaseStyle,
    cardColorStyle,
  ])
)

/**
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>
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

  return (
    <ThemeColorProvider scheme={scheme} tone={tone}>
      <Root
        data-as={typeof as === 'string' ? as : undefined}
        data-scheme={rootTheme.scheme}
        data-ui="Card"
        data-tone={tone}
        {...restProps}
        $border={useArrayProp(border)}
        $borderTop={useArrayProp(borderTop)}
        $borderRight={useArrayProp(borderRight)}
        $borderBottom={useArrayProp(borderBottom)}
        $borderLeft={useArrayProp(borderLeft)}
        $checkered={checkered}
        $focusRing={focusRing}
        $radius={useArrayProp(radius)}
        $shadow={useArrayProp(shadow)}
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
