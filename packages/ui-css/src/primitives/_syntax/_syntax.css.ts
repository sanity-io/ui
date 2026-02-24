import {_globalStyle} from '../../_globalStyle.css'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(_layers.primitive, {}, '')

_globalStyle(_layers.primitive, `${root} .token.atrule`, {
  color: vars.color.code.token.atrule,
})
_globalStyle(_layers.primitive, `${root} .token.attr-name`, {
  color: vars.color.code.token.attrName,
})
_globalStyle(_layers.primitive, `${root} .token.attr-value`, {
  color: vars.color.code.token.attrValue,
})
_globalStyle(_layers.primitive, `${root} .token.attribute`, {
  color: vars.color.code.token.attribute,
})
_globalStyle(_layers.primitive, `${root} .token.boolean`, {
  color: vars.color.code.token.boolean,
})
_globalStyle(_layers.primitive, `${root} .token.builtin`, {
  color: vars.color.code.token.builtin,
})
_globalStyle(_layers.primitive, `${root} .token.cdata`, {
  color: vars.color.code.token.cdata,
})
_globalStyle(_layers.primitive, `${root} .token.char`, {
  color: vars.color.code.token.char,
})
_globalStyle(_layers.primitive, `${root} .token.class`, {
  color: vars.color.code.token.class,
})
_globalStyle(_layers.primitive, `${root} .token.class-name`, {
  color: vars.color.code.token.className,
})
_globalStyle(_layers.primitive, `${root} .token.comment`, {
  color: vars.color.code.token.comment,
})
_globalStyle(_layers.primitive, `${root} .token.constant`, {
  color: vars.color.code.token.constant,
})
_globalStyle(_layers.primitive, `${root} .token.deleted`, {
  color: vars.color.code.token.deleted,
})
_globalStyle(_layers.primitive, `${root} .token.doctype`, {
  color: vars.color.code.token.doctype,
})
_globalStyle(_layers.primitive, `${root} .token.entity`, {
  color: vars.color.code.token.entity,
})
_globalStyle(_layers.primitive, `${root} .token.function`, {
  color: vars.color.code.token.function,
})
_globalStyle(_layers.primitive, `${root} .token.hexcode`, {
  color: vars.color.code.token.hexcode,
})
_globalStyle(_layers.primitive, `${root} .token.id`, {
  color: vars.color.code.token.id,
})
_globalStyle(_layers.primitive, `${root} .token.important`, {
  color: vars.color.code.token.important,
})
_globalStyle(_layers.primitive, `${root} .token.inserted`, {
  color: vars.color.code.token.inserted,
})
_globalStyle(_layers.primitive, `${root} .token.keyword`, {
  color: vars.color.code.token.keyword,
})
_globalStyle(_layers.primitive, `${root} .token.number`, {
  color: vars.color.code.token.number,
})
_globalStyle(_layers.primitive, `${root} .token.operator`, {
  color: vars.color.code.token.operator,
})
_globalStyle(_layers.primitive, `${root} .token.prolog`, {
  color: vars.color.code.token.prolog,
})
_globalStyle(_layers.primitive, `${root} .token.property`, {
  color: vars.color.code.token.property,
})
_globalStyle(_layers.primitive, `${root} .token.pseudo-class`, {
  color: vars.color.code.token.pseudoClass,
})
_globalStyle(_layers.primitive, `${root} .token.pseudo-element`, {
  color: vars.color.code.token.pseudoElement,
})
_globalStyle(_layers.primitive, `${root} .token.punctuation`, {
  color: vars.color.code.token.punctuation,
})

_globalStyle(_layers.primitive, `${root} .token.attr-value:not(.attr-equals).punctuation`, {
  color: 'inherit',
})

_globalStyle(_layers.primitive, `${root} .token.regex`, {
  color: vars.color.code.token.regex,
})
_globalStyle(_layers.primitive, `${root} .token.selector`, {
  color: vars.color.code.token.selector,
})
_globalStyle(_layers.primitive, `${root} .token.string`, {
  color: vars.color.code.token.string,
})
_globalStyle(_layers.primitive, `${root} .token.symbol`, {
  color: vars.color.code.token.symbol,
})
_globalStyle(_layers.primitive, `${root} .token.tag`, {
  color: vars.color.code.token.tag,
})
_globalStyle(_layers.primitive, `${root} .token.unit`, {
  color: vars.color.code.token.unit,
})
_globalStyle(_layers.primitive, `${root} .token.url`, {
  color: vars.color.code.token.url,
})
_globalStyle(_layers.primitive, `${root} .token.variable`, {
  color: vars.color.code.token.variable,
})
