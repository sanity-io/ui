import {color} from '@sanity/color'
import {buildTheme, RootTheme, RootTheme_v2} from '@sanity/ui/theme'
import {describe, expect, it} from 'vitest'

import {createTheme, themeConfigFromColors} from './createTheme'
import {mix} from './lib/mix'
import {presets} from './presets'

function getV2(theme: RootTheme): RootTheme_v2 {
  if (!theme.v2) throw new Error('expected theme.v2 to be defined')

  return theme.v2
}

describe('mix', () => {
  it('matches the polished mix implementation', () => {
    // Expected values generated with `mix` from polished@4.3.1, which the
    // hosted Themer service used
    expect(mix(0.5, '#1cb485', '#fcfdfd')).toBe('#8cd8c1')
    expect(mix(0, '#1cb485', '#fcfdfd')).toBe('#fcfdfd')
    expect(mix(0.1, '#1cb485', '#fcfdfd')).toBe('#e5f5f1')
    expect(mix(0.9, '#101112', '#8690a0')).toBe('#1b1d20')
    expect(mix(0.5, '#ffffff', '#ffffff')).toBe('#fff')
    expect(mix(1, '#F03E2F', '#fff')).toBe('#f03e2f')
    expect(mix(0.955, '#101112', '#8690a0')).toBe('#151618')
  })
})

describe('themeConfigFromColors', () => {
  it('returns an empty config when no colors are given', () => {
    expect(themeConfigFromColors({})).toEqual({})
  })

  it('only regenerates the customized ramps', () => {
    const config = themeConfigFromColors({primary: '#1cb485'})

    expect(config.palette?.blue[500]).toBe('#1cb485')
    // The other hues keep the default Sanity ramps
    expect(config.palette?.red).toBe(color.red)
    expect(config.palette?.gray).toBe(color.gray)
  })

  it('re-anchors every ramp when the surface endpoints move', () => {
    const config = themeConfigFromColors({darkBackground: '#0d1415'})

    expect(config.palette?.black).toBe('#0d1415')
    expect(config.palette?.gray).not.toBe(color.gray)
    expect(config.palette?.gray[950]).toBe(mix(450 / 500, '#0d1415', color.gray[500].hex))
  })

  it('rejects invalid colors', () => {
    expect(() => themeConfigFromColors({primary: 'red'})).toThrow(
      'Invalid color for "primary": "red"',
    )
  })
})

describe('createTheme', () => {
  it('returns the default Studio theme when no colors are given', () => {
    const theme = getV2(createTheme())
    const defaultTheme = getV2(buildTheme())

    expect(theme.color.light.default.bg).toBe(defaultTheme.color.light.default.bg)
    expect(theme.color.dark.default.bg).toBe(defaultTheme.color.dark.default.bg)
    expect(theme.color.light.primary.bg).toBe(defaultTheme.color.light.primary.bg)
  })

  it('drives buttons, focus rings and selections from the primary color', () => {
    const {color} = getV2(createTheme({primary: '#1cb485'}))

    expect(color.light.default.button.default.primary.enabled.bg).toBe('#1cb485')
    expect(color.light.default.focusRing).toBe('#1cb485')
  })

  it('drives the surface colors from the light and dark backgrounds', () => {
    const {color} = getV2(createTheme({lightBackground: '#fcfdfd', darkBackground: '#0d1415'}))

    expect(color.light.default.bg).toBe('#fcfdfd')
    expect(color.dark.transparent.bg).toBe('#0d1415')
  })

  it('tints the neutral colors with the text color', () => {
    const defaultColor = getV2(createTheme()).color
    const {color} = getV2(createTheme({text: '#5c9199'}))

    expect(color.light.transparent.bg).not.toBe(defaultColor.light.transparent.bg)
    // The light scheme's default surface stays anchored to the light background
    expect(color.light.default.bg).toBe(defaultColor.light.default.bg)
  })

  it('generates valid themes for every preset', () => {
    for (const preset of presets) {
      const {color} = getV2(createTheme(preset.colors))

      expect(color.light.default.bg, preset.slug).toMatch(/^#[0-9a-f]{3,6}$/)
      expect(color.dark.default.bg, preset.slug).toMatch(/^#[0-9a-f]{3,6}$/)
    }
  })

  it('has unique preset slugs', () => {
    const slugs = presets.map((preset) => preset.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
