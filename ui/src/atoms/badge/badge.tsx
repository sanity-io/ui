import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {padding, radius} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'
import {BoxPaddingProps} from '../box'
import {useCard} from '../card'
import {getResponsiveProp} from '../helpers'
import {Label} from '../label'

type BadgeMode = 'default' | 'outline'
type BadgeTone = 'default' | 'brand' | 'positive' | 'caution' | 'critical'

export interface BadgeProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: BadgeMode
  radius?: number | number[]
  size?: number | number[]
  tone?: BadgeTone
}

function badge({
  mode,
  scheme,
  theme,
  tone,
}: {
  mode: BadgeMode
  scheme: ColorSchemeKey
  theme: Theme
  tone: BadgeTone
}) {
  const color = theme.color[scheme]?.badge.tones[tone]?.modes[mode] || {}

  return css`
    display: inline-block;
    background-color: ${color.bg};
    color: ${color.fg};
    box-shadow: inset 0 0 0 1px ${color.border};
  `
}

const Root = styled.div<{
  mode: BadgeMode
  scheme: ColorSchemeKey
  tone: BadgeTone
  uiRadius: number[]
}>(padding, radius, badge)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    mode = 'default',
    padding = 2,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius = 6,
    size,
    tone = 'default',
    ...restProps
  } = props
  const card = useCard()

  const uiRadius = getResponsiveProp(radius)

  const paddingProps = {
    padding: getResponsiveProp(padding),
    paddingX: getResponsiveProp(paddingX),
    paddingY: getResponsiveProp(paddingY),
    paddingTop: getResponsiveProp(paddingTop),
    paddingBottom: getResponsiveProp(paddingBottom),
    paddingLeft: getResponsiveProp(paddingLeft),
    paddingRight: getResponsiveProp(paddingRight),
  }

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      {...paddingProps}
      mode={mode}
      ref={ref}
      scheme={card.scheme}
      tone={tone}
      uiRadius={uiRadius}
    >
      <Label size={size}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
