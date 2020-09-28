import {css} from 'styled-components'
import {Theme} from '../../theme'
import {rem} from '../helpers'

function codeSyntaxHighlightingStyles({theme}: {theme: Theme}) {
  const tone = theme.color.syntax.tones.default

  return css`
    & .token {
      &.atrule {
        color: ${tone.atrule};
      }
      &.attr-name {
        color: ${tone.attrName};
      }
      &.attr-value {
        color: ${tone.attrValue};
      }
      &.attribute {
        color: ${tone.attribute};
      }
      &.boolean {
        color: ${tone.boolean};
      }
      &.builtin {
        color: ${tone.builtin};
      }
      &.cdata {
        color: ${tone.cdata};
      }
      &.char {
        color: ${tone.char};
      }
      &.class {
        color: ${tone.class};
      }
      &.class-name {
        color: ${tone.className};
      }
      &.comment {
        color: ${tone.comment};
      }
      &.constant {
        color: ${tone.constant};
      }
      &.deleted {
        color: ${tone.deleted};
      }
      &.doctype {
        color: ${tone.doctype};
      }
      &.entity {
        color: ${tone.entity};
      }
      &.function {
        color: ${tone.function};
      }
      &.hexcode {
        color: ${tone.hexcode};
      }
      &.id {
        color: ${tone.id};
      }
      &.important {
        color: ${tone.important};
      }
      &.inserted {
        color: ${tone.inserted};
      }
      &.keyword {
        color: ${tone.keyword};
      }
      &.number {
        color: ${tone.number};
      }
      &.operator {
        color: ${tone.operator};
      }
      &.prolog {
        color: ${tone.prolog};
      }
      &.property {
        color: ${tone.property};
      }
      &.pseudo-class {
        color: ${tone.pseudoClass};
      }
      &.pseudo-element {
        color: ${tone.pseudoElement};
      }
      &.punctuation {
        color: ${tone.punctuation};
      }
      &.regex {
        color: ${tone.regex};
      }
      &.selector {
        color: ${tone.selector};
      }
      &.string {
        color: ${tone.string};
      }
      &.symbol {
        color: ${tone.symbol};
      }
      &.tag {
        color: ${tone.tag};
      }
      &.unit {
        color: ${tone.unit};
      }
      &.url {
        color: ${tone.url};
      }
      &.variable {
        color: ${tone.variable};
      }
    }
  `
}

export function codeBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.code.family};
    font-weight: ${theme.fonts.code.weights.regular};
    display: block;
    padding: ${rem(1)} 0 0;
    margin: 0 -0.05em;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & code {
      font-family: inherit;

      &.refractor {
        ${codeSyntaxHighlightingStyles}
      }
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}

export function codeSizeStyles(props: {size?: number; theme: Theme}) {
  const {sizes} = props.theme.fonts.code
  const size = props.size === undefined ? sizes[2] : sizes[props.size] || sizes[2]
  const capHeight = size.lineHeight - size.ascenderHeight - size.descenderHeight

  return css`
    font-size: ${rem(size.fontSize)};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }

    & svg {
      vertical-align: baseline;
      font-size: ${rem(size.iconSize)};
      margin: ${rem((capHeight - size.iconSize) / 2)};
    }
  `
}
