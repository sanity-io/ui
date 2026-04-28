import {expect, test} from 'vitest'

import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import {type _ResolveColorOptions, _resolveColorToken} from './_resolveColorToken'

test('_resolveColorToken', () => {
  const bgExpr: ColorExpr = {
    type: 'keyword',
    name: 'white',
    opacity: 1,
    mix: 1,
  }

  const options: _ResolveColorOptions = {
    bg: bgExpr,
    systemBg: bgExpr,
  }

  const debugId = 'test'

  const backdropExpr: ColorExpr = {
    type: 'tint',
    hue: 'gray',
    tint: '200',
    mix: 1,
    opacity: 0.5,
  }

  const result = _resolveColorToken(backdropExpr, options, `${debugId}.backdrop`)

  expect(result).toMatchObject({
    $value: {
      colorSpace: 'srgb',
      components: [0.8901960784313725, 0.8941176470588236, 0.9098039215686274],
      hex: undefined,
      alpha: 0.5,
    },
    $extensions: {
      'io.sanity.name': undefined,
      'io.sanity.expr': {
        v: 1,
        op: 'mix',
        space: 'srgb',
        stops: [
          {
            color: {colorSpace: 'srgb', components: [0, 0, 0], alpha: 0},
            stop: 0,
          },
          {
            color: '{color.palette.gray.200}',
            stop: 0.5,
          },
        ],
      },
    },
  })
})
