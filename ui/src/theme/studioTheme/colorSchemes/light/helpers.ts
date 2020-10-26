import {color, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode} from '../../../types'

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
