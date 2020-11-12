import {css} from 'styled-components'
import {ColorSchemeKey, Theme} from '../../theme'

function codeSyntaxHighlightingStyles({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.syntax.tones.default

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

    & svg {
      vertical-align: baseline;
    }
  `
}
