import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  ResponsiveFontProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {TextAlign} from '../../types'
import {textBaseStyle} from './styles'

export interface TextProps extends ResponsiveFontProps {
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<ResponsiveFontProps>(
  responsiveTextFont,
  responsiveTextAlignStyle,
  textBaseStyle
)

export const Text = forwardRef(
  (props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {children, muted = false, size = 2, weight, ...restProps} = props

    return (
      <Root data-ui="Text" {...restProps} muted={muted} ref={ref} size={size} weight={weight}>
        {children}
      </Root>
    )
  }
)

Text.displayName = 'Text'
