import {style, type StyleRule} from '@vanilla-extract/css'

export function _style(layer: string, rule: StyleRule) {
  return style({
    '@layer': {
      [layer]: rule,
    },
  })
}
