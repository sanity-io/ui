import {expect, test} from 'vitest'
import {hues} from './color'
import {COLOR_HUES} from './constants'

test('should be generated', () => {
  expect(Object.keys(hues)).toEqual(COLOR_HUES)
})
