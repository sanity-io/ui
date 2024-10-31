import {color} from '@sanity/color'
import {HUES, TINTS} from '@sanity/ui/theme'

import {_compileStyle} from './_compileStyle'
import {Properties} from './types'
import {varNames} from './varNames'

/** @internal */
export function _compilePalette(): string {
  return _compileStyle({
    layers: {
      palette: {
        ':root': compilePaletteProperties(),
      },
    },
  })
}

function compilePaletteProperties() {
  const rules: Properties = {
    [varNames.black]: color.black.hex,
    [varNames.white]: color.white.hex,
  }

  for (const hue of HUES) {
    for (const tint of TINTS) {
      rules[varNames[hue][tint]] = color[hue][tint].hex
    }
  }

  return rules
}
