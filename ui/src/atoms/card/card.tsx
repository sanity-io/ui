import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {radius, space} from '../../styles'
import {ColorSchemeKey} from '../../theme'
import {BoxMarginProps, BoxPaddingProps, boxFlexStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {CardProvider} from './cardProvider'
import {useCard} from './hooks'
import {cardBaseStyles, cardColorStyles, cardShadowStyles} from './styles'
import {CardTone} from './types'

export interface CardBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  flex?: number | number[]
  radius?: number | number[]
  scheme?: ColorSchemeKey
  shadow?: number | number[]
  tone?: CardTone
}

export type CardProps = BoxMarginProps & BoxPaddingProps & CardBaseProps

// @todo: Figure out typings
const Root = styled.div(
  boxFlexStyles as any,
  space as any,
  cardBaseStyles,
  cardColorStyles,
  radius as any,
  cardShadowStyles as any
)

export const Card = forwardRef((props: React.HTMLProps<HTMLDivElement> & CardProps, ref) => {
  const {
    as: asProp = 'div',
    flex: flexProp,
    margin = 0,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding = 0,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius: radiusProp = 0,
    scheme,
    shadow: shadowProp,
    tone = 'default',
    ...restProps
  } = props

  const parentCard = useCard()

  const spaceProps = {
    margin: getResponsiveProp(margin),
    marginX: getResponsiveProp(marginX),
    marginY: getResponsiveProp(marginY),
    marginTop: getResponsiveProp(marginTop),
    marginBottom: getResponsiveProp(marginBottom),
    marginLeft: getResponsiveProp(marginLeft),
    marginRight: getResponsiveProp(marginRight),
    padding: getResponsiveProp(padding),
    paddingX: getResponsiveProp(paddingX),
    paddingY: getResponsiveProp(paddingY),
    paddingTop: getResponsiveProp(paddingTop),
    paddingBottom: getResponsiveProp(paddingBottom),
    paddingLeft: getResponsiveProp(paddingLeft),
    paddingRight: getResponsiveProp(paddingRight),
  }

  const flex = getResponsiveProp(flexProp)
  const uiRadius = getResponsiveProp(radiusProp)
  const shadow = getResponsiveProp(shadowProp)

  return (
    <CardProvider scheme={scheme || parentCard.scheme} tone={tone}>
      <Root
        data-ui="Card"
        {...restProps}
        {...spaceProps}
        as={asProp}
        flex={flex}
        uiRadius={uiRadius}
        ref={ref}
        shadow={shadow}
        scheme={scheme || parentCard.scheme}
        tone={tone}
      />
    </CardProvider>
  )
})

Card.displayName = 'Card'
