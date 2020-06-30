import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {BoxPaddingProps, boxFlexStyles, boxPaddingStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {cardColorStyles} from './styles'

interface CardBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  flex?: number | number[]
}

type CardProps = BoxPaddingProps & CardBaseProps

// @todo: Figure out typings
const Root = styled.div(boxFlexStyles as any, boxPaddingStyles, cardColorStyles)

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

  return <Root data-ui="Card" {...restProps} {...paddingProps} as={asProp} flex={flex} ref={ref} />
})

Card.displayName = 'Card'
