import {createVar} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

/**
 * Local arrow variables
 *
 * @internal
 */
export const _arrowVars = {
  size: createVar('size'),
}

export const root: string = _style(
  _layers.primitive,
  {
    position: 'absolute',
    width: _arrowVars.size,
    height: _arrowVars.size,

    selectors: {
      ':empty + &': {
        display: 'none',
      },

      '[data-placement^="top"] &': {
        bottom: `calc(0px - ${_arrowVars.size})`,
      },

      '[data-placement^="right"] &': {
        left: `calc(0px - ${_arrowVars.size})`,
      },

      '[data-placement^="left"] &': {
        right: `calc(0px - ${_arrowVars.size})`,
      },

      '[data-placement^="bottom"] &': {
        top: `calc(0px - ${_arrowVars.size})`,
      },
    },
  },
  '',
)

export const svg: string = _style(
  _layers.primitive,
  {
    display: 'block',
    transformOrigin: `calc(${_arrowVars.size} / 2) calc(${_arrowVars.size} / 2)`,

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
  },
  'svg',
)

export const strokeMask: string = _style(
  _layers.primitive,
  {
    // @ts-expect-error `y` is not a valid property in 'csstype'
    y: vars.shadow.outline,
  },
  'stroke-mask',
)

export const stroke: string = _style(
  _layers.primitive,
  {
    stroke: vars.color.shadow.outline,
    // TODO: use same variable as shadows somehow
    // strokeWidth: vars.border[1],
    strokeWidth: vars.card.outline,
    // strokeWidth: `calc(${vars.shadow[1]?.outline || 0.5} * 2)`,
  },
  'stroke',
)

export const fill: string = _style(
  _layers.primitive,
  {
    fill: vars.color.bg,
  },
  'fill',
)
