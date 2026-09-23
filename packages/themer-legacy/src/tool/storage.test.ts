import {afterEach, describe, expect, it, vi} from 'vitest'

import {hues} from '../generator/defaults'
import {presets} from '../generator/presets'
import {readStoredHues, sanitizeHues, writeStoredHues} from './storage'

const STORAGE_KEY = 'sanityStudio:themer-legacy:hues'

describe('sanitizeHues', () => {
  it('accepts the default hues and every preset', () => {
    expect(sanitizeHues(hues)).toEqual(hues)

    for (const preset of presets) {
      expect(sanitizeHues(preset.hues), preset.slug).toEqual(preset.hues)
    }
  })

  it('accepts a JSON round trip', () => {
    expect(sanitizeHues(JSON.parse(JSON.stringify(hues)))).toEqual(hues)
  })

  it('lowercases colors and drops unknown properties', () => {
    const stored = {
      ...hues,
      primary: {...hues.primary, mid: '#22FCA8', lightest: '#FFF', extra: true},
    }

    expect(sanitizeHues(stored)).toEqual({
      ...hues,
      primary: {...hues.primary, mid: '#22fca8', lightest: '#fff'},
    })
  })

  it('rejects anything that is not a complete set of hues', () => {
    expect(sanitizeHues(null)).toBeNull()
    expect(sanitizeHues('verdant')).toBeNull()
    expect(sanitizeHues([])).toBeNull()
    expect(sanitizeHues({})).toBeNull()

    const {critical: _critical, ...missingHue} = hues

    expect(sanitizeHues(missingHue)).toBeNull()
  })

  it('rejects a hue with an invalid color or mid point', () => {
    expect(sanitizeHues({...hues, caution: {...hues.caution, mid: 'yellow'}})).toBeNull()
    expect(sanitizeHues({...hues, caution: {...hues.caution, mid: '#fbd02'}})).toBeNull()
    expect(sanitizeHues({...hues, caution: {...hues.caution, darkest: undefined}})).toBeNull()
    expect(sanitizeHues({...hues, caution: {...hues.caution, midPoint: 250}})).toBeNull()
    expect(sanitizeHues({...hues, caution: {...hues.caution, midPoint: '300'}})).toBeNull()
    expect(sanitizeHues({...hues, caution: {...hues.caution, midPoint: Number.NaN}})).toBeNull()
  })
})

describe('readStoredHues and writeStoredHues', () => {
  const storage = new Map<string, string>()

  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => void storage.set(key, value),
    removeItem: (key: string) => void storage.delete(key),
  })

  afterEach(() => {
    storage.clear()
  })

  it('round-trips a draft under the namespaced key', () => {
    const verdant = presets.find((preset) => preset.slug === 'verdant')!

    writeStoredHues(verdant.hues)

    expect(storage.get(STORAGE_KEY)).toBe(JSON.stringify(verdant.hues))
    expect(readStoredHues()).toEqual(verdant.hues)
  })

  it('clears the draft when it is reset', () => {
    writeStoredHues(hues)
    writeStoredHues(null)

    expect(storage.has(STORAGE_KEY)).toBe(false)
    expect(readStoredHues()).toBeNull()
  })

  it('discards drafts that fail to parse or validate', () => {
    storage.set(STORAGE_KEY, '{not json')
    expect(readStoredHues()).toBeNull()

    storage.set(STORAGE_KEY, JSON.stringify({...hues, primary: {mid: '#2276fc'}}))
    expect(readStoredHues()).toBeNull()
  })
})
