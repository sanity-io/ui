import React from 'react'
import styled, {css} from 'styled-components'
import {Theme} from '../theme'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

function textBaseCss(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.text.family};
    display: block;
    padding: 1px 0 0;
    margin: 0 -0.05em;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & code {
      font-family: ${({theme}) => theme.fonts.code.family};
      border-radius: 2px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}

function textSizeCss(props: {size?: number; theme: Theme}) {
  const {sizes} = props.theme.fonts.text
  const size = props.size === undefined ? sizes[2] : sizes[props.size] || sizes[2]

  return css`
    font-size: ${size.fontSize}px;
    line-height: ${size.lineHeight}px;
    letter-spacing: ${size.letterSpacing}px;
    transform: translateY(${size.descenderHeight}px);

    &:before {
      margin-top: ${-1 - size.ascenderHeight - size.descenderHeight}px;
    }
  `
}

const Root = styled.div`
  ${textBaseCss}
  ${textSizeCss}
`

export function Text(props: React.HTMLProps<HTMLDivElement> & TextProps) {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Text" {...restProps} size={size}>
      {children}
    </Root>
  )
}
