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
import {ColorSchemeKey} from '../../theme'
import {CardProvider} from './cardProvider'
import {useCard} from './hooks'
import {card} from './styles'
import {CardColorProps, CardTone} from './types'

export interface CardBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  scheme?: ColorSchemeKey
  tone?: CardTone
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
    const parentCard = useCard()
    const {
      as: asProp,
      margin = 0,
      padding = 0,
      radius = 0,
      scheme = parentCard.scheme,
      tone = 'default',
      ...restProps
    } = props
    const as = isValidElementType(asProp) ? asProp : 'div'

    return (
      <CardProvider scheme={scheme} tone={tone}>
        <Root
          data-ui="Card"
          {...restProps}
          as={as}
          margin={margin}
          padding={padding}
          radius={radius}
          ref={ref}
          scheme={scheme}
          tone={tone}
        />
      </CardProvider>
    )
  }
)

Card.displayName = 'Card'
