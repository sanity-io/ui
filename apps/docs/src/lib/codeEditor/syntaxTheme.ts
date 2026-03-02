import {tags as t} from '@lezer/highlight'
import {vars} from '@sanity/ui/css'
import {ColorScheme} from '@sanity/ui/theme'
import {createTheme} from '@uiw/codemirror-themes'
import {Extension} from '@uiw/react-codemirror'

export function getSyntaxTheme(options: {scheme: ColorScheme}): Extension {
  const {scheme} = options

  // element color
  const {bg, fg} = vars.color.tinted.default

  // token color
  const c = vars.color.code.token

  return createTheme({
    theme: scheme,
    settings: {
      background: bg[0],
      foreground: fg[2],
      // lineHighlight: bg[1],
      // lineHighlight: `color-mix(in srgb, transparent, ${vars.color.focusRing} 10%)`,
      lineHighlight: 'transparent',
      fontFamily: vars.font.code.family,
      caret: vars.color.focusRing,
      selection: `color-mix(in srgb, transparent, ${vars.color.focusRing} 20%)`,
      selectionMatch: `color-mix(in srgb, transparent, ${vars.color.focusRing} 40%)`,
      gutterBackground: bg[1],
      gutterForeground: fg[4],
      gutterActiveForeground: fg[0],
    },
    styles: [
      {tag: [t.heading, t.heading2, t.heading3, t.heading4, t.heading5, t.heading6], color: fg[0]},
      {tag: t.angleBracket, color: fg[2]},
      {tag: t.atom, color: c.keyword},
      {tag: t.attributeName, color: c.attrName},
      {tag: t.bool, color: c.boolean},
      {tag: t.bracket, color: fg[2]},
      {tag: t.className, color: c.className},
      {tag: t.comment, color: c.comment},
      {tag: t.definition(t.typeName), color: c.function},
      {
        tag: [
          t.definition(t.variableName),
          t.function(t.variableName),
          t.className,
          t.attributeName,
        ],
        color: c.function,
      },
      {tag: [t.function(t.propertyName), t.propertyName], color: c.function},
      {tag: t.keyword, color: c.keyword},
      {tag: t.null, color: c.number},
      {tag: t.number, color: c.number},
      {tag: t.meta, color: fg[2]},
      {tag: t.operator, color: c.operator},
      {tag: t.propertyName, color: c.property},
      {tag: [t.string, t.special(t.brace)], color: c.string},
      {tag: t.tagName, color: c.className},
      {tag: t.typeName, color: c.keyword},
    ],
  })
}
