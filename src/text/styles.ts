import {css} from 'styled-components'
import {Theme} from '../theme'

export function textBaseStyles(props: {theme: Theme}) {
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

export function textSizeStyles(props: {size?: number; theme: Theme}) {
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
