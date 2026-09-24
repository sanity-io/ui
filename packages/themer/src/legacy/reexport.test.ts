// oxlint-disable no-deprecated -- the subpath under test is deprecated in favor of the package it re-exports
import * as themerLegacy from '@sanity/themer-legacy'
import {describe, expect, it} from 'vitest'

import * as legacySubpath from './index'

describe('@sanity/themer/legacy', () => {
  it('re-exports the very same generator API as @sanity/themer-legacy', () => {
    expect(legacySubpath.buildThemeFromUrl).toBe(themerLegacy.buildThemeFromUrl)
    expect(legacySubpath.createTheme).toBe(themerLegacy.createTheme)
    expect(legacySubpath.parseHuesFromUrl).toBe(themerLegacy.parseHuesFromUrl)
    expect(legacySubpath.hues).toBe(themerLegacy.hues)
    expect(legacySubpath.theme).toBe(themerLegacy.theme)
    expect(legacySubpath.presets).toBe(themerLegacy.presets)
  })

  it('exports nothing but the generator API', () => {
    expect(Object.keys(legacySubpath).sort()).toEqual([
      'buildThemeFromUrl',
      'createTheme',
      'hues',
      'parseHuesFromUrl',
      'presets',
      'theme',
    ])
  })
})
