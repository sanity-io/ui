import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.arrow': {
    'position': 'absolute',

    // todo: replace with vars?
    'width': 'var(--arrow-size)',
    'height': 'var(--arrow-size)',

    '@nest': {
      ':empty + &': {
        display: 'none',
      },

      '& > svg': {
        display: 'block',
        transformOrigin: `calc(var(--arrow-size) / 2) calc(var(--arrow-size) / 2)`,
      },

      // top

      '[data-placement^="top"] > &': {
        bottom: 'calc(0px - var(--arrow-size))',
      },

      '[data-placement^="top"] > & svg': {
        transform: 'rotate(0deg)',
      },

      // right

      '[data-placement^="right"] > &': {
        left: 'calc(0px - var(--arrow-size))',
      },

      '[data-placement^="right"] > & svg': {
        transform: 'rotate(90deg)',
      },

      // left

      '[data-placement^="left"] > &': {
        right: 'calc(0px - var(--arrow-size))',
      },

      '[data-placement^="left"] > & svg': {
        transform: 'rotate(-90deg)',
      },

      // bottom

      '[data-placement^="bottom"] > &': {
        top: 'calc(0px - var(--arrow-size))',
      },

      '[data-placement^="bottom"] > & svg': {
        transform: 'rotate(180deg)',
      },
    },
  },

  '.arrow-stroke': {
    stroke: vars.color.shadow.outline,
  },

  '.arrow-shape': {
    fill: vars.color.bg,
  },
}

export const _arrowStyle: Style = {layers: {primitive}}
