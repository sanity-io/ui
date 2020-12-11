import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
} from '../../styles/internal'
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
  tone: BadgeTone
  radius: number[]
}>(responsivePaddingStyle, responsiveRadiusStyle, badge)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    mode = 'default',
    padding = 1,
    radius = 2,
    size,
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
      <Label size={size}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
