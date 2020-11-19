import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
} from '../../styles'
import {ThemeColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {Label} from '../label'
import {badge} from './styles'
import {BadgeMode, BadgeTone} from './types'

export interface BadgeProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: BadgeMode
  size?: number | number[]
  tone?: BadgeTone
}

const Root = styled.div<{
  mode: BadgeMode
  scheme: ThemeColorSchemeKey
  tone: BadgeTone
  radius: number[]
}>(responsivePaddingStyle, responsiveRadiusStyle, badge)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    mode = 'default',
    padding = 2,
    radius = 6,
    size,
    tone = 'default',
    ...restProps
  } = props

  const card = useCard()

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      mode={mode}
      padding={padding}
      ref={ref}
      scheme={card.scheme}
      tone={tone}
      radius={radius}
    >
      <Label size={size}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
