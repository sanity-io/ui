import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_fontBase} from '../../styles/font/responsiveFont'
import {ThemeProps} from '../../styles/types'

export function labelBaseStyle(props: ThemeProps): ReturnType<typeof css> {
  const {font} = getTheme_v2(props.theme)

  return css`
    ${_fontBase('label', props)}

    text-transform: uppercase;

    & code {
      font-family: ${font.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
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
  `
}
