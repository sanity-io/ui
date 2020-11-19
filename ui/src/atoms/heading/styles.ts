import {css} from 'styled-components'
import {Theme} from '../../theme'

export function headingBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
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

      &:focus-visible {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
