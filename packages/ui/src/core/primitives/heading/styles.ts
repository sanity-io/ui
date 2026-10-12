import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_fontBase} from '../../styles/font/responsiveFont'
import {ThemeProps} from '../../styles/types'

export function headingBaseStyle(props: ThemeProps): ReturnType<typeof css> {
  const {font} = getTheme_v2(props.theme)

  return css`
    & code {
      font-family: ${font.code.family};
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
          0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: ${font.heading.weights.bold};
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
      /* ...and aren't squeezed by resets that set max-width: 100% */
      max-width: unset;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }

    ${_fontBase('heading', props)}
  `
}
