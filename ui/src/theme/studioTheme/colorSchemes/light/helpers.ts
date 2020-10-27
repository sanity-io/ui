import {hues, white, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: hue[500].hex,
      fg: white.hex,
      border: hue[500].hex,
    },
    disabled: {
      bg: hue[500].hex,
      fg: white.hex,
      border: hue[500].hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: white.hex,
      border: hue[600].hex,
    },
    pressed: {
      bg: hue[700].hex,
      fg: white.hex,
      border: hue[700].hex,
    },
    selected: {
      bg: hue[800].hex,
      fg: white.hex,
      border: hue[800].hex,
    },
  }
}

export function buildButtonGhostMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: white.hex,
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    disabled: {
      bg: white.hex,
      fg: hue[600].hex,
      border: hue[200].hex,
    },
    hovered: {
      bg: hue[600].hex,
      fg: white.hex,
      border: hue[600].hex,
    },
    pressed: {
      bg: hue[700].hex,
      fg: white.hex,
      border: hue[700].hex,
    },
    selected: {
      bg: hue[800].hex,
      fg: white.hex,
      border: hue[800].hex,
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: white.hex,
      fg: hue[600].hex,
      border: white.hex,
    },
    disabled: {
      bg: white.hex,
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
      bg: hues.blue[50].hex,
      fg: hues.blue[600].hex,
      border: hues.blue[50].hex,
    },
  }
}
