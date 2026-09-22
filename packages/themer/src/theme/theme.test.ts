import {color, COLOR_HUES, COLOR_TINTS} from '@sanity/color'
import {buildTheme as buildUITheme} from '@sanity/ui/theme'
import {describe, expect, it} from 'vitest'

import {buildPalette} from './buildPalette'
import {buildTheme} from './buildTheme'
import {hexToHsl, hslToHex, relativeLuminance} from './hsl'
import {BuildThemeOptions, deriveTextColor, resolveThemeOptions} from './options'
import {presets} from './presets'

/** The stock options, spelled out the way a Studio config would */
const STOCK_OPTIONS: BuildThemeOptions = {
  light: {accent: '#556bfc', text: '#727892', background: '#ffffff', contrast: 85},
  dark: {accent: '#556bfc', text: '#727892', background: '#0d0e12', contrast: 85},
}

/** The same colors for both schemes, the way the flat options used to work */
function both(scheme: {accent?: string; text?: string; contrast?: number}): BuildThemeOptions {
  return {light: {...scheme}, dark: {...scheme}}
}

function forceTree(value: unknown): unknown {
  // The themes are built out of lazy self-replacing getters — serializing
  // forces every one of them into a comparable plain tree
  return JSON.parse(JSON.stringify(value))
}

describe('hexToHsl/hslToHex', () => {
  it('round-trips every color of the stock palette', () => {
    const hexes = [color.black.hex, color.white.hex]

    for (const hue of COLOR_HUES) {
      for (const tint of COLOR_TINTS) {
        hexes.push(color[hue][tint].hex)
      }
    }

    for (const hex of hexes) {
      expect(hslToHex(hexToHsl(hex)), hex).toBe(hex)
    }
  })

  it('round-trips arbitrary colors', () => {
    // A deterministic sweep across the RGB cube
    for (let i = 0; i < 0xffffff; i += 3671) {
      const hex = `#${i.toString(16).padStart(6, '0')}`

      expect(hslToHex(hexToHsl(hex)), hex).toBe(hex)
    }
  })
})

describe('resolveThemeOptions', () => {
  it('fills in the stock colors for whatever is omitted', () => {
    expect(resolveThemeOptions({})).toEqual(STOCK_OPTIONS)
    expect(resolveThemeOptions()).toEqual(STOCK_OPTIONS)
    expect(resolveThemeOptions({light: {accent: '#E11D48'}}).light).toEqual({
      accent: '#e11d48',
      text: deriveTextColor('#e11d48'),
      background: '#ffffff',
      contrast: 85,
    })
    expect(resolveThemeOptions({light: {accent: '#e11d48'}}).dark).toEqual(STOCK_OPTIONS.dark)
  })

  it('points out the options shape from before they were grouped by scheme', () => {
    // oxlint-disable-next-line no-unsafe-type-assertion -- the old shape on purpose
    expect(() => resolveThemeOptions({accent: '#556bfc'} as BuildThemeOptions)).toThrow(
      /grouped by color scheme/,
    )
  })
})

describe('buildPalette', () => {
  it('reproduces the stock palette in both schemes from the stock options', () => {
    const palettes = buildPalette(STOCK_OPTIONS)

    for (const palette of [palettes.light, palettes.dark]) {
      expect(palette.black).toBe(color.black.hex)
      expect(palette.white).toBe(color.white.hex)

      for (const hue of COLOR_HUES) {
        for (const tint of COLOR_TINTS) {
          expect(palette[hue][tint], `${hue}/${tint}`).toBe(color[hue][tint].hex)
        }
      }
    }
  })

  it('reproduces the stock palette from no options at all', () => {
    expect(buildPalette()).toEqual(buildPalette(STOCK_OPTIONS))
    expect(buildPalette({})).toEqual(buildPalette(STOCK_OPTIONS))
    expect(buildPalette({light: {}, dark: {contrast: 85}})).toEqual(buildPalette(STOCK_OPTIONS))
  })

  it('places the accent at blue/500 and the text at gray/500 of each scheme', () => {
    const {light, dark} = buildPalette({
      light: {accent: '#e11d48', text: '#6b7280'},
      dark: {accent: '#15803d', text: '#57619c'},
    })

    expect(light.blue['500']).toBe('#e11d48')
    expect(light.gray['500']).toBe('#6b7280')
    expect(dark.blue['500']).toBe('#15803d')
    expect(dark.gray['500']).toBe('#57619c')
  })

  it('keeps the schemes apart', () => {
    const {light, dark} = buildPalette({light: {accent: '#e11d48'}})

    expect(light.blue['500']).toBe('#e11d48')
    expect(dark.blue['500']).toBe(color.blue[500].hex)
  })

  it('derives the text color from the accent when omitted', () => {
    const derived = buildPalette(both({accent: '#e11d48'}))
    const explicit = buildPalette(both({accent: '#e11d48', text: deriveTextColor('#e11d48')}))

    expect(derived).toEqual(explicit)
  })

  it('keeps the other hues at their stock values', () => {
    const {light} = buildPalette({light: {accent: '#e11d48', text: '#6b7280'}})

    for (const hue of ['purple', 'magenta', 'red', 'orange', 'yellow', 'green', 'cyan'] as const) {
      for (const tint of COLOR_TINTS) {
        expect(light[hue][tint], `${hue}/${tint}`).toBe(color[hue][tint].hex)
      }
    }
  })

  it('accepts short hex colors and uppercase hex colors', () => {
    expect(buildPalette({light: {accent: '#F00'}}).light.blue['500']).toBe('#ff0000')
    expect(buildPalette({light: {accent: '#FF0000'}}).light.blue['500']).toBe('#ff0000')
  })

  it('rejects invalid colors and contrasts', () => {
    expect(() => buildPalette({light: {accent: 'red'}})).toThrow(TypeError)
    expect(() => buildPalette({dark: {text: 'nope'}})).toThrow(TypeError)
    expect(() => buildPalette({dark: {background: 'dark'}})).toThrow(TypeError)
    expect(() => buildPalette({light: {contrast: Number.NaN}})).toThrow(TypeError)
  })

  it('clamps the accent and text lightness so they cannot mess with the scale', () => {
    const {light} = buildPalette({light: {accent: '#eeeeff', text: '#f4f4f6'}})

    expect(hexToHsl(light.blue['500']).l).toBeCloseTo(0.75, 2)
    expect(hexToHsl(light.gray['500']).l).toBeCloseTo(0.75, 2)

    const {dark} = buildPalette({dark: {accent: '#000411', text: '#0a0a10'}})

    expect(hexToHsl(dark.blue['500']).l).toBeCloseTo(0.25, 2)
    expect(hexToHsl(dark.gray['500']).l).toBeCloseTo(0.25, 2)
  })

  it('keeps every scale in light-to-dark tint order', () => {
    const {light} = buildPalette({light: {accent: '#15803d', text: '#57619c', contrast: 40}})

    for (const hue of ['gray', 'blue'] as const) {
      for (let index = 1; index < COLOR_TINTS.length; index++) {
        const lighter = hexToHsl(light[hue][COLOR_TINTS[index - 1]]).l
        const darker = hexToHsl(light[hue][COLOR_TINTS[index]]).l

        expect(lighter, `${hue}/${COLOR_TINTS[index]}`).toBeGreaterThan(darker)
      }
    }
  })

  it('darkens a dark background that gets too close to the text and accent', () => {
    const {dark} = buildPalette({dark: {background: '#888888'}})
    const background = relativeLuminance(dark.black)

    expect(background).toBeLessThan(relativeLuminance('#888888'))
    expect(background).toBeLessThan(relativeLuminance('#727892'))
    expect(background).toBeLessThan(relativeLuminance('#556bfc'))

    for (const tint of [dark.gray['400'], dark.blue['400']]) {
      expect((relativeLuminance(tint) + 0.05) / (background + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('never lets the light background get darker than the text and accent', () => {
    const {light} = buildPalette({light: {background: '#222222'}})
    const background = relativeLuminance(light.white)

    expect(background).toBeGreaterThan(relativeLuminance('#727892'))
    expect(background).toBeGreaterThan(relativeLuminance('#556bfc'))
  })

  it('lends each scheme the background of the other for its inverted details', () => {
    const {light, dark} = buildPalette({
      light: {background: '#fcfdfd'},
      dark: {background: '#0d1415'},
    })

    expect(light.white).toBe('#fcfdfd')
    expect(light.black).toBe('#0d1415')
    expect(dark.black).toBe('#0d1415')
    expect(dark.white).toBe('#fcfdfd')
  })

  it('keeps the backgrounds of every preset untouched', () => {
    for (const preset of presets) {
      const resolved = resolveThemeOptions(preset.options)
      const {light, dark} = buildPalette(preset.options)

      expect(dark.black, `${preset.slug} dark`).toBe(resolved.dark.background)
      expect(light.white, `${preset.slug} light`).toBe(resolved.light.background)
    }
  })
})

describe('contrast', () => {
  it('removes every trace of the accent from the text scale at 100', () => {
    const {light} = buildPalette({light: {contrast: 100}})

    for (const tint of COLOR_TINTS) {
      const hex = light.gray[tint]

      expect(hex.slice(1, 3), `gray/${tint}`).toBe(hex.slice(3, 5))
      expect(hex.slice(3, 5), `gray/${tint}`).toBe(hex.slice(5, 7))
    }
  })

  it('makes the text scale adopt the accent hue and saturation at 15', () => {
    const {light} = buildPalette({light: {accent: '#e11d48', contrast: 15}})
    const accent = hexToHsl(light.blue['500'])
    const text = hexToHsl(light.gray['500'])

    expect(text.h).toBeCloseTo(accent.h, 0)
    expect(text.s).toBeCloseTo(accent.s, 1)
    // The text keeps its own lightness so it stays legible
    expect(text.l).toBeCloseTo(hexToHsl(deriveTextColor('#e11d48')).l, 2)
  })

  it('blends more of the accent into the text scale the lower it gets', () => {
    const saturationAt = (contrast: number) =>
      hexToHsl(buildPalette({light: {contrast}}).light.gray['500']).s

    expect(saturationAt(100)).toBeLessThan(saturationAt(85))
    expect(saturationAt(85)).toBeLessThan(saturationAt(50))
    expect(saturationAt(50)).toBeLessThan(saturationAt(15))
  })

  it('clamps the contrast into its 15–100 range', () => {
    expect(buildPalette({dark: {contrast: -20}})).toEqual(buildPalette({dark: {contrast: 15}}))
    expect(buildPalette({dark: {contrast: 250}})).toEqual(buildPalette({dark: {contrast: 100}}))
  })
})

describe('buildTheme', () => {
  it('matches buildTheme() from @sanity/ui/theme for the stock options', () => {
    const expected = buildUITheme()

    for (const actual of [buildTheme(STOCK_OPTIONS), buildTheme({}), buildTheme()]) {
      // oxlint-disable-next-line no-deprecated -- the v0 colors are compared on purpose, they are what a Studio still consumes
      expect(forceTree(actual.color)).toEqual(forceTree(expected.color))
      expect(forceTree(actual.v2?.color)).toEqual(forceTree(expected.v2?.color))
    }
  })

  it('takes each scheme from the palette of that scheme', () => {
    const theme = buildTheme({light: {accent: '#e11d48'}, dark: {accent: '#15803d'}})
    const light = buildUITheme({palette: buildPalette({light: {accent: '#e11d48'}}).light})
    const dark = buildUITheme({palette: buildPalette({dark: {accent: '#15803d'}}).dark})

    expect(forceTree(theme.v2?.color.light)).toEqual(forceTree(light.v2?.color.light))
    expect(forceTree(theme.v2?.color.dark)).toEqual(forceTree(dark.v2?.color.dark))
    expect(theme.v2?.color.light.default.button.default.primary.enabled.bg).toBe('#e11d48')
    expect(theme.v2?.color.dark.default.button.default.primary.enabled.bg).not.toBe(
      theme.v2?.color.light.default.button.default.primary.enabled.bg,
    )
  })
})
