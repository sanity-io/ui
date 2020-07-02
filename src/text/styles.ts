import {css} from 'styled-components'
import {Theme} from '../theme'
import {rem} from '../helpers'

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
      font-family: ${theme.fonts.code.family};
      border-radius: 2px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }
    }
  `
}

export function textSizeStyles(props: {size?: number; weight?: number, theme: Theme}) {
  const {sizes} = props.theme.fonts.text
  const {weights} = props.theme.fonts.text
  const size = props.size === undefined ? sizes[2] : sizes[props.size] || sizes[2]
  const weight = props.weight === undefined ? weights[0] : weights[props.weight] || weights[0]

  return css`
    font-size: ${rem(size.fontSize)};
    font-weight: ${weight};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }
  `
}
