import {color, COLOR_HUES, COLOR_TINTS} from '@sanity/color'
import {buildTheme as buildUITheme} from '@sanity/ui/theme'
import {describe, expect, it} from 'vitest'

import {buildPalette} from './buildPalette'
import {buildTheme} from './buildTheme'
import {hexToHsl, hslToHex, relativeLuminance} from './hsl'
import {deriveTextColor, resolveThemeOptions} from './options'
import {presets} from './presets'

/** The stock options, spelled out the way a Studio config would */
const STOCK_OPTIONS = {
  accent: '#556bfc',
  text: '#727892',
  background: {dark: '#0d0e12', light: '#ffffff'},
} as const

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

describe('buildPalette', () => {
  it('reproduces the stock palette from the stock options', () => {
    const palette = buildPalette(STOCK_OPTIONS)

    expect(palette.black).toBe(color.black.hex)
    expect(palette.white).toBe(color.white.hex)

    for (const hue of COLOR_HUES) {
      for (const tint of COLOR_TINTS) {
        expect(palette[hue][tint], `${hue}/${tint}`).toBe(color[hue][tint].hex)
      }
    }
  })

  it('reproduces the stock palette from the stock accent alone', () => {
    expect(buildPalette({accent: '#556bfc'})).toEqual(buildPalette(STOCK_OPTIONS))
  })

  it('reproduces the stock palette with the default contrast made explicit', () => {
    expect(buildPalette({accent: '#556bfc', contrast: 85})).toEqual(buildPalette(STOCK_OPTIONS))
  })

  it('places the accent at blue/500 and the text at gray/500', () => {
    const palette = buildPalette({accent: '#e11d48', text: '#6b7280'})

    expect(palette.blue['500']).toBe('#e11d48')
    expect(palette.gray['500']).toBe('#6b7280')
  })

  it('derives the text color from the accent when omitted', () => {
    const derived = buildPalette({accent: '#e11d48'})
    const explicit = buildPalette({accent: '#e11d48', text: deriveTextColor('#e11d48')})

    expect(derived).toEqual(explicit)
  })

  it('keeps the other hues at their stock values', () => {
    const palette = buildPalette({accent: '#e11d48', text: '#6b7280'})

    for (const hue of ['purple', 'magenta', 'red', 'orange', 'yellow', 'green', 'cyan'] as const) {
      for (const tint of COLOR_TINTS) {
        expect(palette[hue][tint], `${hue}/${tint}`).toBe(color[hue][tint].hex)
      }
    }
  })

  it('accepts short hex colors and uppercase hex colors', () => {
    expect(buildPalette({accent: '#F00'}).blue['500']).toBe('#ff0000')
    expect(buildPalette({accent: '#FF0000'}).blue['500']).toBe('#ff0000')
  })

  it('rejects invalid colors and contrasts', () => {
    expect(() => buildPalette({accent: 'red'})).toThrow(TypeError)
    expect(() => buildPalette({accent: '#556bfc', text: 'nope'})).toThrow(TypeError)
    expect(() => buildPalette({accent: '#556bfc', background: {dark: 'dark'}})).toThrow(TypeError)
    expect(() => buildPalette({accent: '#556bfc', contrast: Number.NaN})).toThrow(TypeError)
  })

  it('clamps the accent and text lightness so they cannot mess with the scale', () => {
    const light = buildPalette({accent: '#eeeeff', text: '#f4f4f6'})

    expect(hexToHsl(light.blue['500']).l).toBeCloseTo(0.75, 2)
    expect(hexToHsl(light.gray['500']).l).toBeCloseTo(0.75, 2)

    const dark = buildPalette({accent: '#000411', text: '#0a0a10'})

    expect(hexToHsl(dark.blue['500']).l).toBeCloseTo(0.25, 2)
    expect(hexToHsl(dark.gray['500']).l).toBeCloseTo(0.25, 2)
  })

  it('keeps every scale in light-to-dark tint order', () => {
    const palette = buildPalette({accent: '#15803d', text: '#57619c', contrast: 40})

    for (const hue of ['gray', 'blue'] as const) {
      for (let index = 1; index < COLOR_TINTS.length; index++) {
        const lighter = hexToHsl(palette[hue][COLOR_TINTS[index - 1]]).l
        const darker = hexToHsl(palette[hue][COLOR_TINTS[index]]).l

        expect(lighter, `${hue}/${COLOR_TINTS[index]}`).toBeGreaterThan(darker)
      }
    }
  })

  it('darkens a dark background that gets too close to the text and accent', () => {
    const palette = buildPalette({accent: '#556bfc', background: {dark: '#888888'}})
    const background = relativeLuminance(palette.black)

    expect(background).toBeLessThan(relativeLuminance('#888888'))
    expect(background).toBeLessThan(relativeLuminance('#727892'))
    expect(background).toBeLessThan(relativeLuminance('#556bfc'))

    for (const tint of [palette.gray['400'], palette.blue['400']]) {
      expect((relativeLuminance(tint) + 0.05) / (background + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('never lets the light background get darker than the text and accent', () => {
    const palette = buildPalette({accent: '#556bfc', background: {light: '#222222'}})
    const background = relativeLuminance(palette.white)

    expect(background).toBeGreaterThan(relativeLuminance('#727892'))
    expect(background).toBeGreaterThan(relativeLuminance('#556bfc'))
  })

  it('keeps the backgrounds of every preset untouched', () => {
    for (const preset of presets) {
      const resolved = resolveThemeOptions(preset.options)
      const palette = buildPalette(preset.options)

      expect(palette.black, `${preset.slug} dark`).toBe(resolved.background.dark)
      expect(palette.white, `${preset.slug} light`).toBe(resolved.background.light)
    }
  })
})

describe('contrast', () => {
  it('removes every trace of the accent from the text scale at 100', () => {
    const palette = buildPalette({accent: '#556bfc', contrast: 100})

    for (const tint of COLOR_TINTS) {
      const hex = palette.gray[tint]

      expect(hex.slice(1, 3), `gray/${tint}`).toBe(hex.slice(3, 5))
      expect(hex.slice(3, 5), `gray/${tint}`).toBe(hex.slice(5, 7))
    }
  })

  it('makes the text scale adopt the accent hue and saturation at 15', () => {
    const palette = buildPalette({accent: '#e11d48', contrast: 15})
    const accent = hexToHsl(palette.blue['500'])
    const text = hexToHsl(palette.gray['500'])

    expect(text.h).toBeCloseTo(accent.h, 0)
    expect(text.s).toBeCloseTo(accent.s, 1)
    // The text keeps its own lightness so it stays legible
    expect(text.l).toBeCloseTo(hexToHsl(deriveTextColor('#e11d48')).l, 2)
  })

  it('blends more of the accent into the text scale the lower it gets', () => {
    const saturationAt = (contrast: number) =>
      hexToHsl(buildPalette({accent: '#556bfc', contrast}).gray['500']).s

    expect(saturationAt(100)).toBeLessThan(saturationAt(85))
    expect(saturationAt(85)).toBeLessThan(saturationAt(50))
    expect(saturationAt(50)).toBeLessThan(saturationAt(15))
  })

  it('clamps the contrast into its 15–100 range', () => {
    expect(buildPalette({accent: '#556bfc', contrast: -20})).toEqual(
      buildPalette({accent: '#556bfc', contrast: 15}),
    )
    expect(buildPalette({accent: '#556bfc', contrast: 250})).toEqual(
      buildPalette({accent: '#556bfc', contrast: 100}),
    )
  })
})

describe('buildTheme', () => {
  it('matches buildTheme() from @sanity/ui/theme for the stock options', () => {
    const expected = buildUITheme()
    const actual = buildTheme(STOCK_OPTIONS)

    // oxlint-disable-next-line no-deprecated -- the v0 colors are compared on purpose, they are what a Studio still consumes
    expect(forceTree(actual.color)).toEqual(forceTree(expected.color))
    expect(forceTree(actual.v2?.color)).toEqual(forceTree(expected.v2?.color))
  })

  it('matches buildTheme() from @sanity/ui/theme for the stock accent alone', () => {
    const expected = buildUITheme()
    const actual = buildTheme({accent: '#556bfc'})

    // oxlint-disable-next-line no-deprecated -- the v0 colors are compared on purpose, they are what a Studio still consumes
    expect(forceTree(actual.color)).toEqual(forceTree(expected.color))
    expect(forceTree(actual.v2?.color)).toEqual(forceTree(expected.v2?.color))
  })
})
