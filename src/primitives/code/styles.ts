import {purple, green, yellow, orange, cyan, gray, red, blue, magenta} from '@sanity/color'
import {css} from 'styled-components'
import {ThemeColorSchemeKey} from '../../theme'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'

function codeSyntaxHighlightingStyle(scheme: ThemeColorSchemeKey) {
  const dark = scheme === 'dark'
  const mainShade = dark ? 400 : 600
  const secondaryShade = dark ? 600 : 400

  return {
    '&.atrule': {color: purple[mainShade].hex},
    '&.attr-name': {color: green[mainShade].hex},
    '&.attr-value': {color: yellow[mainShade].hex},
    '&.attribute': {color: yellow[mainShade].hex},
    '&.boolean': {color: purple[mainShade].hex},
    '&.builtin': {color: purple[mainShade].hex},
    '&.cdata': {color: yellow[mainShade].hex},
    '&.char': {color: yellow[mainShade].hex},
    '&.class': {color: orange[mainShade].hex},
    '&.class-name': {color: cyan[mainShade].hex},
    '&.comment': {color: gray[secondaryShade].hex},
    '&.constant': {color: purple[mainShade].hex},
    '&.deleted': {color: red[mainShade].hex},
    '&.doctype': {color: gray[secondaryShade].hex},
    '&.entity': {color: red[mainShade].hex},
    '&.function': {color: green[mainShade].hex},
    '&.hexcode': {color: blue[mainShade].hex},
    '&.id': {color: purple[mainShade].hex},
    '&.important': {color: purple[mainShade].hex},
    '&.inserted': {color: yellow[mainShade].hex},
    '&.keyword': {color: magenta[mainShade].hex},
    '&.number': {color: purple[mainShade].hex},
    '&.operator': {color: magenta[mainShade].hex},
    '&.prolog': {color: gray[secondaryShade].hex},
    '&.property': {color: blue[mainShade].hex},
    '&.pseudo-class': {color: yellow[mainShade].hex},
    '&.pseudo-element': {color: yellow[mainShade].hex},
    '&.punctuation': {color: gray[mainShade].hex},
    '&.regex': {color: blue[mainShade].hex},
    '&.selector': {color: red[mainShade].hex},
    '&.string': {color: yellow[mainShade].hex},
    '&.symbol': {color: purple[mainShade].hex},
    '&.tag': {color: red[mainShade].hex},
    '&.unit': {color: orange[mainShade].hex},
    '&.url': {color: red[mainShade].hex},
    '&.variable': {color: red[mainShade].hex},
  }
}

export interface CodeBaseStyleProps {
  $scheme: ThemeColorSchemeKey
}

export function codeBaseStyle(props: CodeBaseStyleProps): ReturnType<typeof css> {
  return css`
    color: ${cssVars.default['text-code']};

    & code {
      font-family: inherit;

      &.refractor .token {
        ${codeSyntaxHighlightingStyle(props.$scheme)}
      }
    }

    & a {
      color: inherit;
      text-decoration: underline;
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
