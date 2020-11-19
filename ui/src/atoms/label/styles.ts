import {css} from 'styled-components'
import {Theme} from '../../theme'

export function labelBaseStyles(props: {accent?: boolean; theme: Theme; muted: boolean}) {
  const {accent, theme, muted} = props

  return css`
    text-transform: uppercase;

    ${accent &&
    css`
      color: var(--card-accent-fg-color);
    `}

    ${muted &&
    css`
      color: var(--card-muted-fg-color);
    `}

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

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
