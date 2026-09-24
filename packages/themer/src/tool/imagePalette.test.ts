import {describe, expect, it} from 'vitest'

import {relativeLuminance} from '../theme/hsl'
import {
  applyImagePalette,
  currentImageVariant,
  extractImagePalette,
  ImagePalette,
  optionsFromImagePalette,
  pickLuckyVariant,
  PixelData,
  readableAccent,
  titleFromFileName,
} from './imagePalette'

function contrast(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)

  return (lighter + 0.05) / (darker + 0.05)
}

/** Paints an image out of solid patches: `[hex, pixels, alpha?]` */
function paint(patches: Array<[hex: string, pixels: number, alpha?: number]>): PixelData {
  const total = patches.reduce((sum, [, pixels]) => sum + pixels, 0)
  const data = new Uint8ClampedArray(total * 4)
  let offset = 0

  for (const [hex, pixels, alpha = 255] of patches) {
    for (let index = 0; index < pixels; index++) {
      data[offset] = parseInt(hex.slice(1, 3), 16)
      data[offset + 1] = parseInt(hex.slice(3, 5), 16)
      data[offset + 2] = parseInt(hex.slice(5, 7), 16)
      data[offset + 3] = alpha
      offset += 4
    }
  }

  return {data, width: total, height: 1}
}

const EMPTY: ImagePalette = {
  dominant: null,
  vibrant: null,
  lightVibrant: null,
  darkVibrant: null,
  muted: null,
  lightMuted: null,
  darkMuted: null,
}

describe('extractImagePalette', () => {
  it('claims a swatch for each kind of color in the image', () => {
    const palette = extractImagePalette(
      paint([
        ['#e11d48', 400], // vivid red, mid lightness
        ['#f29cb0', 100], // vivid, light
        ['#5c0a1d', 100], // vivid, dark
        ['#7a7e8a', 300], // grayish, mid lightness
        ['#c9cbd1', 200], // grayish, light
        ['#3a3c42', 150], // grayish, dark
      ]),
    )

    expect(palette).toEqual({
      dominant: '#e11d48',
      vibrant: '#e11d48',
      lightVibrant: '#f29cb0',
      darkVibrant: '#5c0a1d',
      muted: '#7a7e8a',
      lightMuted: '#c9cbd1',
      darkMuted: '#3a3c42',
    })
  })

  it('leaves out swatches the image has no color for', () => {
    const palette = extractImagePalette(paint([['#7a7e8a', 10]]))

    expect(palette).toEqual({...EMPTY, dominant: '#7a7e8a', muted: '#7a7e8a'})
  })

  it('never hands the same color to two swatches', () => {
    const palette = extractImagePalette(
      paint([
        ['#e11d48', 10],
        ['#7a7e8a', 5],
      ]),
    )
    const claimed = Object.values(palette).filter((swatch) => swatch !== null)

    expect(new Set(claimed).size).toBe(2)
    expect(palette.vibrant).toBe('#e11d48')
    expect(palette.muted).toBe('#7a7e8a')
  })

  it('prefers the color closest to a swatch, then the most common one', () => {
    const palette = extractImagePalette(
      paint([
        ['#ff0000', 10], // the ideal vibrant color: fully saturated at mid lightness
        ['#e11d48', 900], // most common, close to the ideal
      ]),
    )

    expect(palette.vibrant).toBe('#ff0000')
    expect(palette.dominant).toBe('#e11d48')
  })

  it('ignores transparent, near-black and near-white pixels', () => {
    const palette = extractImagePalette(
      paint([
        ['#e11d48', 5],
        ['#00ff00', 500, 10],
        ['#050505', 500],
        ['#fdfdfd', 500],
      ]),
    )

    expect(palette.dominant).toBe('#e11d48')
    expect(palette.vibrant).toBe('#e11d48')
    expect(palette.lightVibrant).toBeNull()
    expect(palette.darkMuted).toBeNull()
  })

  it('averages the pixels that land in the same bucket', () => {
    const palette = extractImagePalette(
      paint([
        ['#e11d48', 1],
        ['#e21e49', 1],
        ['#e31f4a', 1],
      ]),
    )

    expect(palette.dominant).toBe('#e21e49')
  })

  it('comes back empty for an empty image', () => {
    expect(extractImagePalette({data: new Uint8ClampedArray(0), width: 0, height: 0})).toEqual(
      EMPTY,
    )
    expect(extractImagePalette(paint([['#ffffff', 10]]))).toEqual(EMPTY)
  })
})

describe('optionsFromImagePalette', () => {
  const palette: ImagePalette = {
    dominant: '#e11d48',
    vibrant: '#e11d48',
    lightVibrant: '#f29cb0',
    darkVibrant: '#5c0a1d',
    muted: '#7a7e8a',
    lightMuted: '#c9cbd1',
    darkMuted: '#3a3c42',
  }

  it('takes the accent and text from the vibrant and muted swatches, and tints the backgrounds', () => {
    expect(optionsFromImagePalette(palette)).toEqual({
      light: {accent: '#e11d48', text: '#7a7e8a', background: '#fbfbfb'},
      // The red is a touch too dark for black button labels
      dark: {accent: readableAccent('#e11d48', 'dark'), text: '#7a7e8a', background: '#1b1c20'},
    })
  })

  it('falls back to the swatches of each scheme, and leaves out what the image lacks', () => {
    expect(
      optionsFromImagePalette({
        ...palette,
        vibrant: null,
        muted: null,
        lightMuted: null,
        darkMuted: null,
      }),
    ).toEqual({
      light: {accent: '#5c0a1d', background: '#fef7f9'},
      dark: {accent: '#f29cb0', background: '#250d15'},
    })
    expect(optionsFromImagePalette({...EMPTY, dominant: '#7a7e8a'})).toEqual({
      light: {accent: readableAccent('#7a7e8a', 'light')},
      dark: {accent: '#7a7e8a'},
    })
    expect(optionsFromImagePalette(EMPTY)).toEqual({})
  })
})

describe('variants', () => {
  const palette: ImagePalette = {
    dominant: '#e11d48',
    vibrant: '#e11d48',
    lightVibrant: '#f29cb0',
    darkVibrant: '#5c0a1d',
    muted: '#7a7e8a',
    lightMuted: '#c9cbd1',
    darkMuted: '#3a3c42',
  }

  it('builds the theme around the chosen swatch', () => {
    const options = optionsFromImagePalette(palette, 'darkMuted')

    expect(options.light?.accent).toBe('#3a3c42')
    // Too dark for black button labels, so the dark scheme lightens it
    expect(options.dark?.accent).toBe(readableAccent('#3a3c42', 'dark'))
    expect(options.light?.text).toBe('#7a7e8a')
    expect(currentImageVariant(options, palette)).toBe('darkMuted')
    expect(currentImageVariant(optionsFromImagePalette(palette), palette)).toBe('vibrant')
    expect(currentImageVariant({light: {accent: '#000000'}}, palette)).toBeNull()
    expect(currentImageVariant({}, palette)).toBeNull()
  })

  it('falls back to the automatic accent when the chosen swatch is missing', () => {
    expect(
      optionsFromImagePalette({...palette, lightMuted: null}, 'lightMuted').light?.accent,
    ).toBe('#e11d48')
  })

  it('feels lucky about interesting swatches, never the current one', () => {
    // A random of 0 always lands on the first candidate
    expect(pickLuckyVariant(palette, {random: () => 0})).toBe('muted')
    expect(pickLuckyVariant(palette, {exclude: 'muted', random: () => 0})).toBe('vibrant')
    // A random just under 1 lands on the last candidate
    expect(pickLuckyVariant(palette, {random: () => 0.999})).toBe('darkVibrant')

    const picks = new Set<string>()

    for (let index = 0; index < 200; index++) {
      picks.add(pickLuckyVariant(palette, {exclude: 'vibrant'}) ?? 'null')
    }

    expect(picks.has('vibrant')).toBe(false)
    expect(picks.size).toBeGreaterThan(1)
  })

  it('weighs saturated, mid-lightness swatches heavier', () => {
    let vivid = 0
    let dull = 0

    for (let index = 0; index < 400; index++) {
      const pick = pickLuckyVariant({...EMPTY, vibrant: '#ff0000', lightMuted: '#e0e0e6'})

      if (pick === 'vibrant') vivid++
      if (pick === 'lightMuted') dull++
    }

    expect(vivid).toBeGreaterThan(dull)
  })

  it('has nothing to feel lucky about without swatches, and keeps a lone one', () => {
    expect(pickLuckyVariant(EMPTY)).toBeNull()
    expect(pickLuckyVariant({...EMPTY, muted: '#7a7e8a'}, {exclude: 'muted'})).toBe('muted')
  })
})

describe('readableAccent', () => {
  it('keeps accents that already read well on a button', () => {
    expect(readableAccent('#e11d48', 'light')).toBe('#e11d48')
    expect(readableAccent('#3a3c42', 'light')).toBe('#3a3c42')
    expect(readableAccent('#f29cb0', 'dark')).toBe('#f29cb0')
  })

  it('darkens light scheme accents until white labels read, and lightens dark scheme ones for black labels', () => {
    for (const hex of ['#f29cb0', '#c9cbd1', '#7a7e8a', '#a8f0c8', '#ffff00']) {
      const light = readableAccent(hex, 'light')

      expect(contrast(light, '#ffffff'), `${hex} light`).toBeGreaterThanOrEqual(4.5)
      expect(relativeLuminance(light)).toBeLessThanOrEqual(relativeLuminance(hex))
    }

    for (const hex of ['#3a3c42', '#5c0a1d', '#e11d48', '#101010']) {
      const dark = readableAccent(hex, 'dark')

      expect(contrast(dark, '#000000'), `${hex} dark`).toBeGreaterThanOrEqual(4.5)
      expect(relativeLuminance(dark)).toBeGreaterThanOrEqual(relativeLuminance(hex))
    }
  })

  it('keeps the hue while adjusting', () => {
    expect(readableAccent('#a8f0c8', 'light')).toMatch(/^#[0-9a-f]{6}$/)
    expect(readableAccent('#a8f0c8', 'light')).not.toBe('#a8f0c8')
  })

  it('builds every variant readable on a button', () => {
    const palette: ImagePalette = {
      dominant: '#e11d48',
      vibrant: '#e11d48',
      lightVibrant: '#f29cb0',
      darkVibrant: '#5c0a1d',
      muted: '#7a7e8a',
      lightMuted: '#c9cbd1',
      darkMuted: '#3a3c42',
    }

    for (const variant of [
      'muted',
      'vibrant',
      'lightMuted',
      'lightVibrant',
      'darkMuted',
      'darkVibrant',
    ] as const) {
      const options = optionsFromImagePalette(palette, variant)

      expect(contrast(options.light!.accent!, '#ffffff'), variant).toBeGreaterThanOrEqual(4.5)
      expect(contrast(options.dark!.accent!, '#000000'), variant).toBeGreaterThanOrEqual(4.5)
      expect(currentImageVariant(options, palette)).toBe(variant)
    }
  })
})

describe('applyImagePalette', () => {
  it('replaces the colors scheme by scheme and keeps the rest', () => {
    expect(
      applyImagePalette(
        {light: {accent: '#000000', contrast: 60}, dark: {contrast: 40}},
        {...EMPTY, vibrant: '#e11d48'},
      ),
    ).toEqual({
      light: {accent: '#e11d48', contrast: 60},
      dark: {accent: readableAccent('#e11d48', 'dark'), contrast: 40},
    })
  })
})

describe('titleFromFileName', () => {
  it('turns a file name into a title', () => {
    expect(titleFromFileName('sunset-beach_2024.JPG')).toBe('sunset beach 2024')
    expect(titleFromFileName('Logo.png')).toBe('Logo')
    expect(titleFromFileName('.png')).toBe('Image theme')
  })
})

describe('short hex swatches', () => {
  it('tints backgrounds and adjusts accents from #rgb swatches too', () => {
    const options = optionsFromImagePalette({
      ...EMPTY,
      vibrant: '#e14',
      lightMuted: '#abc',
      darkMuted: '#345',
    })

    expect(options.light?.background).toMatch(/^#[0-9a-f]{6}$/)
    expect(options.dark?.background).toMatch(/^#[0-9a-f]{6}$/)
    expect(options.light?.accent).toMatch(/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/)
    expect(applyImagePalette({}, {...EMPTY, lightMuted: '#abc'}).light?.background).toBe(
      applyImagePalette({}, {...EMPTY, lightMuted: '#aabbcc'}).light?.background,
    )
  })
})
