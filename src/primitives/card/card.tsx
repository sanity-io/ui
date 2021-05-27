import React, {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles/internal'
import {ThemeColorProvider, ThemeColorSchemeKey, useRootTheme} from '../../theme'
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
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>,
  ref
) {
  const {
    as: asProp,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
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
        data-selected={selected ? '' : undefined}
        data-ui="Card"
        data-tone={tone}
        {...restProps}
        $border={border}
        $borderTop={borderTop}
        $borderRight={borderRight}
        $borderBottom={borderBottom}
        $borderLeft={borderLeft}
        $radius={radius}
        $shadow={shadow}
        $tone={tone}
        forwardedAs={as}
        ref={ref}
        selected={selected}
      />
    </ThemeColorProvider>
  )
})
