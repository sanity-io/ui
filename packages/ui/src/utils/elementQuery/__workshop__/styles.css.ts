import {vars} from '@sanity/ui/css'
import {style} from '@vanilla-extract/css'

export const testCard: string = style({
  selectors: {
    '[data-eq-min~="0"] > &': {
      vars: {
        [vars.color.fg]:
          `light-dark(${vars.color.palette.orange[600]}, ${vars.color.palette.orange[400]})`,
      },
    },
    '[data-eq-min~="1"] > &': {
      vars: {
        [vars.color.fg]:
          `light-dark(${vars.color.palette.red[600]}, ${vars.color.palette.red[400]})`,
      },
    },
    '[data-eq-min~="2"] > &': {
      vars: {
        [vars.color.fg]:
          `light-dark(${vars.color.palette.magenta[600]}, ${vars.color.palette.magenta[400]})`,
      },
    },
    '[data-eq-min~="3"] > &': {
      vars: {
        [vars.color.fg]:
          `light-dark(${vars.color.palette.purple[600]}, ${vars.color.palette.purple[400]})`,
      },
    },
  },
})
