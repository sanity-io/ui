import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {responsiveHeadingFont, responsiveTextAlignStyle} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {headingBaseStyle} from './styles'

interface HeadingProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: ThemeFontWeightKey
}

const Root = styled.div(responsiveHeadingFont, responsiveTextAlignStyle, headingBaseStyle)

export const Heading = forwardRef(
  (props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, size = 2, ...restProps} = props

    return (
      <Root data-ui="Heading" {...restProps} ref={ref} size={size}>
        {children}
      </Root>
    )
  }
)

Heading.displayName = 'Heading'
