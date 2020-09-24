import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {BoxPaddingProps, boxFlexStyles, boxPaddingStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {cardColorStyles, cardRadiusStyles, cardShadowStyles} from './styles'
import {CardTone} from './types'

interface CardBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  flex?: number | number[]
  radius?: number | number[]
  shadow?: number | number[]
  tone?: CardTone
}

type CardProps = BoxPaddingProps & CardBaseProps

// @todo: Figure out typings
const Root = styled.div(
  boxFlexStyles as any,
  boxPaddingStyles as any,
  cardColorStyles,
  cardRadiusStyles as any,
  cardShadowStyles as any
)

export const Card = forwardRef((props: React.HTMLProps<HTMLDivElement> & CardProps, ref) => {
  const {
    as: asProp = 'div',
    flex: flexProp,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius: radiusProp,
    shadow: shadowProp,
    tone = 'default',
    ...restProps
  } = props

  const paddingProps = {
    padding: getResponsiveProp(padding, [0]),
    paddingX: getResponsiveProp(paddingX, []),
    paddingY: getResponsiveProp(paddingY, []),
    paddingTop: getResponsiveProp(paddingTop, []),
    paddingBottom: getResponsiveProp(paddingBottom, []),
    paddingLeft: getResponsiveProp(paddingLeft, []),
    paddingRight: getResponsiveProp(paddingRight, []),
  }

  const flex = getResponsiveProp(flexProp, [])
  const radius = getResponsiveProp(radiusProp, [0])
  const shadow = getResponsiveProp(shadowProp, [0])

  return (
    <Root
      data-ui="Card"
      {...restProps}
      {...paddingProps}
      as={asProp}
      flex={flex}
      radius={radius}
      ref={ref}
      shadow={shadow}
      tone={tone}
    />
  )
})

Card.displayName = 'Card'
