import {black, hues, ColorHueKey} from '@sanity/color'
import {ThemeButtonColorMode} from '../../../types'

export function buildButtonDefaultMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: hue[300].hex,
      fg: black.hex,
      border: 'transparent',
    },
    disabled: {
      bg: hue[800].hex,
      fg: black.hex,
      border: 'transparent',
    },
    hovered: {
      bg: hue[400].hex,
      fg: black.hex,
      border: 'transparent',
    },
    pressed: {
      bg: hue[500].hex,
      fg: black.hex,
      border: 'transparent',
    },
    selected: {
      bg: hue[600].hex,
      fg: black.hex,
      border: 'transparent',
    },
  }
}

export function buildButtonGhostMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

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
      fg: black.hex,
      border: 'transparent',
    },
    pressed: {
      bg: hue[500].hex,
      fg: black.hex,
      border: 'transparent',
    },
    selected: {
      bg: hue[600].hex,
      fg: black.hex,
      border: 'transparent',
    },
  }
}

export function buildButtonBleedMode(hueKey: ColorHueKey): ThemeButtonColorMode {
  const hue = hues[hueKey]

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
      bg: hues.blue[900].hex,
      fg: hues.blue[300].hex,
      border: 'transparent',
    },
  }
}
