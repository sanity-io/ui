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
  weight?: ThemeFontWeightKey
}

const Root = styled.div<{
  $accent?: boolean
  $align?: TextAlign | TextAlign[]
  $muted: boolean
  $size: number[]
}>(responsiveLabelFont, responsiveTextAlignStyle, labelBaseStyle)

export const Label = forwardRef(
  (props: LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {accent, align, children, muted = false, size = 2, weight, ...restProps} = props

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
