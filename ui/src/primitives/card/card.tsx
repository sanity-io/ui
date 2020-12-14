import React, {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {
  responsiveBoxStyle,
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  ResponsiveBoxStyleProps,
  responsiveFlexItemStyle,
  ResponsiveFlexItemStyleProps,
  responsiveGridItemStyle,
  ResponsiveGridItemStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles/internal'
import {ThemeColorProvider, ThemeColorSchemeKey, ThemeColorToneKey, useRootTheme} from '../../theme'
import {cardStyle} from './styles'
import {CardColorProps} from './types'

export interface CardProps
  extends ResponsiveBoxStyleProps,
    ResponsiveBorderStyleProps,
    ResponsiveGridItemStyleProps,
    ResponsiveFlexItemStyleProps,
    ResponsiveMarginStyleProps,
    ResponsivePaddingStyleProps,
    ResponsiveRadiusProps,
    ResponsiveShadowStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorToneKey | 'inherit'
}

const Root = styled.div<
  ResponsiveBoxStyleProps &
    ResponsiveBorderStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveFlexItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps &
    CardColorProps &
    ResponsiveRadiusProps &
    ResponsiveShadowStyleProps
>(
  responsiveBoxStyle,
  responsiveBorderStyle,
  responsiveGridItemStyle,
  responsiveFlexItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
  responsiveRadiusStyle,
  responsiveShadowStyle,
  cardStyle
)

export const Card = forwardRef(
  (props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>, ref) => {
    const {
      as: asProp,
      display = 'block',
      margin = 0,
      padding = 0,
      radius = 0,
      scheme,
      tone: toneProp = 'default',
      ...restProps
    } = props
    const as = isValidElementType(asProp) ? asProp : 'div'
    const rootTheme = useRootTheme()
    const tone = toneProp === 'inherit' ? rootTheme.tone : toneProp

    return (
      <ThemeColorProvider scheme={scheme} tone={tone}>
        <Root
          data-as={String(as) || 'div'}
          data-scheme={rootTheme.scheme}
          data-ui="Card"
          data-tone={tone}
          {...restProps}
          as={as}
          display={display}
          margin={margin}
          padding={padding}
          radius={radius}
          ref={ref}
          tone={tone}
        />
      </ThemeColorProvider>
    )
  }
)

Card.displayName = 'Card'
