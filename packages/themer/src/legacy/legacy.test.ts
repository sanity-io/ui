// oxlint-disable no-deprecated -- the legacy API intentionally targets the deprecated v0 theme properties, like the hosted service did
import {createHash} from 'node:crypto'

import {describe, expect, it} from 'vitest'

import {hostedCustom, hostedDefault, hostedVerdant} from './__fixtures__/hosted'
import {createTheme, createThemeFromUrl, parseHuesFromUrl} from './createTheme'
import {hues, theme} from './defaults'
import {getPreset, presets} from './presets'
import {LegacyTheme} from './types'

/**
 * Hashes a theme's `color` object the same way the fixtures were generated,
 * so themes can be compared byte-for-byte against what the hosted Themer
 * service serves without committing megabytes of resolved colors.
 */
function hashColor(color: LegacyTheme['color']): string {
  function canonicalize(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(canonicalize)
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.keys(value)
          .sort()
          .map((key) => [key, canonicalize(Reflect.get(value, key))]),
      )
    }
    return value
  }

  return createHash('sha256')
    .update(JSON.stringify(canonicalize(color)))
    .digest('hex')
}

function getPath(value: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => {
    if (!acc || typeof acc !== 'object') {
      throw new Error(`Cannot resolve "${key}" in "${path}"`)
    }

    return Reflect.get(acc, key)
  }, value)
}

function expectSamples(color: LegacyTheme['color'], samples: Record<string, string>) {
  for (const [path, expected] of Object.entries(samples)) {
    expect(getPath(color, path), path).toBe(expected)
  }
}

describe('theme and hues', () => {
  it('serves the same default hues as the hosted service', () => {
    expect(hues).toEqual(hostedDefault.hues)
  })

  it('generates the same default theme colors as the hosted service', () => {
    expectSamples(theme.color, hostedDefault.samples)
    expect(hashColor(theme.color)).toBe(hostedDefault.colorSha256)
  })

  it('marks the theme for Sanity Studio', () => {
    expect(theme.__themer).toBe(true)
    expect(theme.v2).toBeUndefined()
    expect(theme.fonts).toBeDefined()
  })

  it('theme equals createTheme(hues)', () => {
    expect(hashColor(createTheme(hues).color)).toBe(hashColor(theme.color))
  })
})

describe('presets', () => {
  it('resolves the same verdant hues as the hosted service', () => {
    expect(getPreset('verdant').hues).toEqual(hostedVerdant.hues)
  })

  it('generates the same verdant theme colors as the hosted service', () => {
    const {color} = createTheme(getPreset('verdant').hues)

    expectSamples(color, hostedVerdant.samples)
    expect(hashColor(color)).toBe(hostedVerdant.colorSha256)
  })

  it('has the same presets as the hosted service', () => {
    expect(presets.map((preset) => preset.slug)).toEqual([
      'default',
      'dew',
      'pink-synth',
      'pixel-art',
      'retro-colonial',
      'rosabel',
      'stereofidelic',
      'tw-cyan',
      'verdant',
    ])
  })

  it('falls back to the default preset for unknown slugs', () => {
    expect(getPreset('does-not-exist').slug).toBe('default')
    expect(getPreset(null).slug).toBe('default')
    expect(getPreset('VERDANT').slug).toBe('verdant')
  })
})

describe('parseHuesFromUrl', () => {
  it('applies overrides on top of presets like the hosted service', () => {
    expect(parseHuesFromUrl(hostedCustom.url)).toEqual(hostedCustom.hues)
  })

  it('generates the same theme colors as the hosted service', () => {
    const {color} = createThemeFromUrl(hostedCustom.url)

    expectSamples(color, hostedCustom.samples)
    expect(hashColor(color)).toBe(hostedCustom.colorSha256)
  })

  it('accepts bare query strings', () => {
    expect(parseHuesFromUrl('?preset=verdant')).toEqual(hostedVerdant.hues)
  })

  it('rejects invalid colors like the hosted service', () => {
    expect(() => parseHuesFromUrl('?primary=nothex')).toThrow('Invalid param')
    expect(() => parseHuesFromUrl('?lightest=nothex')).toThrow('Invalid color: #nothex')
    expect(() => parseHuesFromUrl('?primary=2276fc;2276fc')).toThrow('Duplicate params')
  })
})

describe('createTheme', () => {
  it('resets the midPoint when a mid color is customized without one', () => {
    const custom = parseHuesFromUrl('?caution=ff0000')

    // The default caution midPoint is 300, but overriding the mid color
    // without an explicit midPoint moves it back to 500
    expect(custom.caution).toEqual({
      mid: '#ff0000',
      midPoint: 500,
      lightest: '#fff',
      darkest: '#101112',
    })
  })

  it('accepts partial hues', () => {
    const partial = createTheme({primary: {mid: '#22fca8'}})
    const full = createTheme({...hues, primary: {...hues.primary, mid: '#22fca8', midPoint: 500}})

    expect(hashColor(partial.color)).toBe(hashColor(full.color))
  })
})
