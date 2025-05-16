import {color} from '@sanity/color'
import {HUES, TINTS} from '@sanity/ui/theme'

import {varNames} from '../varNames'
import {compileRule} from './compileRule'

export function compilePalette(): string {
  const props: Record<string, string> = {
    ...compileHues(),

    [varNames.black]: color.black.hex,
    [varNames.white]: color.white.hex,
  }

  return compileRule(':root', props, {keyframes: {}, media: {}})
}

function compileHues() {
  const rules: Record<string, string> = {}

  for (const hue of HUES) {
    for (const tint of TINTS) {
      rules[varNames[hue][tint]] = color[hue][tint].hex
    }
  }

  return rules
}
