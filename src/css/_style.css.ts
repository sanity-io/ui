import {style, type StyleRule} from '@vanilla-extract/css'

export function _style(layer: string, rule: StyleRule): string {
  return style({
    '@layer': {
      [layer]: rule,
    },
  })
}
