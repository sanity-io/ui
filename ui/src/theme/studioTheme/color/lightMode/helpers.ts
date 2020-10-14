import {color, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode, ThemeSyntaxColor} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: hue[500].hex,
    },
    disabled: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: hue[500].hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: color.white.hex,
      border: hue[600].hex,
    },
    pressed: {
      bg: hue[700].hex,
      fg: color.white.hex,
      border: hue[700].hex,
    },
    selected: {
      bg: hue[800].hex,
      fg: color.white.hex,
      border: hue[800].hex,
    },
  }
}

export function buildButtonGhostMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: color.white.hex,
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    disabled: {
      bg: color.white.hex,
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: color.white.hex,
      border: hue[600].hex,
    },
    pressed: {
      bg: hue[700].hex,
      fg: color.white.hex,
      border: hue[700].hex,
    },
    selected: {
      bg: hue[800].hex,
      fg: color.white.hex,
      border: hue[800].hex,
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: color.white.hex,
      fg: hue[600].hex,
      border: color.white.hex,
    },
    disabled: {
      bg: color.white.hex,
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    hovered: {
      bg: hue[50].hex,
      fg: hue[800].hex,
      border: hue[50].hex,
    },
    pressed: {
      bg: hue[100].hex,
      fg: hue[800].hex,
      border: hue[100].hex,
    },
    selected: {
      bg: color.blue[50].hex,
      fg: color.blue[600].hex,
      border: color.blue[50].hex,
    },
  }
}

export function buildSyntaxTone(): ThemeSyntaxColor {
  return {
    atrule: color.purple['600'].hex,
    attrName: color.green['600'].hex,
    attrValue: color.yellow['600'].hex,
    attribute: color.yellow['600'].hex,
    boolean: color.purple['600'].hex,
    builtin: color.orange['600'].hex,
    cdata: color.yellow['600'].hex,
    char: color.yellow['600'].hex,
    class: color.orange['600'].hex,
    className: color.cyan['600'].hex,
    comment: color.gray['400'].hex,
    constant: color.purple['600'].hex,
    deleted: color.red['600'].hex,
    doctype: color.gray['400'].hex,
    entity: color.red['600'].hex,
    function: color.green['600'].hex,
    hexcode: color.blue['600'].hex,
    id: color.purple['600'].hex,
    important: color.purple['600'].hex,
    inserted: color.yellow['600'].hex,
    keyword: color.magenta['600'].hex,
    number: color.purple['600'].hex,
    operator: color.magenta['600'].hex,
    prolog: color.gray['400'].hex,
    property: color.blue['600'].hex,
    pseudoClass: color.yellow['600'].hex,
    pseudoElement: color.yellow['600'].hex,
    punctuation: color.gray['600'].hex,
    regex: color.blue['600'].hex,
    selector: color.red['600'].hex,
    string: color.yellow['600'].hex,
    symbol: color.purple['600'].hex,
    tag: color.red['600'].hex,
    unit: color.orange['600'].hex,
    url: color.red['600'].hex,
    variable: color.red['600'].hex,
  }
}
