import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.token': {
    _prefix: false,

    nest: {
      '&.atrule': {color: vars.color.code.token.atrule},
      '&.attr-name': {color: vars.color.code.token.attrName},
      '&.attr-value': {color: vars.color.code.token.attrValue},
      '&.attribute': {color: vars.color.code.token.attribute},
      '&.boolean': {color: vars.color.code.token.boolean},
      '&.builtin': {color: vars.color.code.token.builtin},
      '&.cdata': {color: vars.color.code.token.cdata},
      '&.char': {color: vars.color.code.token.char},
      '&.class': {color: vars.color.code.token.class},
      '&.class-name': {color: vars.color.code.token.className},
      '&.comment': {color: vars.color.code.token.comment},
      '&.constant': {color: vars.color.code.token.constant},
      '&.deleted': {color: vars.color.code.token.deleted},
      '&.doctype': {color: vars.color.code.token.doctype},
      '&.entity': {color: vars.color.code.token.entity},
      '&.function': {color: vars.color.code.token.function},
      '&.hexcode': {color: vars.color.code.token.hexcode},
      '&.id': {color: vars.color.code.token.id},
      '&.important': {color: vars.color.code.token.important},
      '&.inserted': {color: vars.color.code.token.inserted},
      '&.keyword': {color: vars.color.code.token.keyword},
      '&.number': {color: vars.color.code.token.number},
      '&.operator': {color: vars.color.code.token.operator},
      '&.prolog': {color: vars.color.code.token.prolog},
      '&.property': {color: vars.color.code.token.property},
      '&.pseudo-class': {color: vars.color.code.token.pseudoClass},
      '&.pseudo-element': {color: vars.color.code.token.pseudoElement},
      '&.punctuation': {color: vars.color.code.token.punctuation},
      '&.attr-value &:not(.attr-equals).punctuation': {color: 'inherit'},
      '&.regex': {color: vars.color.code.token.regex},
      '&.selector': {color: vars.color.code.token.selector},
      '&.string': {color: vars.color.code.token.string},
      '&.symbol': {color: vars.color.code.token.symbol},
      '&.tag': {color: vars.color.code.token.tag},
      '&.unit': {color: vars.color.code.token.unit},
      '&.url': {color: vars.color.code.token.url},
      '&.variable': {color: vars.color.code.token.variable},
    },
  },
}

export const tokenStyle: Style = {layers: {primitive}}
