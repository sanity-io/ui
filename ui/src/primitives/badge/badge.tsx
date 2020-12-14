import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
} from '../../styles/internal'
import {Label} from '../label'
import {badgeStyle} from './styles'
import {BadgeMode, BadgeTone} from './types'

export interface BadgeProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: BadgeMode
  tone?: BadgeTone
}

const Root = styled.div<{
  mode: BadgeMode
  radius: number[]
  tone: BadgeTone
}>(responsivePaddingStyle, responsiveRadiusStyle, badgeStyle)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    fontSize,
    mode = 'default',
    padding = 1,
    radius = 2,
    tone = 'default',
    ...restProps
  } = props

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      mode={mode}
      padding={padding}
      ref={ref}
      tone={tone}
      radius={radius}
    >
      <Label size={fontSize}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
