import {css} from 'styled-components'
import {Theme, ThemeFontSize} from '../../theme'
import {rem} from '../helpers'

export function headingBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.heading.family};
    font-weight: ${theme.fonts.heading.weights.bold};
    display: block;
    padding: 1px 0 0;
    margin: 0;

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

    & svg {
      vertical-align: baseline;
    }
  `
}

function _headingSizeStyles(size: ThemeFontSize) {
  const capHeight = size.lineHeight - size.ascenderHeight - size.descenderHeight

  return css`
    font-size: ${rem(size.fontSize)};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }

    & svg {
      font-size: ${rem(size.iconSize)};
      margin: ${rem((capHeight - size.iconSize) / 2)};
    }
  `
}

export function headingSizeStyles(props: {size: number[]; theme: Theme}) {
  const {sizes} = props.theme.fonts.heading

  return css`
    ${props.size.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) {
        return _headingSizeStyles(sizes[spaceIndex])
      }

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          ${_headingSizeStyles(sizes[spaceIndex])}
        }
      `
    })}
  `
}
