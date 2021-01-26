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
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

const Root = styled.div<
  HeadingStyleProps & ResponsiveTextAlignStyleProps & ResponsiveFontStyleProps
>(headingBaseStyle, responsiveTextAlignStyle, responsiveHeadingFont)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {
      accent = false,
      align,
      children: childrenProp,
      muted = false,
      size = 2,
      textOverflow,
      weight,
      ...restProps
    } = props

    let children = childrenProp

    if (textOverflow === 'ellipsis') {
      children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
    }

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
