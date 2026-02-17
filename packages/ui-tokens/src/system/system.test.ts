import {expect, test} from 'vitest'

import type {DTCGColorValue} from './_dtcg/schema'
import {system} from './system'

test('system: default vs suggest bg.0', () => {
  const palette = system.collections._palette.modes.default._palette
  const defaultCardTone = system.collections._core.modes.default._core.color.light.default

  expect(
    //
    defaultCardTone.element.tinted.default.bg[0].$value,
  ).toBe('{_palette.white}')

  const suggestCardTone = system.collections._core.modes.default._core.color.light.suggest

  // should not equal _palette.purple.100
  expect(
    //
    (suggestCardTone.element.tinted.default.bg[0].$value as DTCGColorValue).hex,
  ).not.toBe((palette.purple[100].$value as DTCGColorValue).hex)

  expect(suggestCardTone.element.tinted.default.bg[0].$extensions?.['io.sanity']).toEqual({
    expr: {
      v: 1,
      op: 'mix',
      space: 'srgb',
      stops: [
        {
          color: '{_palette.white}',
          stop: 0,
        },
        {
          color: '{_palette.purple.100}',
          stop: 0.75,
        },
      ],
    },
  })
})

test('system: tinted.bg.0 should be the same for default and other element tones', () => {
  const scheme = system.collections._core.modes.default._core.color.light
  const card = scheme.suggest
  const defaultElement = card.element.tinted.default
  const suggestElement = card.element.tinted.suggest

  expect(defaultElement.bg[0].$value).toEqual(suggestElement.bg[0].$value)
})
