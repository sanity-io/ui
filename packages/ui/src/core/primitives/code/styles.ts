import {getTheme_v2} from '@sanity/ui/theme'
import {css, ExecutionContext} from 'styled-components'

function codeSyntaxHighlightingStyle({theme}: ExecutionContext) {
  const {
    color: {syntax: color},
  } = getTheme_v2(theme)

  return {
    '&.atrule': {color: color.atrule},
    '&.attr-name': {color: color.attrName},
    '&.attr-value': {color: color.attrValue},
    '&.attribute': {color: color.attribute},
    '&.boolean': {color: color.boolean},
    '&.builtin': {color: color.builtin},
    '&.cdata': {color: color.cdata},
    '&.char': {color: color.char},
    '&.class': {color: color.class},
    '&.class-name': {color: color.className},
    '&.comment': {color: color.comment},
    '&.constant': {color: color.constant},
    '&.deleted': {color: color.deleted},
    '&.doctype': {color: color.doctype},
    '&.entity': {color: color.entity},
    '&.function': {color: color.function},
    '&.hexcode': {color: color.hexcode},
    '&.id': {color: color.id},
    '&.important': {color: color.important},
    '&.inserted': {color: color.inserted},
    '&.keyword': {color: color.keyword},
    '&.number': {color: color.number},
    '&.operator': {color: color.operator},
    '&.prolog': {color: color.prolog},
    '&.property': {color: color.property},
    '&.pseudo-class': {color: color.pseudoClass},
    '&.pseudo-element': {color: color.pseudoElement},
    '&.punctuation': {color: color.punctuation},
    '&.regex': {color: color.regex},
    '&.selector': {color: color.selector},
    '&.string': {color: color.string},
    '&.symbol': {color: color.symbol},
    '&.tag': {color: color.tag},
    '&.unit': {color: color.unit},
    '&.url': {color: color.url},
    '&.variable': {color: color.variable},
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
