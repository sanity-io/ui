import {css} from 'styled-components'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'

function codeSyntaxHighlightingStyle() {
  return {
    '&.atrule': {color: cssVars.syntax.atrule},
    '&.attr-name': {color: cssVars.syntax.attrName},
    '&.attr-value': {color: cssVars.syntax.attrValue},
    '&.attribute': {color: cssVars.syntax.attribute},
    '&.boolean': {color: cssVars.syntax.boolean},
    '&.builtin': {color: cssVars.syntax.builtin},
    '&.cdata': {color: cssVars.syntax.cdata},
    '&.char': {color: cssVars.syntax.char},
    '&.class': {color: cssVars.syntax.class},
    '&.class-name': {color: cssVars.syntax.className},
    '&.comment': {color: cssVars.syntax.comment},
    '&.constant': {color: cssVars.syntax.constant},
    '&.deleted': {color: cssVars.syntax.deleted},
    '&.doctype': {color: cssVars.syntax.doctype},
    '&.entity': {color: cssVars.syntax.entity},
    '&.function': {color: cssVars.syntax.function},
    '&.hexcode': {color: cssVars.syntax.hexcode},
    '&.id': {color: cssVars.syntax.id},
    '&.important': {color: cssVars.syntax.important},
    '&.inserted': {color: cssVars.syntax.inserted},
    '&.keyword': {color: cssVars.syntax.keyword},
    '&.number': {color: cssVars.syntax.number},
    '&.operator': {color: cssVars.syntax.operator},
    '&.prolog': {color: cssVars.syntax.prolog},
    '&.property': {color: cssVars.syntax.property},
    '&.pseudo-class': {color: cssVars.syntax.pseudoClass},
    '&.pseudo-element': {color: cssVars.syntax.pseudoElement},
    '&.punctuation': {color: cssVars.syntax.punctuation},
    '&.regex': {color: cssVars.syntax.regex},
    '&.selector': {color: cssVars.syntax.selector},
    '&.string': {color: cssVars.syntax.string},
    '&.symbol': {color: cssVars.syntax.symbol},
    '&.tag': {color: cssVars.syntax.tag},
    '&.unit': {color: cssVars.syntax.unit},
    '&.url': {color: cssVars.syntax.url},
    '&.variable': {color: cssVars.syntax.variable},
  }
}

export function codeBaseStyle(): ReturnType<typeof css> {
  return css`
    color: var(--card-code-fg-color);

    & code {
      font-family: inherit;

      &.refractor .token {
        ${codeSyntaxHighlightingStyle}
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
