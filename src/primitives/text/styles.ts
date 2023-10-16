import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {cssVars} from '../../theme'

export function textBaseStyle(
  props: {$accent?: boolean; $muted?: boolean} & ThemeProps,
): ReturnType<typeof css> {
  const {$accent, $muted, theme} = props
  const {weights} = theme.sanity.fonts.text

  return css`
    color: ${cssVars.mutable['fg-color']};

    ${$accent &&
    css`
      color: ${cssVars.default['text-accent']};
    `}

    ${$muted &&
    css`
      color: ${cssVars.mutable['muted-fg-color']};
    `}

    & code {
      font-family: ${theme.sanity.fonts.code.family};
      border-radius: 1px;
      background-color: ${cssVars.default['bg-tint']};
      color: ${cssVars.default['text-secondary']};
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: ${cssVars.default['text-link']};
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow:
          0 0 0 1px ${cssVars.mutable['bg-color']},
          0 0 0 3px ${cssVars.positive['border-accent']};
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: ${weights.bold};
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
      color: ${cssVars.mutable['icon-color']};
    }
  `
}
