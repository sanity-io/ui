import {style, type StyleRule} from '@vanilla-extract/css'

import {BREAKPOINTS} from './constants'
import type {ResponsiveRules} from './types'

export function _responsiveStyle(layer: string, rule: StyleRule): ResponsiveRules {
  const rules: Partial<ResponsiveRules> = {}

  for (const _index of Object.keys(BREAKPOINTS)) {
    const index = Number(_index) as keyof typeof BREAKPOINTS

    const bp = BREAKPOINTS[index]

    if (bp === 0) {
      rules[index] = style({
        '@layer': {
          [layer]: rule,
        },
      })
    } else {
      rules[index] = style({
        '@layer': {
          [layer]: {
            '@media': {
              [`screen and (min-width: ${bp}px)`]: rule,
            },
          },
        },
      })
    }
  }

  return rules as ResponsiveRules
}
