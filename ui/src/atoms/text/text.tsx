import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {FontProps, textFont} from '../../styles'
import {textBaseStyles} from './styles'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: string
}

const Root = styled.div<FontProps & {muted: boolean}>(textBaseStyles, textFont)

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
