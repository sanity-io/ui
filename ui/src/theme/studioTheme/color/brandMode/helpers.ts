import {color, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode, ThemeSyntaxColor} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: hue[500].hex,
      border: 'transparent',
      fg: color.white.hex,
    },
    disabled: {
      bg: hue[500].hex,
      border: 'transparent',
      fg: color.white.hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    pressed: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    selected: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
  }
}

export function buildButtonGhostMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: 'transparent',
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    disabled: {
      bg: 'transparent',
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    pressed: {
      bg: 'transparent',
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    selected: {
      bg: 'transparent',
      fg: hue[600].hex,
      border: hue[200].hex,
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: 'transparent',
      fg: hue[100].hex,
      border: 'transparent',
    },
    disabled: {
      bg: 'transparent',
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    hovered: {
      bg: color.blue[600].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    pressed: {
      bg: color.blue[700].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    selected: {
      bg: color.blue[700].hex,
      fg: color.white.hex,
      border: 'transparent',
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
