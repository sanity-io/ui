import {type BgPattern} from '@sanity/ui-tokens'
import {createVar} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

const _vars = {
  ink: createVar('ink'),
  step: createVar('step'),
  dot: createVar('dot'),
}

export const patterns: Record<BgPattern, string> = {
  checkered: _style(
    _layers.prop,
    {
      backgroundImage: `
        conic-gradient(${_vars.ink} 0 90deg, transparent 0 180deg, ${_vars.ink} 0 270deg, transparent 0)
      `,

      backgroundSize: `
        calc(${_vars.step} * 2) calc(${_vars.step} * 2)
      `,

      backgroundPosition: `
        0 0,
        ${_vars.step} ${_vars.step}
      `,

      vars: {
        [_vars.step]: vars.space[2], // size of one square
        [_vars.ink]: vars.color.muted.bg, // dark squares
      },
    },
    'checkered',
  ),

  halftone: _style(
    _layers.prop,
    {
      backgroundImage: `
        radial-gradient(circle, ${_vars.ink} ${_vars.dot}, transparent ${_vars.dot}),
        radial-gradient(circle, ${_vars.ink} ${_vars.dot}, transparent ${_vars.dot})
      `,
      backgroundSize: `${_vars.step} ${_vars.step}`,
      backgroundPosition: `
        1px 1px,
        calc(${_vars.step} / 2 + 1px) calc(${_vars.step} / 2 + 1px)
      `,
      backgroundAttachment: 'fixed',

      vars: {
        [_vars.dot]: `0.5px`,
        [_vars.step]: vars.space[2],
        [_vars.ink]: vars.color.muted.border,
      },
    },
    'halftone',
  ),

  grid: _style(
    _layers.prop,
    {
      backgroundImage: `
        linear-gradient(to right, ${_vars.ink} 1px, transparent 1px),
        linear-gradient(to bottom, ${_vars.ink} 1px, transparent 1px)
      `,

      backgroundSize: `
        ${_vars.step} ${_vars.step},
        ${_vars.step} ${_vars.step}
      `,

      backgroundPosition: `
        calc(${_vars.step} - 1px) 0,
        0 calc(${_vars.step} - 1px)
      `,

      vars: {
        [_vars.step]: vars.space[2], // distance between grid lines
        [_vars.ink]: vars.color.muted.bg,
      },
    },
    'grid',
  ),
}
