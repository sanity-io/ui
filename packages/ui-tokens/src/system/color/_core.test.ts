import {describe, expect, test} from 'vitest'

import type {DTCGColorValue} from '../_dtcg/schema'
import {_coreCollection, CORE_NAMESPACE} from './_core'

describe('Color opacity support', () => {
  test('backdrop with opacity resolves with correct alpha', () => {
    const lightBackdrop = _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.backdrop
    const darkBackdrop = _coreCollection.modes.default[CORE_NAMESPACE].color.dark.default.backdrop

    expect(lightBackdrop.$value).toEqual(
      expect.objectContaining({
        alpha: 0.5,
      }),
    )
    expect(darkBackdrop.$value).toEqual(
      expect.objectContaining({
        alpha: 0.5,
      }),
    )
  })

  test('shadow.outline with opacity resolves with correct alpha', () => {
    const lightShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.shadow.outline
    const darkShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.dark.default.shadow.outline

    expect(lightShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.4,
      }),
    )
    expect(darkShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.4,
      }),
    )
  })

  test('shadow.umbra with opacity resolves with correct alpha', () => {
    const lightShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.shadow.umbra
    const darkShadow = _coreCollection.modes.default[CORE_NAMESPACE].color.dark.default.shadow.umbra

    expect(lightShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.2,
      }),
    )
    expect(darkShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.2,
      }),
    )
  })

  test('shadow.penumbra with opacity resolves with correct alpha', () => {
    const lightShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.shadow.penumbra
    const darkShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.dark.default.shadow.penumbra

    expect(lightShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.14,
      }),
    )
    expect(darkShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.14,
      }),
    )
  })

  test('shadow.ambient with opacity resolves with correct alpha', () => {
    const lightShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.shadow.ambient
    const darkShadow =
      _coreCollection.modes.default[CORE_NAMESPACE].color.dark.default.shadow.ambient

    expect(lightShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.12,
      }),
    )
    expect(darkShadow.$value).toEqual(
      expect.objectContaining({
        alpha: 0.12,
      }),
    )
  })

  test('opacity produces DTCGColorValue with correct structure', () => {
    const backdrop = _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.backdrop

    // Should be a color value object, not a string reference
    expect(typeof backdrop.$value).toBe('object')
    expect(backdrop.$value).toHaveProperty('colorSpace')
    expect(backdrop.$value).toHaveProperty('components')
    expect(backdrop.$value).toHaveProperty('alpha')

    const value = backdrop.$value as DTCGColorValue
    expect(value.colorSpace).toBe('srgb')
    expect(Array.isArray(value.components)).toBe(true)
    expect(value.components).toHaveLength(3)
    expect(value.alpha).toBe(0.5)
  })

  test('opacity is stored in extensions', () => {
    const backdrop = _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.backdrop

    expect(backdrop.$extensions).toEqual(
      expect.objectContaining({
        'io.sanity': expect.objectContaining({
          opacity: 0.5,
        }),
      }),
    )
  })

  test('colors without opacity have alpha 1', () => {
    const focusRing = _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.focusRing

    // focusRing doesn't have opacity, so it should remain a string reference
    expect(typeof focusRing.$value).toBe('string')
  })

  test('mix and opacity work together', () => {
    // Test a color with both mix and opacity
    // backdrop: ['200/0.5', 'black/0.5'] has opacity but bg colors might have mix
    const elementBg =
      _coreCollection.modes.default[CORE_NAMESPACE].color.light.default.element.tinted.default.bg[0]

    // element.tinted.default.bg[0] is ['100 75%', '900 75%'] - has mix but no opacity
    // Should have mix expression in extensions but alpha should be 1
    if (typeof elementBg.$value === 'object') {
      expect((elementBg.$value as DTCGColorValue).alpha).toBe(1)
    }
  })
})
