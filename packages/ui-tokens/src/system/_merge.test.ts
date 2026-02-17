import {expect, test} from 'vitest'

import {_merge} from './_merge'

test('_merge should deeply merge objects with later values winning', () => {
  const base = {
    element: {
      tinted: {
        default: {
          bg: {0: ['white', 'black']},
        },
      },
    },
  }

  const suggest = {
    _hue: 'purple',
    element: {
      tinted: {
        default: {
          bg: {0: ['100 75%', '900 75%']},
        },
      },
    },
  }

  const merged = _merge(base, suggest)

  expect(merged).toEqual({
    _hue: 'purple',
    element: {
      tinted: {
        default: {
          bg: {0: ['100 75%', '900 75%']},
        },
      },
    },
  })

  // Verify the specific path we care about
  expect(merged.element.tinted.default.bg[0]).toEqual(['100 75%', '900 75%'])
})
