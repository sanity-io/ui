import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  ResponsiveFontStyleProps,
  responsiveHeadingFont,
  responsiveTextAlignStyle,
  ResponsiveTextAlignStyleProps,
} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {headingBaseStyle} from './styles'
import {HeadingStyleProps} from './types'

export interface HeadingProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: ThemeFontWeightKey
}

const Root = styled.div<
  HeadingStyleProps & ResponsiveTextAlignStyleProps & ResponsiveFontStyleProps
>(headingBaseStyle, responsiveTextAlignStyle, responsiveHeadingFont)

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {accent = false, align, children, muted = false, size = 2, weight, ...restProps} = props

    return (
      <Root
        data-ui="Heading"
        {...restProps}
        $accent={accent}
        $align={align}
        $muted={muted}
        $size={size}
        $weight={weight}
        ref={ref}
      >
        {children}
      </Root>
    )
  }
)

Heading.displayName = 'Heading'
