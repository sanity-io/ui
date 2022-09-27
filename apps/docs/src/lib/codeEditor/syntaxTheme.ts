import {tags as t} from '@lezer/highlight'
import {rgba} from '@sanity/ui'
import {Theme_v2} from '@sanity/ui/theme'
import {createTheme} from '@uiw/codemirror-themes'
import {Extension} from '@uiw/react-codemirror'

export function getSyntaxTheme(options: {theme: Theme_v2}): Extension {
  const {color, font} = options.theme

  return createTheme({
    theme: color._dark ? 'dark' : 'light',
    settings: {
      background: color.selectable.default.enabled.bg,
      foreground: color.selectable.default.enabled.code.fg,
      lineHighlight: color.selectable.default.enabled.bg,
      fontFamily: font.code.family,
      caret: color.focusRing,
      selection: rgba(color.focusRing, 0.2),
      selectionMatch: rgba(color.focusRing, 0.4),
      gutterBackground: color.selectable.default.disabled.bg,
      gutterForeground: color.selectable.default.disabled.code.fg,
      gutterActiveForeground: color.selectable.default.enabled.fg,
    },
    styles: [
      {
        tag: [t.heading, t.heading2, t.heading3, t.heading4, t.heading5, t.heading6],
        color: color.selectable.default.enabled.fg,
      },
      {tag: t.angleBracket, color: color.selectable.default.enabled.code.fg},
      {tag: t.atom, color: color.syntax.keyword},
      {tag: t.attributeName, color: color.syntax.attrName},
      {tag: t.bool, color: color.syntax.boolean},
      {tag: t.bracket, color: color.selectable.default.enabled.code.fg},
      {tag: t.className, color: color.syntax.className},
      {tag: t.comment, color: color.syntax.comment},
      {tag: t.definition(t.typeName), color: color.syntax.function},
      {
        tag: [
          t.definition(t.variableName),
          t.function(t.variableName),
          t.className,
          t.attributeName,
        ],
        color: color.syntax.function,
      },
      {
        tag: [t.function(t.propertyName), t.propertyName],
        color: color.syntax.function,
      },
      {tag: t.keyword, color: color.syntax.keyword},
      {tag: t.null, color: color.syntax.number},
      {tag: t.number, color: color.syntax.number},
      {tag: t.meta, color: color.selectable.default.enabled.code.fg},
      {tag: t.operator, color: color.syntax.operator},
      {tag: t.propertyName, color: color.syntax.property},
      {tag: [t.string, t.special(t.brace)], color: color.syntax.string},
      {tag: t.tagName, color: color.syntax.className},
      {tag: t.typeName, color: color.syntax.keyword},
    ],
  })
}
