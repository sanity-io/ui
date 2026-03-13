import {expect, test} from 'vitest'

import {_splitProps} from './_splitProps'

test('splitProps', () => {
  const props = {
    a: 1,
    b: 2,
    c: 3,
  }

  const [style, rest] = _splitProps(props, ['a', 'b'])

  expect(style).toEqual({a: 1, b: 2})
  expect(rest).toEqual({c: 3})
})
