import {style, type StyleRule} from '@vanilla-extract/css'

import {BREAKPOINT_KEYS, BREAKPOINTS} from './constants'
import type {ResponsiveRules} from './types'

export function _responsiveStyle(layer: string, rule: StyleRule, id: string): ResponsiveRules {
  const rules: Partial<ResponsiveRules> = {}

  for (const key of BREAKPOINT_KEYS) {
    const bp = BREAKPOINTS[key]

    if (bp === 0) {
      rules[key] = style(
        {
          '@layer': {
            [layer]: rule,
          },
        },
        id,
      )
    } else {
      rules[key] = style(
        {
          '@layer': {
            [layer]: {
              '@container': {
                [`(min-width: ${bp}px)`]: rule,
              },
            },
          },
        },
        [id, key].join('-'),
      )
    }
  }

  return rules as ResponsiveRules
}
