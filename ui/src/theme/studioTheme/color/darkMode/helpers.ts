import {color, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode, ThemeSyntaxColor} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    disabled: {
      bg: hue[500].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    hovered: {
      bg: hue[400].hex,
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
      fg: hue[400].hex,
      border: hue[800].hex,
    },
    disabled: {
      bg: 'transparent',
      fg: hue[400].hex,
      border: hue[800].hex,
    },
    hovered: {
      bg: hue[400].hex,
      fg: color.white.hex,
      border: 'transparent',
    },
    pressed: {
      bg: 'transparent',
      fg: hue[400].hex,
      border: hue[800].hex,
    },
    selected: {
      bg: 'transparent',
      fg: hue[400].hex,
      border: hue[800].hex,
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = color[hueKey]

  return {
    enabled: {
      bg: 'transparent',
      fg: hue[400].hex,
      border: 'transparent',
    },
    disabled: {
      bg: 'transparent',
      fg: hue[400].hex,
      border: 'transparent',
    },
    hovered: {
      bg: hue[900].hex,
      fg: hue[200].hex,
      border: 'transparent',
    },
    pressed: {
      bg: hue[950].hex,
      fg: hue[200].hex,
      border: 'transparent',
    },
    selected: {
      bg: color.blue[900].hex,
      fg: color.blue[300].hex,
      border: 'transparent',
    },
  }
}

export function buildSyntaxTone(): ThemeSyntaxColor {
  return {
    atrule: color.purple[400].hex,
    attrName: color.green[400].hex,
    attrValue: color.yellow[400].hex,
    attribute: color.yellow[400].hex,
    boolean: color.purple[400].hex,
    builtin: color.orange[400].hex,
    cdata: color.yellow[400].hex,
    char: color.yellow[400].hex,
    class: color.orange[400].hex,
    className: color.cyan[400].hex,
    comment: color.gray[600].hex,
    constant: color.purple[400].hex,
    deleted: color.red[400].hex,
    doctype: color.gray[600].hex,
    entity: color.red[400].hex,
    function: color.green[400].hex,
    hexcode: color.blue[400].hex,
    id: color.purple[400].hex,
    important: color.purple[400].hex,
    inserted: color.yellow[400].hex,
    keyword: color.magenta[400].hex,
    number: color.purple[400].hex,
    operator: color.magenta[400].hex,
    prolog: color.gray[600].hex,
    property: color.blue[400].hex,
    pseudoClass: color.yellow[400].hex,
    pseudoElement: color.yellow[400].hex,
    punctuation: color.gray[400].hex,
    regex: color.blue[400].hex,
    selector: color.red[400].hex,
    string: color.yellow[400].hex,
    symbol: color.purple[400].hex,
    tag: color.red[400].hex,
    unit: color.orange[400].hex,
    url: color.red[400].hex,
    variable: color.red[400].hex,
  }
}
