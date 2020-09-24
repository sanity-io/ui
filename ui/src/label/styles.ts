import {css} from 'styled-components'
import {Theme} from '../theme'
import {rem} from '../helpers'

export function labelBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.label.family};
    font-weight: ${theme.fonts.label.weights.semibold};
    display: block;
    padding: 1px 0 0;
    margin: 0 -0.05em;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 2px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}

export function labelSizeStyles(props: {size?: number; theme: Theme}) {
  const {sizes} = props.theme.fonts.label
  const size = props.size === undefined ? sizes[2] : sizes[props.size] || sizes[2]

  return css`
    font-size: ${rem(size.fontSize)};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    text-transform: uppercase;
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }
  `
}
