import {css} from 'styled-components'
import {Theme} from '../theme'
import {rem} from '../helpers'

export function headingBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.heading.family};
    font-weight: ${theme.fonts.heading.weights};
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

export function headingSizeStyles(props: {size?: number; theme: Theme}) {
  const {sizes} = props.theme.fonts.heading
  const size = props.size === undefined ? sizes[2] : sizes[props.size] || sizes[2]

  return css`
    font-size: ${rem(size.fontSize)};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }
  `
}
