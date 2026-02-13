import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  position: 'absolute',
  width: vars.arrow.size,
  height: vars.arrow.size,

  selectors: {
    ':empty + &': {
      display: 'none',
    },

    '[data-placement^="top"] &': {
      bottom: `calc(0px - ${vars.arrow.size})`,
    },

    '[data-placement^="right"] &': {
      left: `calc(0px - ${vars.arrow.size})`,
    },

    '[data-placement^="left"] &': {
      right: `calc(0px - ${vars.arrow.size})`,
    },

    '[data-placement^="bottom"] &': {
      top: `calc(0px - ${vars.arrow.size})`,
    },
  },
})

export const svg: string = _style(layers.primitives, {
  display: 'block',
  transformOrigin: `calc(${vars.arrow.size} / 2) calc(${vars.arrow.size} / 2)`,

  selectors: {
    '[data-placement^="top"] &': {
      transform: 'rotate(0deg)',
    },

    '[data-placement^="right"] &': {
      transform: 'rotate(90deg)',
    },

    '[data-placement^="left"] &': {
      transform: 'rotate(-90deg)',
    },

    '[data-placement^="bottom"] &': {
      transform: 'rotate(180deg)',
    },
  },
})

export const strokeMask: string = _style(layers.primitives, {
  // @ts-expect-error `y` is not a valid property in 'csstype'
  y: vars.shadow.outline,
})

export const stroke: string = _style(layers.primitives, {
  stroke: vars.color.shadow.outline,
  strokeWidth: `calc(${vars.card.shadow.outline} * 2)`,
})

export const fill: string = _style(layers.primitives, {
  fill: vars.color.bg,
})
