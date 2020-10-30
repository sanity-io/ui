import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  border,
  BorderProps,
  flexItem,
  FlexItemProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  shadow,
  ShadowProps,
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

export type CardProps = BorderProps &
  FlexItemProps &
  MarginProps &
  PaddingProps &
  RadiusProps &
  ShadowProps &
  CardBaseProps

const Root = styled.div<
  BorderProps &
    FlexItemProps &
    MarginProps &
    PaddingProps &
    CardColorProps &
    RadiusProps &
    ShadowProps
>(border, flexItem, margin, padding, radius, shadow, card)

export const Card = forwardRef((props: React.HTMLProps<HTMLDivElement> & CardProps, ref) => {
  const parentCard = useCard()
  const {
    margin = 0,
    padding = 0,
    radius = 0,
    scheme = parentCard.scheme,
    tone = 'default',
    ...restProps
  } = props

  return (
    <CardProvider scheme={scheme} tone={tone}>
      <Root
        data-ui="Card"
        {...restProps}
        margin={margin}
        padding={padding}
        radius={radius}
        ref={ref}
        scheme={scheme}
        tone={tone}
      />
    </CardProvider>
  )
})

Card.displayName = 'Card'
