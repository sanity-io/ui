import {_layers} from '../../layers.css'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root = _style(_layers.primitive, {}, '')

_globalStyle(_layers.primitive, `${root} .token.atrule`, {
  color: vars.code.color.token.atrule,
})
_globalStyle(_layers.primitive, `${root} .token.attr-name`, {
  color: vars.code.color.token.attrName,
})
_globalStyle(_layers.primitive, `${root} .token.attr-value`, {
  color: vars.code.color.token.attrValue,
})
_globalStyle(_layers.primitive, `${root} .token.attribute`, {
  color: vars.code.color.token.attribute,
})
_globalStyle(_layers.primitive, `${root} .token.boolean`, {
  color: vars.code.color.token.boolean,
})
_globalStyle(_layers.primitive, `${root} .token.builtin`, {
  color: vars.code.color.token.builtin,
})
_globalStyle(_layers.primitive, `${root} .token.cdata`, {
  color: vars.code.color.token.cdata,
})
_globalStyle(_layers.primitive, `${root} .token.char`, {
  color: vars.code.color.token.char,
})
_globalStyle(_layers.primitive, `${root} .token.class`, {
  color: vars.code.color.token.class,
})
_globalStyle(_layers.primitive, `${root} .token.class-name`, {
  color: vars.code.color.token.className,
})
_globalStyle(_layers.primitive, `${root} .token.comment`, {
  color: vars.code.color.token.comment,
})
_globalStyle(_layers.primitive, `${root} .token.constant`, {
  color: vars.code.color.token.constant,
})
_globalStyle(_layers.primitive, `${root} .token.deleted`, {
  color: vars.code.color.token.deleted,
})
_globalStyle(_layers.primitive, `${root} .token.doctype`, {
  color: vars.code.color.token.doctype,
})
_globalStyle(_layers.primitive, `${root} .token.entity`, {
  color: vars.code.color.token.entity,
})
_globalStyle(_layers.primitive, `${root} .token.function`, {
  color: vars.code.color.token.function,
})
_globalStyle(_layers.primitive, `${root} .token.hexcode`, {
  color: vars.code.color.token.hexcode,
})
_globalStyle(_layers.primitive, `${root} .token.id`, {
  color: vars.code.color.token.id,
})
_globalStyle(_layers.primitive, `${root} .token.important`, {
  color: vars.code.color.token.important,
})
_globalStyle(_layers.primitive, `${root} .token.inserted`, {
  color: vars.code.color.token.inserted,
})
_globalStyle(_layers.primitive, `${root} .token.keyword`, {
  color: vars.code.color.token.keyword,
})
_globalStyle(_layers.primitive, `${root} .token.number`, {
  color: vars.code.color.token.number,
})
_globalStyle(_layers.primitive, `${root} .token.operator`, {
  color: vars.code.color.token.operator,
})
_globalStyle(_layers.primitive, `${root} .token.prolog`, {
  color: vars.code.color.token.prolog,
})
_globalStyle(_layers.primitive, `${root} .token.property`, {
  color: vars.code.color.token.property,
})
_globalStyle(_layers.primitive, `${root} .token.pseudo-class`, {
  color: vars.code.color.token.pseudoClass,
})
_globalStyle(_layers.primitive, `${root} .token.pseudo-element`, {
  color: vars.code.color.token.pseudoElement,
})
_globalStyle(_layers.primitive, `${root} .token.punctuation`, {
  color: vars.code.color.token.punctuation,
})

_globalStyle(_layers.primitive, `${root} .token.attr-value:not(.attr-equals).punctuation`, {
  color: 'inherit',
})

_globalStyle(_layers.primitive, `${root} .token.regex`, {
  color: vars.code.color.token.regex,
})
_globalStyle(_layers.primitive, `${root} .token.selector`, {
  color: vars.code.color.token.selector,
})
_globalStyle(_layers.primitive, `${root} .token.string`, {
  color: vars.code.color.token.string,
})
_globalStyle(_layers.primitive, `${root} .token.symbol`, {
  color: vars.code.color.token.symbol,
})
_globalStyle(_layers.primitive, `${root} .token.tag`, {
  color: vars.code.color.token.tag,
})
_globalStyle(_layers.primitive, `${root} .token.unit`, {
  color: vars.code.color.token.unit,
})
_globalStyle(_layers.primitive, `${root} .token.url`, {
  color: vars.code.color.token.url,
})
_globalStyle(_layers.primitive, `${root} .token.variable`, {
  color: vars.code.color.token.variable,
})
