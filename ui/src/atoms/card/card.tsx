import React, {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {
  borderStyle,
  BorderStyleProps,
  boxStyle,
  BoxStyleProps,
  flexItemStyle,
  FlexItemStyleProps,
  gridItemStyle,
  GridItemProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles'
import {ThemeColorProvider, ThemeColorSchemeKey, ThemeColorToneKey} from '../../theme'
import {card} from './styles'
import {CardColorProps} from './types'

export interface CardBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorToneKey
}

export type CardProps = BoxStyleProps &
  BorderStyleProps &
  GridItemProps &
  FlexItemStyleProps &
  ResponsiveMarginStyleProps &
  ResponsivePaddingStyleProps &
  ResponsiveRadiusProps &
  ResponsiveShadowStyleProps &
  CardBaseProps

const Root = styled.div<
  BoxStyleProps &
    BorderStyleProps &
    GridItemProps &
    FlexItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps &
    CardColorProps &
    ResponsiveRadiusProps &
    ResponsiveShadowStyleProps
>(
  boxStyle,
  borderStyle,
  gridItemStyle,
  flexItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
  responsiveRadiusStyle,
  responsiveShadowStyle,
  card
)

export const Card = forwardRef(
  (props: Omit<React.HTMLProps<HTMLDivElement>, 'height'> & CardProps, ref) => {
    const {
      as: asProp,
      display = 'block',
      margin = 0,
      padding = 0,
      radius = 0,
      scheme,
      tone = 'default',
      ...restProps
    } = props
    const as = isValidElementType(asProp) ? asProp : 'div'

    return (
      <ThemeColorProvider scheme={scheme} variant={tone}>
        <Root
          data-ui="Card"
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
