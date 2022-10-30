import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {Theme} from '../../theme'

function codeSyntaxHighlightingStyle({theme}: ThemeProps): CSSObject {
  const color = theme.sanity.color.syntax

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

export function codeBaseStyle({theme}: {theme: Theme}): CSSObject {
  return {
    color: 'var(--card-code-fg-color)',

    '& code': {
      fontFamily: 'inherit',

      '&.refractor .token': codeSyntaxHighlightingStyle({theme}),
    },

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      borderRadius: '1px',
    },

    '& [data-sanity-icon]': {
      verticalAlign: 'baseline',
    },
  }
}
