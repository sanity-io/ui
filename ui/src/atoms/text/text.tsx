import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {ResponsiveFontProps, responsiveTextFont} from '../../styles'
import {textBaseStyles} from './styles'

interface TextProps extends ResponsiveFontProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<ResponsiveFontProps>(textBaseStyles, responsiveTextFont)

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
