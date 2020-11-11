import {black, hues, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: hue[300].hex,
      fg: black.hex,
      border: hue[300].hex,
    },
    disabled: {
      bg: hue[800].hex,
      fg: black.hex,
      border: hue[800].hex,
    },
    hovered: {
      bg: hue[400].hex,
      fg: black.hex,
      border: hue[400].hex,
    },
    pressed: {
      bg: hue[500].hex,
      fg: black.hex,
      border: hue[500].hex,
    },
    selected: {
      bg: hues.blue[600].hex,
      fg: black.hex,
      border: hues.blue[600].hex,
    },
  }
}

export function buildButtonGhostMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: black.hex,
      fg: hue[400].hex,
      border: hue[800].hex,
    },
    disabled: {
      bg: black.hex,
      fg: hue[400].hex,
      border: hue[800].hex,
    },
    hovered: {
      bg: hue[400].hex,
      fg: black.hex,
      border: hue[400].hex,
    },
    pressed: {
      bg: hue[500].hex,
      fg: black.hex,
      border: hue[500].hex,
    },
    selected: {
      bg: hues.blue[400].hex,
      fg: black.hex,
      border: hues.blue[400].hex,
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: black.hex,
      fg: hue[400].hex,
      border: black.hex,
    },
    disabled: {
      bg: black.hex,
      fg: hue[400].hex,
      border: black.hex,
    },
    hovered: {
      bg: hue[900].hex,
      fg: hue[300].hex,
      border: hue[900].hex,
    },
    pressed: {
      bg: hue[950].hex,
      fg: hue[200].hex,
      border: hue[950].hex,
    },
    selected: {
      bg: hues.blue[900].hex,
      fg: hues.blue[400].hex,
      border: hues.blue[900].hex,
    },
  }
}
