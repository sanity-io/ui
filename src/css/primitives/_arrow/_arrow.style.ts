import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.arrow': {
    position: 'absolute',
    width: vars.arrow.size,
    height: vars.arrow.size,

    nest: {
      ':empty + &': {
        display: 'none',
      },

      '& > svg': {
        display: 'block',
        transformOrigin: `calc(${vars.arrow.size} / 2) calc(${vars.arrow.size} / 2)`,
      },

      // top
      '[data-placement^="top"] > &': {
        bottom: `calc(0px - ${vars.arrow.size})`,
      },
      '[data-placement^="top"] > & svg': {
        transform: 'rotate(0deg)',
      },

      // right
      '[data-placement^="right"] > &': {
        left: `calc(0px - ${vars.arrow.size})`,
      },
      '[data-placement^="right"] > & svg': {
        transform: 'rotate(90deg)',
      },

      // left
      '[data-placement^="left"] > &': {
        right: `calc(0px - ${vars.arrow.size})`,
      },
      '[data-placement^="left"] > & svg': {
        transform: 'rotate(-90deg)',
      },

      // bottom
      '[data-placement^="bottom"] > &': {
        top: `calc(0px - ${vars.arrow.size})`,
      },
      '[data-placement^="bottom"] > & svg': {
        transform: 'rotate(180deg)',
      },
    },
  },

  '.arrow-stroke-mask': {
    // @ts-expect-error `y` is not a valid property in 'csstype'
    y: vars.shadow.outline,
  },

  '.arrow-stroke': {
    stroke: vars.color.shadow.outline,
    strokeWidth: `calc(${vars.card.shadow.outline} * 2)`,
  },

  '.arrow-shape': {
    fill: vars.color.bg,
  },
}

export const _arrowStyle: Style = {layers: {primitive}}
