import {hues} from '@sanity/color'
import {responsiveCodeFontStyle, ColorSchemeKey, Theme} from '@sanity/ui'
import {rgba} from 'polished'
import {css} from 'styled-components'

export function codeEditor() {
  return css`
    height: 100%;

    &::selection {
      background: none;
    }

    & > .react-codemirror2 {
      ${responsiveCodeFontStyle}
      height: 100%;
    }

    .CodeMirror {
      background: none;
      font: inherit;
      color: inherit;
      height: 100%;
    }

    .CodeMirror-scroll {
      margin: 0;
      box-sizing: border-box;
      padding: 16px 0;
    }

    .CodeMirror-line::selection,
    .CodeMirror-line > span::selection,
    .CodeMirror-line > span > span::selection {
      background: ${rgba(hues.gray[500].hex, 0.25)};
    }

    .CodeMirror-selected {
      background: ${rgba(hues.gray[500].hex, 0.25)};
    }

    .CodeMirror-cursor {
      border-color: ${hues.blue[400].hex};
    }

    .CodeMirror pre.CodeMirror-line,
    .CodeMirror pre.CodeMirror-line-like {
      padding: 0 20px;
    }

    .CodeMirror-sizer {
      border-right-width: 20px !important;
    }
  `
}

export function codeEditorSyntax({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) {
  const syntax = theme.color[scheme].syntax.tones.default

  // @todo
  return css`
    /* DEFAULT THEME */
    .cm-s-default .cm-header {
      color: blue;
    }
    .cm-s-default .cm-quote {
      color: #090;
    }
    .cm-negative {
      color: #d44;
    }
    .cm-positive {
      color: #292;
    }
    .cm-header,
    .cm-strong {
      font-weight: bold;
    }
    .cm-em {
      font-style: italic;
    }
    .cm-link {
      text-decoration: underline;
    }
    .cm-strikethrough {
      text-decoration: line-through;
    }
    .cm-s-default .cm-keyword {
      color: ${syntax.keyword};
    }
    .cm-s-default .cm-atom {
      color: #219;
    }
    .cm-s-default .cm-number {
      color: ${syntax.number};
    }
    .cm-s-default .cm-def {
      color: ${syntax.function};
    }
    .cm-s-default .cm-variable,
    .cm-s-default .cm-punctuation,
    .cm-s-default .cm-property,
    .cm-s-default .cm-operator {
    }
    .cm-s-default .cm-variable-2 {
      color: #05a;
    }
    .cm-s-default .cm-variable-3,
    .cm-s-default .cm-type {
      color: #085;
    }
    .cm-s-default .cm-comment {
      color: #a50;
    }
    .cm-s-default .cm-string {
      color: ${syntax.string};
    }
    .cm-s-default .cm-string-2 {
      color: #f50;
    }
    .cm-s-default .cm-meta {
      color: #555;
    }
    .cm-s-default .cm-qualifier {
      color: #555;
    }
    .cm-s-default .cm-builtin {
      color: #30a;
    }
    .cm-s-default .cm-bracket {
      color: #997;
    }
    .cm-s-default .cm-tag {
      color: ${syntax.className};
    }
    .cm-s-default .cm-tag.cm-bracket {
      color: inherit;
    }
    .cm-s-default .cm-attribute {
      color: ${syntax.attrName};
    }
    .cm-s-default .cm-hr {
      color: #999;
    }
    .cm-s-default .cm-link {
      color: #00c;
    }
    .cm-s-default .cm-error {
      color: #f00;
    }
    .cm-invalidchar {
      color: #f00;
    }
    .CodeMirror-composing {
      border-bottom: 2px solid;
    }
    /* Default styles for common addons */
    div.CodeMirror span.CodeMirror-matchingbracket {
      color: #0b0;
    }
    div.CodeMirror span.CodeMirror-nonmatchingbracket {
      color: #a22;
    }
    .CodeMirror-matchingtag {
      background: rgba(255, 150, 0, 0.3);
    }
    .CodeMirror-activeline-background {
      background: #e8f2ff;
    }
  `
}
