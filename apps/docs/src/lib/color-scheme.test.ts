import {describe, expect, it} from 'vitest'

import {parseColorSchemePreference, resolveColorScheme} from './color-scheme'

describe('color-scheme helpers', () => {
  it('parses valid preferences and falls back to system', () => {
    expect(parseColorSchemePreference('light')).toBe('light')
    expect(parseColorSchemePreference('dark')).toBe('dark')
    expect(parseColorSchemePreference('system')).toBe('system')
    expect(parseColorSchemePreference(undefined)).toBe('system')
    expect(parseColorSchemePreference('nope')).toBe('system')
  })

  it('resolves system to the OS scheme and keeps forced schemes', () => {
    expect(resolveColorScheme('system', 'dark')).toBe('dark')
    expect(resolveColorScheme('system', 'light')).toBe('light')
    expect(resolveColorScheme('light', 'dark')).toBe('light')
    expect(resolveColorScheme('dark', 'light')).toBe('dark')
  })
})
