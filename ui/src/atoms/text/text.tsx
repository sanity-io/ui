import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {textFont} from '../../styles'
import {getResponsiveProp} from '../helpers'
import {textBaseStyles} from './styles'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: string
}

// @todo: Figure out typings
const Root = styled.div<{size: number[]}>(textBaseStyles, textFont as any)

export const Text = forwardRef(
  (props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {children, muted, size: sizeProp = 2, weight, ...restProps} = props
    const size = getResponsiveProp(sizeProp)

    return (
      <Root data-ui="Text" {...restProps} muted={muted} ref={ref} uiSize={size} weight={weight}>
        {children}
      </Root>
    )
  }
)

Text.displayName = 'Text'
