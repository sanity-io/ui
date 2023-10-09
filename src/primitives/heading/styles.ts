import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {HeadingStyleProps} from './types'
import {cssVars} from '../../theme'

export function headingBaseStyle(props: HeadingStyleProps & ThemeProps): ReturnType<typeof css> {
  const {$accent, $muted, theme} = props

  return css`
    ${$accent &&
    css`
      color: var(--card-accent-fg-color);
    `}

    ${$muted &&
    css`
      color: var(--card-muted-fg-color);
    `}

    & code {
      font-family: ${theme.sanity.fonts.code.family};
      border-radius: 1px;
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
        box-shadow:
          0 0 0 1px var(--card-bg-color),
          0 0 0 3px ${cssVars.positive.border_accent};
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
