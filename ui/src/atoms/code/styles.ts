import {css} from 'styled-components'
import {Theme} from '../../theme'

function codeSyntaxHighlightingStyles({theme}: {theme: Theme}) {
  const color = theme.sanity.color.syntax

  return css`
    & .token {
      &.atrule {
        color: ${color.atrule};
      }
      &.attr-name {
        color: ${color.attrName};
      }
      &.attr-value {
        color: ${color.attrValue};
      }
      &.attribute {
        color: ${color.attribute};
      }
      &.boolean {
        color: ${color.boolean};
      }
      &.builtin {
        color: ${color.builtin};
      }
      &.cdata {
        color: ${color.cdata};
      }
      &.char {
        color: ${color.char};
      }
      &.class {
        color: ${color.class};
      }
      &.class-name {
        color: ${color.className};
      }
      &.comment {
        color: ${color.comment};
      }
      &.constant {
        color: ${color.constant};
      }
      &.deleted {
        color: ${color.deleted};
      }
      &.doctype {
        color: ${color.doctype};
      }
      &.entity {
        color: ${color.entity};
      }
      &.function {
        color: ${color.function};
      }
      &.hexcode {
        color: ${color.hexcode};
      }
      &.id {
        color: ${color.id};
      }
      &.important {
        color: ${color.important};
      }
      &.inserted {
        color: ${color.inserted};
      }
      &.keyword {
        color: ${color.keyword};
      }
      &.number {
        color: ${color.number};
      }
      &.operator {
        color: ${color.operator};
      }
      &.prolog {
        color: ${color.prolog};
      }
      &.property {
        color: ${color.property};
      }
      &.pseudo-class {
        color: ${color.pseudoClass};
      }
      &.pseudo-element {
        color: ${color.pseudoElement};
      }
      &.punctuation {
        color: ${color.punctuation};
      }
      &.regex {
        color: ${color.regex};
      }
      &.selector {
        color: ${color.selector};
      }
      &.string {
        color: ${color.string};
      }
      &.symbol {
        color: ${color.symbol};
      }
      &.tag {
        color: ${color.tag};
      }
      &.unit {
        color: ${color.unit};
      }
      &.url {
        color: ${color.url};
      }
      &.variable {
        color: ${color.variable};
      }
    }
  `
}

export function codeBaseStyles(props: {muted: boolean; theme: Theme}) {
  const {muted} = props

  return css`
    ${muted &&
    css`
      color: var(--card-muted-fg-color);
    `}

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

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
