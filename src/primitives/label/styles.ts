import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {cardCssVariables} from '../../styles/colorVars'
import {cssVars} from '../../theme'

export function labelBaseStyle(
  props: {$accent?: boolean; $muted: boolean} & ThemeProps,
): ReturnType<typeof css> {
  const {$accent, $muted, theme} = props
  const {fonts} = theme.sanity

  return css`
    text-transform: uppercase;

    ${$accent &&
    css`
      color: ${cssVars.card['text-accent-color']}};
    `}

    ${$muted &&
    css`
      color: ${cardCssVariables['muted-fg-color']};
    `}

    & code {
      font-family: ${fonts.code.family};
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
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
