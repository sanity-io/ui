import {getTheme_v2} from '@sanity/ui/theme'
import {css} from 'styled-components'

import {ThemeProps} from '../../styles'

export function labelBaseStyle(
  props: {$accent?: boolean; $muted: boolean} & ThemeProps,
): ReturnType<typeof css> {
  const {$accent, $muted} = props
  const {font} = getTheme_v2(props.theme)

  return css`
    text-transform: uppercase;

    ${$accent &&
    css`
      color: var(--card-accent-fg-color);
    `}

    ${$muted &&
    css`
      color: var(--card-muted-fg-color);
    `}

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
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
