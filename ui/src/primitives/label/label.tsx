import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {responsiveLabelFont, responsiveTextAlignStyle} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {labelBaseStyle} from './styles'

interface LabelProps {
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

const Root = styled.div<{
  $accent?: boolean
  $align?: TextAlign | TextAlign[]
  $muted: boolean
  $size: number[]
}>(responsiveLabelFont, responsiveTextAlignStyle, labelBaseStyle)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Label = forwardRef(
  (props: LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {
      accent,
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
        data-ui="Label"
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

Label.displayName = 'Label'
